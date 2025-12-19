import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import {
    IsOptional,
    IsString,
    IsUUID,
    MaxLength,
    IsArray,
} from "class-validator";

export class CreateUserMessagingMessageDto {
    @Expose()
    @ApiPropertyOptional({
        description: "Message text. Omit when sending only attachments.",
        maxLength: 5000,
    })
    @IsOptional()
    @IsString()
    @MaxLength(5000)
    text?: string;

    @Expose()
    @ApiPropertyOptional({
        description: "If replying, the parent message id (threading).",
    })
    @IsOptional()
    @IsUUID("4")
    parentMessageId?: string;

    @Expose()
    @ApiPropertyOptional({
        description: "IDs of previously uploaded files to attach.",
        type: [String],
    })
    @IsOptional()
    @IsArray()
    @IsUUID("4", { each: true })
    attachmentFileIds?: string[];
}
