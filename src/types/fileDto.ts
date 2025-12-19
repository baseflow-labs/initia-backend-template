import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsNotEmpty } from "class-validator";

export class FileDto {
    @Expose()
    @IsNotEmpty()
    @ApiProperty({
        required: true,
        description: "ID of file saved into DB",
    })
    id: string;
}
