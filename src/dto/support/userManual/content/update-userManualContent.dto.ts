import { ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsOptional, IsString, IsUUID, MaxLength } from "class-validator";
import { CreateUserManualContentDto } from "./create-userManualContent.dto";

export class UpdateUserManualContentDto extends PartialType(
    CreateUserManualContentDto
) {
    @Expose()
    @ApiPropertyOptional({ description: "Content title" })
    @IsOptional()
    @IsString()
    @MaxLength(200)
    title?: string;

    @Expose()
    @ApiPropertyOptional({ description: "Content description/body" })
    @IsOptional()
    @IsString()
    description?: string;

    @Expose()
    @ApiPropertyOptional({ description: "Parent subsection ID" })
    @IsOptional()
    @IsUUID("4")
    subsectionId?: string;
}
