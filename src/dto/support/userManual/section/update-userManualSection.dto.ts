import { ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsOptional, IsString, MaxLength } from "class-validator";
import { CreateUserManualSectionDto } from "./create-userManualSection.dto";

export class UpdateUserManualSectionDto extends PartialType(
    CreateUserManualSectionDto
) {
    @Expose()
    @ApiPropertyOptional({ description: "Section title" })
    @IsOptional()
    @IsString()
    @MaxLength(200)
    title?: string;

    @Expose()
    @ApiPropertyOptional({ description: "Section description" })
    @IsOptional()
    @IsString()
    description?: string;
}
