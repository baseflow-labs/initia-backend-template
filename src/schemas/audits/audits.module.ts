import { AuditController } from "./audit.controller";
import { AuditService } from "./audit.service";
import { Global, Module } from "@nestjs/common";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuditEvent } from "src/entities/audit.entity";
import { AuditSubscriber } from "src/helpers/audit/audit.subscriber";
import { GlobalRequestInterceptor } from "src/helpers/audit/global-request.interceptor";

@Global()
@Module({
    imports: [TypeOrmModule.forFeature([AuditEvent])],
    controllers: [AuditController],
    providers: [
        AuditService,
        AuditSubscriber,
        { provide: APP_INTERCEPTOR, useClass: GlobalRequestInterceptor },
    ],
    exports: [AuditService],
})
export class AuditModule {}
