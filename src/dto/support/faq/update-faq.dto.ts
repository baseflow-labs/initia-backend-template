import { ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsOptional, IsString, MaxLength } from "class-validator";
import { CreateFaqDto } from "./create-faq.dto";

export class UpdateFaqDto extends PartialType(CreateFaqDto) {
    @Expose()
    @ApiPropertyOptional({ description: "FAQ title" })
    @IsOptional()
    title?: string;

    @Expose()
    @ApiPropertyOptional({ description: "FAQ content/body" })
    @IsOptional()
    content?: string;

    @Expose()
    @ApiPropertyOptional({ description: "Optional link for more details" })
    @IsOptional()
    link?: string;
}
