import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateFileDto } from "./create-file.dto";
import { IsEnum } from "class-validator";
import { TablesNames } from "../../enums/tables.enum";
import { IsOptional } from "class-validator";

export class UpdateFileDto extends PartialType(CreateFileDto) {
    // --- Original fields ---

    @IsOptional()
    @IsEnum(TablesNames)
    @ApiProperty({
        enum: TablesNames,
        required: false,
    })
    tableName?: TablesNames;

    @IsOptional()
    @ApiProperty({ required: false })
    propName?: string;

    @IsOptional()
    @ApiProperty({ required: false })
    rowId?: string;

    @IsOptional()
    @ApiProperty({ required: false })
    filePath?: string;

    // --- Relational fields ---

    @ApiProperty({
        required: false,
        description: "enter the related role ID",
    })
    role?: string;
}
