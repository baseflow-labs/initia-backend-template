import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsUUID } from "class-validator";

export class UpdateUserMessagingMessageReadStatusDto {
    @Expose()
    @ApiProperty({ description: "Message ID" })
    @IsUUID("4")
    upToMessageId: string;

    @Expose()
    @ApiProperty({ description: "User ID who should receive the message" })
    @IsUUID("4")
    userId: string;
}
