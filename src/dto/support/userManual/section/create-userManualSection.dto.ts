import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsOptional, IsString, MaxLength } from "class-validator";

export class CreateUserManualSectionDto {
    @Expose()
    @ApiProperty({ description: "Section title" })
    @IsString()
    @MaxLength(200)
    title: string;

    @Expose()
    @ApiPropertyOptional({ description: "Section description" })
    @IsOptional()
    @IsString()
    description?: string;
}
