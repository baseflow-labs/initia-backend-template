import { Injectable } from "@nestjs/common";
import {
    HealthCheckError,
    HealthIndicator,
    HealthIndicatorResult,
} from "@nestjs/terminus";
import * as os from "os";

@Injectable()
export class CpuHealthIndicator extends HealthIndicator {
    async isHealthy(key: string): Promise<HealthIndicatorResult> {
        const load = os.loadavg()[0]; // 1-min avg
        const cores = os.cpus().length;
        const threshold = cores * 1.0;

        const isHealthy = load < threshold;
        const result = this.getStatus(key, isHealthy, {
            load,
            cores,
            threshold,
        });

        if (isHealthy) return result;
        throw new HealthCheckError("CPU load too high", result);
    }
}
