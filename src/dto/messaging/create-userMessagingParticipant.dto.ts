import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsBoolean, IsIn, IsOptional, IsUUID } from "class-validator";

export class CreateUserMessagingParticipantDto {
    @Expose()
    @ApiProperty({ description: "User ID to add" })
    @IsUUID("4")
    userId: string;

    @Expose()
    @ApiPropertyOptional({
        description: "Role within the userMessaging",
        enum: ["owner", "admin", "member"],
    })
    @IsOptional()
    @IsIn(["owner", "admin", "member"])
    role?: "owner" | "admin" | "member" = "member";

    @Expose()
    @ApiPropertyOptional({ description: "Start as muted?" })
    @IsOptional()
    @IsBoolean()
    muted?: boolean = false;
}
