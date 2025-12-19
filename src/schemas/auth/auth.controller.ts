import { ControllerWrapper } from "@/decorators";
import { LoginUserDto, EmailDto } from "@/dto";
import { getUserTokenData } from "@/helpers";
import { UsersService } from "../users/users.service";
import { AuthService } from "./auth.service";
import {
    Body,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    Query,
    Req,
    Res,
} from "@nestjs/common";
import { ApiBody, ApiOperation } from "@nestjs/swagger";
import type { Request, Response } from "express";

import { UserRole } from "src/enums/userRole.enum";

@ControllerWrapper("auth")
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly usersService: UsersService
    ) {}

    @Get("isAuth")
    @ApiOperation({ summary: "check if you are authenticated or not" })
    getProfile(@Req() req: Request, @Res() res: Response) {
        const token = getUserTokenData(req);
        return res.status(200).json({
            message: `User is ${token ? "authenticated" : "not authenticated"}`,
            data: token,
            status: 200,
        });
    }

    @Get("passwordReset")
    @ApiOperation({
        summary: "display the HTML page for resetting the password",
    })
    passwordReset(@Res() res: Response) {
        return res.render("passwordReset.hbs", {});
    }

    @Get("passwordRequest")
    @ApiOperation({
        summary:
            "request a password reset if you forgot yours providing your identifier (email)",
    })
    @HttpCode(HttpStatus.OK)
    async requestPasswordReset(
        @Query("identifier") identifier: string,
        @Res() res: Response
    ) {
        const response =
            await this.authService.requestPasswordReset(identifier);
        return res.status(response.status).json(response);
    }

    @Get("validate/:token")
    @ApiOperation({
        summary: "validate the given token (only used for password reset)",
    })
    async validateToken(@Param("token") token: string, @Res() res: Response) {
        const response = await this.authService.validateToken(token);

        return res.status(response.status).json(response);
    }

    @Post("login")
    @ApiOperation({
        summary: "log in to create a local auth token (only for logging in)",
    })
    @HttpCode(HttpStatus.OK)
    @ApiBody({ type: LoginUserDto })
    async logIn(@Body() body: LoginUserDto, @Res() res: Response) {
        const { email, password } = body;
        const response = await this.authService.logIn(email, password);
        return res.status(response.status).json(response);
    }

    // ----- Dummy   Login ------

    @Post("dummy-login")
    @ApiOperation({
        summary:
            "dummy log in to create a local auth token (only for logging in)",
    })
    @HttpCode(HttpStatus.OK)
    @ApiBody({ type: DummyLoginUserDto })
    async dummyLogIn(@Body() body: DummyLoginUserDto, @Res() res: Response) {
        const { role } = body;

        if (process.env.ENVIRONMENT !== "staging") {
            return res.status(400).json({
                status: 400,
                message: "Dummy Login Not Available But In Demo / Staging",
                payload: "",
            });
        }

        if (Object.values(UserRole).includes(role)) {
            const { payload: users } = await this.usersService.getUsers({
                where: { role },
            });

            if (!users || users.length === 0) {
                return res.status(400).json({
                    status: 400,
                    message: "User Role Don't Exist",
                    payload: "",
                });
            }

            const user = users[0];

            const response = await this.authService.logIn(
                user.username,
                "12345678"
            );

            return res.status(response.status).json(response);
        }

        return res.status(400).json({
            status: 400,
            message: "User Role Don't Exist",
            payload: "",
        });
    }

    @Post("logout")
    @ApiOperation({
        summary: "log out to remove local auth token",
    })
    @HttpCode(HttpStatus.OK)
    @ApiBody({ type: EmailDto })
    async logOut(@Body() body: EmailDto, @Res() res: Response) {
        const { email } = body;
        const response = await this.authService.logOut(email);
        return res.status(response.status).json(response);
    }

    @Post("passwordReset")
    @ApiOperation({
        summary:
            "reset your password providing your identifier (email) and token",
    })
    @HttpCode(HttpStatus.OK)
    async resetPassword(
        @Query("identifier") identifier: string,
        @Query("newPassword") newPassword: string,
        @Query("token") token: string,
        @Res() res: Response
    ) {
        const response = await this.authService.resetPassword(
            identifier,
            newPassword,
            token
        );
        return res.status(response.status).json(response);
    }
}
