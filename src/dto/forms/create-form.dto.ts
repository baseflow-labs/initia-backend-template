import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateFormDto {
    @Expose()
    @IsNotEmpty()
    @ApiProperty({ description: "Form title. Max 120 chars." })
    title: string;

    @Expose()
    @IsOptional()
    @ApiPropertyOptional({ description: "Form description. Max 500 chars." })
    description?: string;
}
