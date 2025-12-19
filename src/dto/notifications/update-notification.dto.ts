import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateNotificationDto } from "./create-notification.dto";
import { IsOptional } from "class-validator";

export class UpdateNotificationDto extends PartialType(CreateNotificationDto) {
    // --- Original fields ---
    // --- Relational fields ---
}
