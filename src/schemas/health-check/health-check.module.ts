import { HealthCheckController } from "./health-check.controller";
import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { TerminusModule } from "@nestjs/terminus";
import { CpuHealthIndicator } from "src/helpers/cpu.health";

@Module({
    imports: [TerminusModule, HttpModule],
    controllers: [HealthCheckController],
    providers: [CpuHealthIndicator],
})
export class HealthCheckModule {}
