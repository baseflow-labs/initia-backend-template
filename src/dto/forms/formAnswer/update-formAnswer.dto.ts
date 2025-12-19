import { ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsOptional, IsString, IsUUID, MaxLength } from "class-validator";
import { CreateFormAnswerDto } from "./create-formAnswer.dto";

export class UpdateFormAnswerDto extends PartialType(CreateFormAnswerDto) {
    @Expose()
    @ApiPropertyOptional({ description: "Answer text. Max 120 chars." })
    @IsOptional()
    @IsString()
    @MaxLength(120)
    answer?: string;

    @Expose()
    @ApiPropertyOptional({ description: "Parent input ID." })
    @IsOptional()
    @IsUUID("4")
    inputId?: string;
}
