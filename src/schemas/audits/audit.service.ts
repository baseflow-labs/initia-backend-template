import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AuditEvent } from "src/entities/audit.entity";
import { AuditAction } from "src/enums/audit.enum";
import { Repository } from "typeorm";

type BaseEvent = Partial<AuditEvent> & {
    action: AuditAction;
    success: boolean;
};

@Injectable()
export class AuditService {
    private readonly logger = new Logger(AuditService.name);

    constructor(
        @InjectRepository(AuditEvent)
        private readonly repo: Repository<AuditEvent>
    ) {}

    async logEvent(ev: BaseEvent) {
        try {
            const item = this.repo.create(this.sanitize(ev));
            await this.repo.save(item);
        } catch (e) {
            this.logger.warn(
                `Failed to persist audit event: ${(e as Error).message}`
            );
        }
    }

    async logChange(params: {
        action: AuditAction.CREATE | AuditAction.UPDATE | AuditAction.DELETE;
        resourceType: string;
        resourceId?: string | number;
        before?: Record<string, any> | null;
        after?: Record<string, any> | null;
        success: boolean;
        statusCode?: number;
        // envelope (usually filled by CLS)
        actorId?: string;
        actorType?: "user" | "service";
        requestId?: string;
        sessionId?: string;
        ip?: string;
        userAgent?: string;
        method?: string;
        path?: string;
        source?: "api" | "job" | "webhook" | "cli";
    }) {
        const before = this.redact(params.before ?? undefined);
        const after = this.redact(params.after ?? undefined);
        const diff = this.computeDiff(before, after);
        await this.logEvent({
            ...params,
            resourceId: params.resourceId?.toString(),
            before,
            after,
            diff,
        });
    }

    // ---- helpers ----
    redact<T extends Record<string, any> | undefined>(obj: T): T {
        if (!obj || typeof obj !== "object") return obj;
        const SENSITIVE = new Set([
            "password",
            "otp",
            "token",
            "secret",
            "medicalNotes",
        ]);
        const MASK_PARTIAL = new Set(["email", "phone", "cardNumber"]);
        const clone: any = Array.isArray(obj)
            ? obj.map((x) => ({ ...x }))
            : { ...obj };
        const scrub = (o: any) => {
            if (!o || typeof o !== "object") return;
            for (const k of Object.keys(o)) {
                const v = o[k];
                if (SENSITIVE.has(k)) delete o[k];
                else if (MASK_PARTIAL.has(k) && typeof v === "string")
                    o[k] = this.mask(v);
                else if (v && typeof v === "object") scrub(v);
            }
        };
        scrub(clone);
        return clone;
    }

    mask(s: string) {
        if (s.includes("@")) {
            const [u, d] = s.split("@");
            return `${u.slice(0, 2)}***@${d}`;
        }
        if (s.length <= 4) return "***";
        return `${"*".repeat(Math.max(0, s.length - 4))}${s.slice(-4)}`;
    }

    computeDiff(before?: any, after?: any) {
        if (!before && !after) return undefined;
        const ops: any[] = [];
        const keys = new Set([
            ...(before ? Object.keys(before) : []),
            ...(after ? Object.keys(after) : []),
        ]);
        for (const k of keys) {
            const a = before?.[k],
                b = after?.[k];
            if (JSON.stringify(a) === JSON.stringify(b)) continue;
            if (a === undefined)
                ops.push({ op: "add", path: `/${k}`, value: b });
            else if (b === undefined)
                ops.push({ op: "remove", path: `/${k}`, old: a });
            else ops.push({ op: "replace", path: `/${k}`, from: a, to: b });
        }
        return ops;
    }

    sanitize(ev: any) {
        if (ev?.errorMessage?.length > 1000)
            ev.errorMessage = ev.errorMessage.slice(0, 1000);
        return ev;
    }
}
