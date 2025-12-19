import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsOptional, IsString, IsUUID, MaxLength } from "class-validator";

export class CreateUserManualContentDto {
    @Expose()
    @ApiProperty({ description: "Content title" })
    @IsString()
    @MaxLength(200)
    title: string;

    @Expose()
    @ApiPropertyOptional({ description: "Content description/body" })
    @IsOptional()
    @IsString()
    description?: string;

    @Expose()
    @ApiProperty({ description: "Parent subsection ID" })
    @IsUUID("4")
    subsectionId: string;
}
