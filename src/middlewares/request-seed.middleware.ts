import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { ClsService } from "nestjs-cls";

@Injectable()
export class RequestSeedMiddleware implements NestMiddleware {
    constructor(private readonly cls: ClsService) {}

    use(req: Request, _res: Response, next: NextFunction) {
        const user = (req as any).user; // set by your AuthGuard/Passport
        this.cls.set("actorId", user?.id);
        this.cls.set("actorType", user ? "user" : "service");
        this.cls.set(
            "requestId",
            (req as any).id || (req.headers["x-request-id"] as string)
        );
        this.cls.set("sessionId", (req as any).session?.id);
        this.cls.set(
            "ip",
            (
                (req.headers["x-forwarded-for"] as string)?.split(",")[0] ||
                req.ip
            )?.trim()
        );
        this.cls.set("userAgent", req.headers["user-agent"] as string);
        this.cls.set("method", req.method);
        this.cls.set("path", (req as any).originalUrl || req.url);
        this.cls.set("source", "api");
        next();
    }
}
