import { ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsOptional, IsString, MaxLength } from "class-validator";
import { CreateFormDto } from "./create-form.dto";

export class UpdateFormDto extends PartialType(CreateFormDto) {
    @Expose()
    @ApiPropertyOptional({ description: "Form title. Max 120 chars." })
    @IsOptional()
    @IsString()
    @MaxLength(120)
    title?: string;

    @Expose()
    @ApiPropertyOptional({ description: "Form description. Max 500 chars." })
    @IsOptional()
    @IsString()
    @MaxLength(500)
    description?: string;
}
