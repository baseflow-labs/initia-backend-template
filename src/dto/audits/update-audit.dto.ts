import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateAuditDto } from "./create-audit.dto";
import { IsOptional } from "class-validator";

export class UpdateAuditDto extends PartialType(CreateAuditDto) {
    // --- Original fields ---
    // --- Relational fields ---
}
