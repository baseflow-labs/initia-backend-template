import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty } from "class-validator";
import { TablesNames } from "@/enums";

export class CreateFileDto {
    // --- Original fields ---

    @IsEnum(TablesNames)
    @ApiProperty({
        enum: TablesNames,
        required: true,
    })
    tableName: TablesNames;

    @IsNotEmpty()
    @ApiProperty({
        required: true,
    })
    propName: string;

    @IsNotEmpty()
    @ApiProperty({
        required: true,
    })
    rowId: string;

    @IsNotEmpty()
    @ApiProperty({
        required: true,
    })
    filePath: string;

    // --- Relational fields ---
}
