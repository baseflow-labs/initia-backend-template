import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { mailing } from "@/constants";
import { sendEmail } from "../../helpers";
import { errorRes, invalidRes, validRes } from "../../responses";
import { emailValidator } from "@/middlewares";
import { UsersService } from "@/schemas";
import { CustomResponseType, TokenPayload } from "@/types";

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private readonly mailerService: MailerService,
        private readonly usersService: UsersService
    ) {}

    async validateToken(token: string): Promise<CustomResponseType<string>> {
        try {
            const decoded = this.jwtService.verify(token);
            if (!decoded) return invalidRes("Invalid token", token);

            const { exp, iat, userId } = decoded;

            if (exp - iat < 0) return invalidRes("Token has expired!", token);

            const userToken = await this.usersService.getTokenById(userId);
            if (userToken.payload !== token) {
                return invalidRes("Invalid token", token);
            }

            return validRes("Token is valid", decoded);
        } catch (error) {
            return errorRes(`Token is invalid: ${error.message}`);
        }
    }

    async logIn(
        email: string,
        password: string
    ): Promise<CustomResponseType<string | null>> {
        try {
            const user = await this.usersService.checkUserCredentials({
                email,
                password,
            });

            if (user.status !== 200) {
                return { ...user, payload: null };
            }

            const {
                password: userPass,
                id,
                token: oldToken,
                ...rest
            } = user?.payload || {};

            const payload: TokenPayload = {
                userId: id || "",
                ...rest,
            };

            const token = await this.jwtService.signAsync(payload);

            await this.usersService.updateToken(email, token);

            return validRes("Token has been generated", {
                token,
                user: { id, ...rest },
            });
        } catch (error) {
            return errorRes(error.message);
        }
    }

    async logOut(email: string): Promise<CustomResponseType<string | null>> {
        try {
            const user = await this.usersService.checkUserCredentials({
                email,
                isOnlyEmail: true,
            });

            if (user.status !== 200) {
                return { ...user, payload: null };
            }

            await this.usersService.updateToken(email, "");

            return validRes("LogOut Been Successful", {});
        } catch (error) {
            return errorRes(error.message);
        }
    }

    async requestPasswordReset(
        email: string
    ): Promise<CustomResponseType<string | null>> {
        try {
            const user = await this.usersService.checkUserCredentials({
                email,
                isOnlyEmail: true,
            });

            if (user.status !== 200) {
                return { ...user, payload: null };
            }

            const token = await this.jwtService.signAsync({
                userId: user?.payload?.id,
                email: user?.payload?.email,
            });

            const updateResponse = await this.usersService.updateToken(
                email,
                token
            );
            if (updateResponse.status === 500)
                throw new Error("Couldn't update the token");

            const response = await sendEmail(
                mailing.passwordRequest(
                    user?.payload?.email || "",
                    process.env.ENVIRONMENT || "",
                    token
                ),
                this.mailerService
            );

            return response;
        } catch (error) {
            return errorRes(error.message);
        }
    }

    async resetPassword(
        identifier: string,
        newPassword: string,
        token: string
    ): Promise<CustomResponseType<any>> {
        try {
            const response = await this.validateToken(token);
            if (response.status !== 200)
                return invalidRes(response.message, response.payload);

            return await this.usersService.updatePassword(
                identifier,
                newPassword
            );
        } catch (error) {
            return errorRes(error.message);
        }
    }
}
