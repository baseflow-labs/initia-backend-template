import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from "@nestjs/common";
import { randomUUID } from "crypto";
import { ClsService } from "nestjs-cls";
import { catchError, Observable, tap, throwError } from "rxjs";
import { AuditAction } from "src/enums/audit.enum";
import { AuditService } from "src/schemas/audits/audit.service";

const inferAction = (m?: string): AuditAction =>
    (m || "").toUpperCase() === "POST"
        ? AuditAction.CREATE
        : (m || "").toUpperCase() === "PUT"
          ? AuditAction.UPDATE
          : (m || "").toUpperCase() === "PATCH"
            ? AuditAction.UPDATE
            : (m || "").toUpperCase() === "DELETE"
              ? AuditAction.DELETE
              : AuditAction.READ;

// Safely extract actorId from various JWT shapes
function getActorId(user: any): string | undefined {
    if (!user) return undefined;
    return (
        user.id ??
        user.userId ??
        user.sub ??
        user._id ??
        undefined
    )?.toString();
}

function narrowActorType(v: any): "user" | "service" | undefined {
    return v === "user" || v === "service" ? v : undefined;
}

function narrowSource(v: any): "api" | "job" | "webhook" | "cli" | undefined {
    return v === "api" || v === "job" || v === "webhook" || v === "cli"
        ? v
        : undefined;
}

// Try to guess resourceType and resourceId
function inferResource(
    ctx: ExecutionContext,
    req: any
): { resourceType?: string; resourceId?: string } {
    const params = req?.params ?? {};
    const idKey =
        ["id", "uuid", "slug", "code"].find((k) => params[k] !== undefined) ??
        Object.keys(params)[0];
    const resourceId = idKey ? String(params[idKey]) : undefined;

    const ctrlName = ctx.getClass()?.name as string | undefined;
    let resourceType: string | undefined;

    if (ctrlName?.endsWith("Controller")) {
        resourceType = ctrlName.replace(/Controller$/, "");
    } else if (req?.baseUrl) {
        const seg = String(req.baseUrl).split("/").filter(Boolean).pop();
        resourceType = seg
            ? seg.charAt(0).toUpperCase() + seg.slice(1)
            : undefined;
    } else if (req?.route?.path) {
        const seg = String(req.route.path).split("/").filter(Boolean)[0];
        resourceType = seg
            ? seg.charAt(0).toUpperCase() + seg.slice(1)
            : undefined;
    }

    return { resourceType, resourceId };
}

@Injectable()
export class GlobalRequestInterceptor implements NestInterceptor {
    constructor(
        private readonly audit: AuditService,
        private readonly cls: ClsService
    ) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const http = context.switchToHttp();
        const req = http.getRequest<any>();
        const res = http.getResponse<any>();

        const user = req.user;
        const actorId = getActorId(user);
        const requestId = req.id || req.headers["x-request-id"] || randomUUID();
        const sessionId = req.session?.id;

        // ---- Seed CLS for this request ----
        this.cls.set("actorId", actorId);
        this.cls.set("actorType", user ? "user" : "service");
        this.cls.set(
            "tenantId",
            user?.tenantId ?? user?.tenant_id ?? user?.orgId
        );
        this.cls.set("requestId", requestId);
        this.cls.set("sessionId", sessionId);
        this.cls.set(
            "ip",
            (req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
                req.ip) as string
        );
        this.cls.set("userAgent", req.headers["user-agent"]);
        this.cls.set("method", req.method);
        this.cls.set("path", req.originalUrl || req.url);
        this.cls.set("source", "api");

        // ---- Infer resource ----
        const { resourceType, resourceId } = inferResource(context, req);

        const method = req.method as string;
        const action = inferAction(method);

        const base = {
            actorId,
            actorType: narrowActorType(user ? "user" : "service"),
            tenantId: this.cls.get<string>("tenantId"),
            requestId,
            sessionId,
            ip: this.cls.get<string>("ip"),
            userAgent: req.headers["user-agent"] as string,
            method,
            path: (req.originalUrl || req.url) as string,
            source: narrowSource("api"),
            resourceType,
            resourceId,
        };

        return next.handle().pipe(
            tap(async () => {
                const statusCode: number = res?.statusCode ?? 200;
                await this.audit.logEvent({
                    ...base,
                    errorMessage: res.statusMessage,
                    statusCode,
                    action,
                    success: true,
                });
            }),
            catchError((err) => {
                const status = err?.getStatus
                    ? err.getStatus()
                    : (res?.statusCode ?? 500);
                void this.audit.logEvent({
                    ...base,
                    action,
                    success: false,
                    statusCode: status,
                    errorMessage: err?.message,
                });
                return throwError(() => err);
            })
        );
    }
}
