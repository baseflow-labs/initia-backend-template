import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateUserMessagingMessageReactionDto {
    @Expose()
    @ApiProperty({ description: "Reaction emoji (e.g., 👍, :heart:, U+1F44D)" })
    @IsString()
    @IsNotEmpty()
    @MaxLength(32)
    emoji: string;
}
