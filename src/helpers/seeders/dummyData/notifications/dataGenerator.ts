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
import { NotificationDataSeederService } from "./seeder";
import { Injectable } from "@nestjs/common";

import { EnumOne } from "src/enums/enumOne.enum";

@Injectable()
export class NotificationDummyDataGeneratorService {
    constructor(
        private readonly notificationDataSeederService: NotificationDataSeederService
    ) {}

    private async generateRandomNotification() {
        return {};
    }

    async seed(count: number) {
        console.log("🚀 Seeding Notification table with DUMMY DATA...");

        const data: any[] = [];
        for (let i = 0; i < count; i++) {
            const row = await this.generateRandomNotification();
            data.push(row);
        }

        await this.notificationDataSeederService.seed(data);

        console.log(
            "🟢 Seeding Notification table with DUMMY DATA is done successfully."
        );
    }
}
