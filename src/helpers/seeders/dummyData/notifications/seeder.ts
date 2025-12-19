import { GenericDataSeederService } from "../tools/genericDataSeeder";
import { Injectable } from "@nestjs/common";
import { Notification } from "@/entities";

@Injectable()
export class NotificationDataSeederService {
    constructor(
        private readonly genericDataSeederService: GenericDataSeederService
    ) {}

    async seed(notificationsToSeed) {
        for (const notification of notificationsToSeed) {
            const consoleLogMessage = JSON.stringify(notification);

            console.log(
                `🚀 Seeding Notification table with DUMMY DATA of ${consoleLogMessage}...`
            );

            await this.genericDataSeederService.seedData({
                row: notification,
                entity: Notification,
            });

            console.log(
                `🟢 Seeding Notification table with DUMMY DATA of ${consoleLogMessage} is done successfully.`
            );
        }
    }
}
