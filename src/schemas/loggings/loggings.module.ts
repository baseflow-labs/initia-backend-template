import { DbLogger } from "./logger";
import { LoggingController } from "./logging.controller";
import { LoggingService } from "./logging.service";
import { Global, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Log } from "src/entities/logging.entity";

@Global()
@Module({
    imports: [TypeOrmModule.forFeature([Log])],
    controllers: [LoggingController],
    providers: [LoggingService, DbLogger],
    exports: [LoggingService, DbLogger],
})
export class LoggingModule {}
