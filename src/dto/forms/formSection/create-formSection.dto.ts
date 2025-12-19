import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsOptional, IsString, IsUUID, MaxLength } from "class-validator";

export class CreateFormSectionDto {
    @Expose()
    @ApiProperty({ description: "Section title. Max 120 chars." })
    @IsString()
    @MaxLength(120)
    title: string;

    @Expose()
    @ApiPropertyOptional({ description: "Section description. Max 500 chars." })
    @IsOptional()
    @IsString()
    @MaxLength(500)
    description?: string;

    @Expose()
    @ApiProperty({ description: "Parent form ID." })
    @IsUUID("4")
    formId: string;
}
