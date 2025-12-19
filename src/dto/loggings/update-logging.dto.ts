import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateLoggingDto } from "./create-logging.dto";
import { IsOptional } from "class-validator";

export class UpdateLoggingDto extends PartialType(CreateLoggingDto) {
    // --- Original fields ---
    // --- Relational fields ---
}
