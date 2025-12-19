import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreatePermissionDto } from "./create-permission.dto";
import { PermissionAction } from "../../enums/permissions.enum";
import { TablesNames } from "../../enums/tables.enum";
import { IsOptional, IsEnum } from "class-validator";

export class UpdatePermissionDto extends PartialType(CreatePermissionDto) {
    // --- Original fields ---

    @ApiProperty({ required: false })
    description?: string;

    @IsEnum(PermissionAction)
    @ApiProperty({
        enum: PermissionAction,
        required: false,
    })
    action?: PermissionAction;

    @IsEnum(TablesNames)
    @ApiProperty({
        enum: TablesNames,
        required: false,
    })
    table?: TablesNames;

    // --- Relational fields ---

    @ApiProperty({
        required: false,
        description: "enter the related role ID",
    })
    role?: string;
}
