import { ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import {
    IsArray,
    IsBoolean,
    IsOptional,
    IsString,
    IsUUID,
    MaxLength,
} from "class-validator";
import { CreateFormSectionInputDto } from "./create-formSectionInput.dto";

export class UpdateFormSectionInputDto extends PartialType(
    CreateFormSectionInputDto
) {
    @Expose()
    @ApiPropertyOptional({ description: "Input label. Max 120 chars." })
    @IsOptional()
    @IsString()
    @MaxLength(120)
    label?: string;

    @Expose()
    @ApiPropertyOptional({
        description: "Optional note for the label. Max 500 chars.",
    })
    @IsOptional()
    @IsString()
    labelNote?: string;

    @Expose()
    @ApiPropertyOptional({
        description: "Input name (unique within section). Max 120 chars.",
    })
    @IsOptional()
    @IsString()
    @MaxLength(120)
    name?: string;

    @Expose()
    @ApiPropertyOptional({ description: "Input type. Max 120 chars." })
    @IsOptional()
    @IsString()
    @MaxLength(120)
    type?: string;

    @Expose()
    @ApiPropertyOptional({ description: "Is this input required?" })
    @IsOptional()
    @IsBoolean()
    required?: boolean;

    @Expose()
    @ApiPropertyOptional({
        description: "Options for select/radio/checkbox inputs.",
        type: [String],
    })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    options?: string[];

    @Expose()
    @ApiPropertyOptional({ description: "Parent form section ID." })
    @IsOptional()
    @IsUUID("4")
    formSectionId?: string;
}
