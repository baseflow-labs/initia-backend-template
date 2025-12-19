import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";

@Injectable()
export class DatabaseResetService {
    constructor(private readonly dataSource: DataSource) {}

    async truncateAllTables() {
        console.log("🚀🚀 Truncating database tables...");

        const queryRunner = this.dataSource.createQueryRunner();

        await queryRunner.connect();

        // Disable all foreign key constraints temporarily
        await queryRunner.query(`SET session_replication_role = 'replica';`);

        const allTables: { table_name: string }[] = await queryRunner.query(`
            SELECT table_name
            FROM information_schema.tables
            WHERE table_schema = 'public'
            AND table_type = 'BASE TABLE';
    `);

        const tableNames = allTables.map((t) => `"public"."${t.table_name}"`);
        const failedTables = new Set(tableNames);

        let retries = 5;

        while (failedTables.size > 0 && retries > 0) {
            const toRetry = [...failedTables];

            for (const table of toRetry) {
                try {
                    console.log(`🚀 Truncating database table of ${table}...`);

                    await queryRunner.query(`TRUNCATE TABLE ${table} CASCADE;`);
                    failedTables.delete(table);

                    console.log(
                        `🟢 Truncating database table of ${table} is done successfully.`
                    );
                } catch (err) {
                    console.log(
                        `❌ Truncating database table of ${table} has failed.`
                    );
                }
            }

            retries--;
        }

        // Restore constraint checking
        await queryRunner.query(`SET session_replication_role = 'origin';`);
        await queryRunner.release();

        if (failedTables.size > 0) {
            console.error(
                "❗Some tables could not be truncated after retries:",
                [...failedTables]
            );
        } else {
            console.log("✅ Truncating database tables is done successfully.");
        }
    }
}
