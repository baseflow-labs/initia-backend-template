import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsString, IsUUID, MaxLength } from "class-validator";

export class CreateFormAnswerDto {
    @Expose()
    @ApiProperty({ description: "Answer text. Max 120 chars." })
    @IsString()
    @MaxLength(120)
    answer: string;

    @Expose()
    @ApiProperty({ description: "Parent input ID." })
    @IsUUID("4")
    inputId: string;
}
