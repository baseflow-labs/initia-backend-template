import { ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsOptional, IsString, MaxLength } from "class-validator";
import { CreateUserMessagingDto } from "./create-userMessaging.dto";

export class UpdateUserMessagingDto extends PartialType(
    CreateUserMessagingDto
) {
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
}
