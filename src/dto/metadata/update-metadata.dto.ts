import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateMetadataDto } from "./create-metadata.dto";
import { IsOptional } from "class-validator";
import { Expose } from "class-transformer";

export class UpdateMetadataDto extends PartialType(CreateMetadataDto) {
    // --- Original fields ---

    @Expose()
    @IsOptional()
    @ApiProperty({ required: false })
    name?: string;

    @Expose()
    @IsOptional()
    @ApiProperty({ required: false })
    logo?: string;

    @Expose()
    @IsOptional()
    @ApiProperty({ required: false })
    phoneNumber?: string;

    @Expose()
    @IsOptional()
    @ApiProperty({ required: false })
    slogan?: string;

    // --- Relational fields ---
}
