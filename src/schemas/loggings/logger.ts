import { LoggingService } from "./logging.service";
import { ConsoleLogger, Injectable, Optional } from "@nestjs/common";

@Injectable()
export class DbLogger extends ConsoleLogger {
    constructor(@Optional() private readonly logging?: LoggingService) {
        super(); // keeps console output
    }

    async warn(message: any, context?: string) {
        super.warn(message, context);
        await this.logging?.write({
            level: "warn",
            message: String(message),
            context,
        });
    }

    async error(message: any, stack?: string, context?: string) {
        // Nest calls error(message, stack, context)
        super.error(message, stack, context);
        await this.logging?.write({
            level: "error",
            message: String(message),
            context,
            stack,
        });
    }
}
