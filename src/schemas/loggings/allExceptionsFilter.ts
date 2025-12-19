import { LoggingService } from "./logging.service";
import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
} from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    constructor(
        private readonly logs: LoggingService,
        private readonly adapterHost: HttpAdapterHost
    ) {}

    async catch(exception: unknown, host: ArgumentsHost) {
        const { httpAdapter } = this.adapterHost;
        const ctx = host.switchToHttp();

        const req = ctx.getRequest(); // works for Express or Fastify
        const res = ctx.getResponse();

        const isHttp = exception instanceof HttpException;
        const status = isHttp ? (exception as HttpException).getStatus() : 500;

        // message: try to keep it readable
        const message = isHttp
            ? (exception as HttpException).message
            : ((exception as any)?.message ?? "Internal server error");

        const stack = (exception as any)?.stack;

        // Persist the error (swallow errors inside)
        await this.logs.write({
            level: "error",
            message,
            context: "HTTP",
            stack,
            meta: {
                method: req?.method,
                path: req?.originalUrl ?? req?.url,
                ip: req?.ip ?? req?.socket?.remoteAddress,
                status,
                // optionally include sanitized inputs if you want:
                // query: req?.query,
                // body: scrubBody(req?.body),
            },
        });

        // Build a normalized response payload
        const body = isHttp
            ? (exception as HttpException).getResponse()
            : { statusCode: status, message: "Internal server error" };

        // Reply using adapter to support both Express & Fastify
        httpAdapter.reply(res, body, status);
    }
}
