import { GenericDataSeederService } from "../tools/genericDataSeeder";
import { Injectable } from "@nestjs/common";
import { TableOneName } from "@/entities";

@Injectable()
export class TableOneNameDataSeederService {
    constructor(
        private readonly genericDataSeederService: GenericDataSeederService
    ) {}

    async seed(tableOneNamesToSeed) {
        for (const tableOneName of tableOneNamesToSeed) {
            const consoleLogMessage = JSON.stringify(tableOneName);

            console.log(
                `🚀 Seeding TableOneName table with DUMMY DATA of ${consoleLogMessage}...`
            );

            await this.genericDataSeederService.seedData({
                row: tableOneName,
                entity: TableOneName,
            });

            console.log(
                `🟢 Seeding TableOneName table with DUMMY DATA of ${consoleLogMessage} is done successfully.`
            );
        }
    }
}
