import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import {
    AppEvaluation,
    Faq,
    SupportTicket,
    UserManualContent,
    UserManualSection,
    UserManualSubsection,
} from "src/entities";
import { SupportController } from "./support.controller";
import { SupportService } from "./support.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Faq,
            SupportTicket,
            UserManualSection,
            UserManualSubsection,
            UserManualContent,
            AppEvaluation,
        ]),
    ],
    controllers: [SupportController],
    providers: [SupportService],
    exports: [SupportService],
})
export class SupportModule {}
