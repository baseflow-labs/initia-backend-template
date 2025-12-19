import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import {
    IsBoolean,
    IsOptional,
    IsString,
    IsUUID,
    MaxLength,
} from "class-validator";

export class CreateSupportTicketDto {
    @Expose()
    @ApiProperty()
    @IsString()
    @MaxLength(50)
    type: string;

    @Expose()
    @ApiProperty()
    @IsString()
    @MaxLength(200)
    title: string;

    @Expose()
    @ApiPropertyOptional()
    @IsOptional()
    @IsBoolean()
    urgent?: boolean;

    @Expose()
    @ApiProperty()
    @IsString()
    content: string;

    @Expose()
    @ApiProperty({ description: "Owner user id" })
    @IsUUID("4")
    userId: string;
}
