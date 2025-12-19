import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {
    DeleteResult,
    FindManyOptions,
    Repository,
    UpdateResult,
} from "typeorm";
import { compare, hash } from "bcrypt";
import { User } from "@/entities";
import {
    CustomResponseType,
    FullTokenPayload,
    DeleteQueryProps,
} from "@/types";
import { UserRole, TablesNames } from "@/enums";
import {
    errorRes,
    forbiddenRes,
    foundRes,
    newInstanceRes,
    notFoundRes,
    updatedRes,
} from "@/responses";
import { UpdateUserDto, CreateUserDto } from "@/dto";
import {
    createHandler,
    deleteHandler,
    getAllHandler,
    getByIdHandler,
    updateHandler,
} from "@/helpers";

@Injectable()
export class UsersService {
    constructor(
        // ----- external services -----
        // ----- base services -----
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}

    // --- Helper Methods ---

    async checkUserCredentials({
        email,
        password = "",
        isOnlyEmail = false,
    }: {
        email: string;
        password?: string;
        isOnlyEmail?: boolean;
    }): Promise<CustomResponseType<User | null>> {
        try {
            const response = await this.userRepository.find({
                where: {
                    email,
                },
            });

            if (!response?.length) {
                return notFoundRes("Email does not exist");
            }

            const user: User = response[0];

            if (isOnlyEmail) {
                return foundRes("User has been found", user);
            }
            if (!(await compare(password, user?.password))) {
                return forbiddenRes("Invalid password");
            }

            return foundRes("User has been found", user);
        } catch (error) {
            return errorRes(error.message);
        }
    }

    // --- Additional CRUD APIs ---

    async updatePassword(
        email: string,
        newPassword: string
    ): Promise<
        CustomResponseType<(UpdateResult & { newRecord: User }) | null>
    > {
        try {
            const user = await this.checkUserCredentials({
                email,
                isOnlyEmail: true,
            });
            if (!user?.payload || user.status !== 200) {
                return { ...user, payload: null };
            }

            const response = await this.userRepository.update(
                {
                    id: user?.payload?.id,
                },
                {
                    password: await hash(newPassword, 12),
                    token: "",
                }
            );

            return newInstanceRes<UpdateResult & { newRecord: User }>(
                "Password has been updated successfully",
                { ...response, newRecord: user?.payload }
            );
        } catch (error) {
            return errorRes(error.message);
        }
    }

    async updateToken(
        email: string,
        token: string
    ): Promise<
        CustomResponseType<(UpdateResult & { newRecord: User }) | null>
    > {
        const user = await this.checkUserCredentials({
            email,
            isOnlyEmail: true,
        });
        if (!user?.payload || user.status !== 200) {
            return { ...user, payload: null };
        }

        const response = await this.userRepository.update(
            {
                id: user?.payload?.id,
            },
            {
                token,
            }
        );

        return newInstanceRes<UpdateResult & { newRecord: User }>(
            "Password has been updated successfully",
            { ...response, newRecord: user?.payload }
        );
    }

    async getTokenById(id: string): Promise<CustomResponseType<string | null>> {
        try {
            const response = await this.userRepository.findOneBy({ id });
            if (!response) {
                return notFoundRes("User doesn't exist");
            }
            return foundRes<string>(
                "Token has been found",
                response?.token || ""
            );
        } catch (error) {
            return errorRes(error.message);
        }
    }

    // --- Basic CRUD APIs ---

    async getUsers(
        query: FindManyOptions
    ): Promise<CustomResponseType<User[]>> {
        return await getAllHandler<User>({
            query,
            repository: this.userRepository,
            table: "Users",
            blacklist: ["password", "token"],
        });
    }

    async getUserById(id: string): Promise<CustomResponseType<User>> {
        return await getByIdHandler<User>({
            id,
            repository: this.userRepository,
            table: TablesNames.USER,
        });
    }

    async createUser(
        createUserDto: CreateUserDto,
        userTokenData: Partial<FullTokenPayload>
    ): Promise<CustomResponseType<User | null>> {
        try {
            const isSecretCorrect =
                createUserDto.secret &&
                (await compare(
                    createUserDto.secret,
                    process.env.HASHED_APP_SECRET || ""
                ));

            // prevent the non-admins from creating an admin account
            if (
                createUserDto.role === UserRole.ADMIN &&
                (!userTokenData || userTokenData.role === UserRole.CUSTOMER) &&
                !isSecretCorrect
            ) {
                return forbiddenRes(
                    "Unauthorized! To create an admin account, you must provide the secret or sign in with another admin account"
                );
            }

            // check if the two passwords are match each others
            if (createUserDto.password !== createUserDto.passwordConfirmation) {
                return errorRes("The two passwords don't match each others");
            }

            const response = await createHandler<User>({
                dto: {
                    ...createUserDto,
                    password: await hash(createUserDto?.password, 12),
                },
                repository: this.userRepository,
                blacklist: ["password", "record"],
            });

            return newInstanceRes<User>(
                "User has been created successfully",
                response
            );
        } catch (error) {
            return errorRes(error.message);
        }
    }

    async updateUser(
        id: string,
        updateUserDto: UpdateUserDto,
        userTokenData: Partial<FullTokenPayload>
    ): Promise<
        CustomResponseType<(UpdateResult & { newRecord: User }) | null>
    > {
        try {
            const isSecretCorrect =
                updateUserDto.secret &&
                (await compare(
                    updateUserDto.secret,
                    process.env.HASHED_APP_SECRET || ""
                ));

            // check if the user is an admin
            const isAdminAccount =
                userTokenData && userTokenData.role === UserRole.ADMIN;

            // prevent the non-admins from:
            // - updating their account roles
            // - changing their passwords from here
            // - changing others' data
            if (userTokenData && !isAdminAccount) {
                if (updateUserDto?.role) {
                    return forbiddenRes(
                        "Unauthorized entrance, you must be an admin to update your role"
                    );
                }
                if (updateUserDto?.password) {
                    return forbiddenRes(
                        "Unauthorized entrance, non-admins are not allowed to change your password from this endpoint"
                    );
                }
                if (userTokenData?.userId !== id) {
                    return forbiddenRes(
                        "Unauthorized entrance, non-admins are only allowed to update their accounts"
                    );
                }
            }

            const response = await updateHandler<User>({
                id,
                dto: updateUserDto,
                table: TablesNames.USER,
                repository: this.userRepository,
                blacklist: ["password", "record"],
            });

            return updatedRes<UpdateResult & { newRecord: User }>(
                "User has been updated successfully",
                response,
                updateUserDto
            );
        } catch (error) {
            return errorRes(error.message);
        }
    }

    async deleteUser(
        query: DeleteQueryProps,
        userTokenData: Partial<FullTokenPayload>
    ): Promise<CustomResponseType<DeleteResult | null>> {
        const { id, wipe } = query;

        // prevent non-admins from deleting others' accounts
        if (
            userTokenData?.userId !== id &&
            userTokenData?.role !== UserRole.ADMIN
        ) {
            return forbiddenRes(
                "Unauthorized, you're only allowed to delete your account! Sign in first"
            );
        }

        return await deleteHandler<User>({
            id,
            wipe,
            repository: this.userRepository,
            table: "User",
            userTokenData,
        });
    }
}
