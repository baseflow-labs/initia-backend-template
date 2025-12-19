import { ApiProperty, IntersectionType } from "@nestjs/swagger";
import { LoginUserDto } from "./login-user.dto";
import { UserRole } from "@/enums";
import {
    IsAlphanumeric,
    NotContains,
    IsNotEmpty,
    MinLength,
    MaxLength,
    Length,
    IsEnum,
    IsOptional,
} from "class-validator";

export class CreateUserDto extends IntersectionType(LoginUserDto) {
    // --- Original fields ---
    @Length(8, 25)
    @ApiProperty({
        example: "s5Rsa2?#sd1154",
        description: "passwordConfirmation must be identical with the password",
        required: true,
    })
    passwordConfirmation: string;

    @IsOptional()
    @IsEnum(UserRole)
    @ApiProperty({
        example: UserRole.CUSTOMER,
        default: UserRole.CUSTOMER,
        enum: UserRole,
        required: true,
    })
    role: UserRole;

    @IsOptional()
    @ApiProperty({
        type: "string",
        format: "binary",
        example: "url",
        required: false,
    })
    avatar?: Express.Multer.File;

    // --- Additional fields ---

    @ApiProperty({
        example: "",
        description: "provide the app secret to create a new admin",
        required: false,
    })
    secret?: string;

    @IsAlphanumeric()
    @NotContains(" ")
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(25)
    @ApiProperty({
        required: true,
        description: "username must have length between (5, 25) characters",
    })
    username: string;

    // --- Relational fields ---
}
