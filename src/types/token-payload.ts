import { UserRole } from "../enums/userRole.enum";

export type TokenPayload = {
    userId: string;
    email?: string;
    role?: UserRole;
    createdAt?: Date;
    updatedAt?: Date;
};

export type FullTokenPayload = TokenPayload & {
    iat: number;
    exp: number;
};
