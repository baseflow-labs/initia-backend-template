import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsInt, IsOptional, IsString, IsUUID, Max, Min } from "class-validator";

export class CreateAppEvaluationDto {
    @Expose()
    @ApiProperty()
    @IsInt()
    @Min(1)
    @Max(5)
    ui: number;

    @Expose()
    @ApiProperty()
    @IsInt()
    @Min(1)
    @Max(5)
    comprehensiveness: number;

    @Expose()
    @ApiProperty()
    @IsInt()
    @Min(1)
    @Max(5)
    performance: number;

    @Expose()
    @ApiProperty()
    @IsInt()
    @Min(1)
    @Max(5)
    dataAccuracy: number;

    @Expose()
    @ApiProperty()
    @IsInt()
    @Min(1)
    @Max(5)
    overall: number;

    @Expose()
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    notes?: string;

    @Expose()
    @ApiProperty({ description: "Owner user id" })
    @IsUUID("4")
    user: string;
}
