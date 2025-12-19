import { ApiPropertyOptional } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsNotEmpty, IsUUID, MaxLength } from "class-validator";

export class UpdateUserMessagingMessageDto {
    @Expose()
    @ApiPropertyOptional({
        description: "Message text. Omit when sending only attachments.",
        maxLength: 5000,
    })
    @IsNotEmpty()
    @MaxLength(5000)
    text: string;

    @Expose()
    @ApiPropertyOptional({
        description: "",
    })
    @IsNotEmpty()
    @IsUUID("4")
    editorId: string;
}
