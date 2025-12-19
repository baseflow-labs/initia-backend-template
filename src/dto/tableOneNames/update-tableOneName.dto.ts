import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateTableOneNameDto } from "./create-tableOneName.dto";
import { IsOptional } from "class-validator";

export class UpdateTableOneNameDto extends PartialType(CreateTableOneNameDto) {
    // --- Original fields ---

    @IsOptional()
    @ApiProperty({ required: false })
    propertyOneName?: string;

    // --- Relational fields ---
}
