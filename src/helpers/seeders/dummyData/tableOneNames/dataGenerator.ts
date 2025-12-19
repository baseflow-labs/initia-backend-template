import {
    generateAddress,
    generateBoolean,
    generateDate,
    generateFullName,
    generateGender,
    generateNationality,
    generateRandomNumber,
    generatePhoneNumber,
    generateRandomLetter,
    generateRandomLetters,
    generateTime,
    pickRandomItemFromList,
} from "../tools/randomDataGenerators";
import { TableOneNameDataSeederService } from "./seeder";
import { Injectable } from "@nestjs/common";

import { EnumOne } from "src/enums/enumOne.enum";

@Injectable()
export class TableOneNameDummyDataGeneratorService {
    constructor(
        private readonly tableOneNameDataSeederService: TableOneNameDataSeederService
    ) {}

    private async generateRandomTableOneName() {
        return {
            propertyOneName: generateAddress(),
        };
    }

    async seed(count: number) {
        console.log("🚀 Seeding TableOneName table with DUMMY DATA...");

        const data: any[] = [];
        for (let i = 0; i < count; i++) {
            const row = await this.generateRandomTableOneName();
            data.push(row);
        }

        await this.tableOneNameDataSeederService.seed(data);

        console.log(
            "🟢 Seeding TableOneName table with DUMMY DATA is done successfully."
        );
    }
}
