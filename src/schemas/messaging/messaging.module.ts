import { UserMessagingController } from "./messaging.controller";
import { UserMessagingService } from "./messaging.service";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import {
    UserMessaging,
    UserMessagingMessage,
    UserMessagingMessageReaction,
    UserMessagingMessageRecipient,
    UserMessagingParticipant,
} from "src/entities";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            UserMessaging,
            UserMessagingParticipant,
            UserMessagingMessage,
            UserMessagingMessageRecipient,
            UserMessagingMessageReaction,
        ]),
    ],
    controllers: [UserMessagingController],
    providers: [UserMessagingService],
    exports: [UserMessagingService],
})
export class UserMessagingModule {}
