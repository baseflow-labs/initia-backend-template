import { Controller, Get } from "@nestjs/common";
import {
    DiskHealthIndicator,
    HealthCheck,
    HealthCheckService,
    HttpHealthIndicator,
    MemoryHealthIndicator,
    TypeOrmHealthIndicator,
} from "@nestjs/terminus";
import { CpuHealthIndicator } from "src/helpers/cpu.health";

@Controller("health-check")
export class HealthCheckController {
    constructor(
        private health: HealthCheckService,
        private db: TypeOrmHealthIndicator,
        private http: HttpHealthIndicator,
        private memory: MemoryHealthIndicator,
        private disk: DiskHealthIndicator,
        private cpu: CpuHealthIndicator
    ) {}

    @Get()
    @HealthCheck()
    check() {
        return this.health.check([
            async () => this.db.pingCheck("database"),
            async () => this.http.pingCheck("google", "https://www.google.com"),
            async () => this.memory.checkHeap("memory_heap", 150 * 1024 * 1024),
            async () => this.memory.checkRSS("memory_rss", 3000 * 1024 * 1024),
            async () =>
                this.disk.checkStorage("disk", {
                    thresholdPercent: 0.8,
                    path: "/",
                }),
            async () => this.cpu.isHealthy("cpu"),
        ]);
    }
}
