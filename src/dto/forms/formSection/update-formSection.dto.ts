import { ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsOptional, IsString, IsUUID, MaxLength } from "class-validator";
import { CreateFormSectionDto } from "./create-formSection.dto";

export class UpdateFormSectionDto extends PartialType(CreateFormSectionDto) {
    @Expose()
    @ApiPropertyOptional({ description: "Section title. Max 120 chars." })
    @IsOptional()
    @IsString()
    @MaxLength(120)
    title?: string;

    @Expose()
    @ApiPropertyOptional({ description: "Section description. Max 500 chars." })
    @IsOptional()
    @IsString()
    @MaxLength(500)
    description?: string;

    @Expose()
    @ApiPropertyOptional({ description: "Parent form ID." })
    @IsOptional()
    @IsUUID("4")
    formId?: string;
}
