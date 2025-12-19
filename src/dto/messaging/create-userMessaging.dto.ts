import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import {
    IsArray,
    ArrayMinSize,
    IsBoolean,
    IsOptional,
    IsString,
    IsUUID,
    MaxLength,
} from "class-validator";

export class CreateUserMessagingDto {
    @Expose()
    @ApiProperty({
        description: "Is this a group userMessaging?",
        default: false,
    })
    @IsBoolean()
    isGroup: boolean = false;

    @Expose()
    @ApiPropertyOptional({
        description: "Group title (required for groups). Max 120 chars.",
    })
    @IsOptional()
    @IsString()
    @MaxLength(120)
    title?: string;

    @Expose()
    @ApiPropertyOptional({ description: "Group description. Max 500 chars." })
    @IsOptional()
    @IsString()
    @MaxLength(500)
    description?: string;

    @Expose()
    @ApiPropertyOptional({ description: "Group avatar URL" })
    @IsOptional()
    @IsString()
    avatarUrl?: string;

    @Expose()
    @ApiProperty({
        description:
            "Initial participant userIds. For direct chats, must resolve to exactly 2 unique users.",
        type: [String],
    })
    @IsArray()
    @ArrayMinSize(1)
    @IsUUID("4", { each: true })
    participantIds: string[];
}

export class CreateDirectUserMessagingDto {
    @Expose()
    @ApiProperty({
        description:
            "Initial participant userIds. For direct chats, must resolve to exactly 2 unique users.",
        type: [String],
    })
    @IsArray()
    @ArrayMinSize(1)
    @IsUUID("4", { each: true })
    participantIds: string[];
}
