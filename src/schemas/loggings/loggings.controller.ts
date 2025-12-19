import { LoggingService } from "./logging.service";
import { GetLoggingQueryDto } from "@/dto/loggings/getLogging.dto";
import {
    Controller,
    Get,
    NotFoundException,
    Param,
    Query,
} from "@nestjs/common";

@Controller("logging")
export class LoggingController {
    constructor(private readonly logging: LoggingService) {}

    @Get()
    async list(@Query() query: GetLoggingQueryDto) {
        return this.logging.findMany(query);
    }

    @Get(":id")
    async byId(@Param("id") id: string) {
        const log = await this.logging.findOneById(id);
        if (!log) throw new NotFoundException("Log not found");
        return log;
    }
}
