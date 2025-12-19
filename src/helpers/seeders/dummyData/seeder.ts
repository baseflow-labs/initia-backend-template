import { TableOneNameDummyDataGeneratorService } from "./tableOneNames/dataGenerator";

import { Injectable } from "@nestjs/common";

import { generateRandomNumber } from "./tools/randomDataGenerators";

@Injectable()
export class DummyDataSeederService {
    constructor(
        private readonly tableOneNameDummyDataGeneratorService: TableOneNameDummyDataGeneratorService
    ) {}

    async seed() {
        console.log("🚀🚀 Seeding tables with DUMMY DATA...");

        const tableOneNameRandomCount = await generateRandomNumber(2);

        await this.tableOneNameDummyDataGeneratorService.seed(
            tableOneNameRandomCount
        );

        console.log("✅ Seeding tables with DUMMY DATA is done successfully.");
    }
}
