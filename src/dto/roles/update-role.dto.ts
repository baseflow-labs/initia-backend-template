import { PartialType } from "@nestjs/swagger";
import { CreateRoleDto } from "./create-role.dto";
import { IsOptional } from "class-validator";

export class UpdateRoleDto extends PartialType(CreateRoleDto) {
    // --- Original fields ---
    // --- Relational fields ---
}
