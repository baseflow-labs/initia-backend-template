import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsOptional, IsString, IsUUID, MaxLength } from "class-validator";

export class CreateUserManualSubsectionDto {
    @Expose()
    @ApiProperty({ description: "Subsection title" })
    @IsString()
    @MaxLength(200)
    title: string;

    @Expose()
    @ApiPropertyOptional({ description: "Subsection description" })
    @IsOptional()
    @IsString()
    description?: string;

    @Expose()
    @ApiProperty({ description: "Parent section ID" })
    @IsUUID("4")
    sectionId: string;
}
