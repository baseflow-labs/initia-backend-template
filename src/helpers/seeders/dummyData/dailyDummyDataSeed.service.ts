import { Injectable, OnModuleInit } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";

import { InitialDataSeederService } from "../initialData";
import { DatabaseResetService } from "./tools/resetDatabase";
import { DummyDataSeederService } from "./seeder";

@Injectable()
export class DailySeederService implements OnModuleInit {
    constructor(
        private readonly databaseResetService: DatabaseResetService,
        private readonly dummyDataSeederService: DummyDataSeederService,
        private readonly initialDataSeederService: InitialDataSeederService
    ) {}

    async onModuleInit() {
        const isStaging = process.env.ENVIRONMENT === "staging";

        if (isStaging) {
            console.log("🚀🚀🚀 Running initial full seeding in staging...");

            await this.databaseResetService.truncateAllTables();
            await this.initialDataSeederService.seed();
            await this.runDummyDataSeeder();
        } else {
            console.log(
                "🔒 Skipping full reset — running only initial data seeding in non-staging"
            );

            await this.initialDataSeederService.seed();
        }
    }

    @Cron("0 1 * * *") // Daily On 1 AM Server Time
    async handleDailySeeding() {
        const isStaging = process.env.ENVIRONMENT === "staging";

        if (isStaging) {
            console.log("⏰ Seeding database with Daily Fresh DUMMY DATA...");

            try {
                await this.databaseResetService.truncateAllTables();
                await this.runDummyDataSeeder();
            } catch (error) {
                console.error("❌ Daily Seeder Failed", error);
            }
        } else {
            console.log(
                "✅ Skipping Daily Seeder for non-staging environment."
            );
        }
    }

    private async runDummyDataSeeder() {
        await this.dummyDataSeederService.seed();

        console.log(
            "✅ Seeding database with Daily Fresh DUMMY DATA is done successfully."
        );
    }
}
