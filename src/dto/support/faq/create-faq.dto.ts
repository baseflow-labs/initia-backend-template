import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsOptional, IsString, MaxLength } from "class-validator";

export class CreateFaqDto {
    @Expose()
    @ApiProperty({ description: "FAQ title" })
    @IsString()
    @MaxLength(200)
    title: string;

    @Expose()
    @ApiProperty({ description: "FAQ content/body" })
    @IsString()
    content: string;

    @Expose()
    @ApiPropertyOptional({ description: "Optional link for more details" })
    @IsOptional()
    @IsString()
    @MaxLength(2048)
    link?: string;
}
