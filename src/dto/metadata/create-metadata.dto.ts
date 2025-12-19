import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class CreateMetadataDto {
    // --- Original fields ---

    @Expose()
    @ApiProperty({
        required: true,
        description: "",
    })
    name: string;

    @Expose()
    @ApiProperty({
        required: true,
        description: "",
    })
    logo: string;

    @Expose()
    @ApiProperty({
        required: false,
        description: "",
    })
    phoneNumber?: string;

    @Expose()
    @ApiProperty({
        required: false,
        description: "",
    })
    slogan?: string;

    // --- Relational fields ---
}
