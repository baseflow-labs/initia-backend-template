import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, MaxLength } from "class-validator";

export class CreateTableOneNameDto {
    // --- Original fields ---

    @IsNotEmpty()
    @MaxLength(25)
    @ApiProperty({
        required: true,
    })
    propertyOneName: string;

    // --- Relational fields ---
}
