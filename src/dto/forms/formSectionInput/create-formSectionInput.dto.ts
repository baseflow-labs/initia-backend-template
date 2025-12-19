import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import {
    IsArray,
    IsBoolean,
    IsOptional,
    IsString,
    IsUUID,
    MaxLength,
} from "class-validator";

export class CreateFormSectionInputDto {
    @Expose()
    @ApiProperty({ description: "Input label. Max 120 chars." })
    @IsString()
    @MaxLength(120)
    label: string;

    @Expose()
    @ApiPropertyOptional({
        description: "Optional note for the label. Max 500 chars.",
    })
    @IsOptional()
    @IsString()
    labelNote?: string;

    @Expose()
    @ApiProperty({
        description: "Input name (unique within section). Max 120 chars.",
    })
    @IsString()
    @MaxLength(120)
    name: string;

    @Expose()
    @ApiProperty({ description: "Input type. Max 120 chars." })
    @IsString()
    @MaxLength(120)
    type: string;

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
    @ApiProperty({ description: "Parent form section ID." })
    @IsUUID("4")
    formSectionId: string;
}
