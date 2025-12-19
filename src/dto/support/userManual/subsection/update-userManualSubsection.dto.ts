import { ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsOptional, IsString, IsUUID, MaxLength } from "class-validator";
import { CreateUserManualSubsectionDto } from "./create-userManualSubsection.dto";

export class UpdateUserManualSubsectionDto extends PartialType(
    CreateUserManualSubsectionDto
) {
    @Expose()
    @ApiPropertyOptional({ description: "Subsection title" })
    @IsOptional()
    @IsString()
    @MaxLength(200)
    title?: string;

    @Expose()
    @ApiPropertyOptional({ description: "Subsection description" })
    @IsOptional()
    @IsString()
    description?: string;

    @Expose()
    @ApiPropertyOptional({ description: "Parent section ID" })
    @IsOptional()
    @IsUUID("4")
    sectionId?: string;
}
