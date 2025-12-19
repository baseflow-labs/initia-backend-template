import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {
    DeleteResult,
    FindManyOptions,
    Repository,
    UpdateResult,
} from "typeorm";
import {
    CustomResponseType,
    DeleteQueryProps,
    FullTokenPayload,
} from "@/types";
import { errorRes, newInstanceRes, updatedRes } from "@/responses";
import { CreateRoleDto, UpdateRoleDto } from "@/dto";
import {
    createHandler,
    deleteHandler,
    getAllHandler,
    getByIdHandler,
    updateHandler,
} from "@/helpers";
import { Role } from "@/entities";
import { UserRole, TablesNames } from "@/enums";

@Injectable()
export class RolesService {
    constructor(
        // ----- external services -----
        // ----- base services -----
        @InjectRepository(Role)
        private readonly roleRepository: Repository<Role>
    ) {}

    // --- Basic CRUD APIs ---

    async getRoles(
        query: FindManyOptions
    ): Promise<CustomResponseType<Role[]>> {
        return await getAllHandler<Role>({
            query,
            repository: this.roleRepository,
            table: "Roles",
        });
    }

    async getRoleById(id: string): Promise<CustomResponseType<Role>> {
        return await getByIdHandler<Role>({
            id,
            repository: this.roleRepository,
            table: TablesNames.ROLE,
        });
    }

    async createRole(
        createRoleDto: CreateRoleDto,
        userTokenData: Partial<FullTokenPayload>
    ): Promise<CustomResponseType<Role>> {
        try {
            // prevent non-admins from creating new roles
            if (userTokenData?.role !== UserRole.ADMIN) {
                throw new UnauthorizedException(
                    "Unauthorized, only admins can create new roles"
                );
            }

            const response = await createHandler<Role>({
                dto: createRoleDto,
                repository: this.roleRepository,
            });

            return newInstanceRes<Role>(
                "Role has been created successfully",
                response
            );
        } catch (error) {
            return errorRes(error.message);
        }
    }

    async updateRole(
        id: string,
        updateRoleDto: UpdateRoleDto
    ): Promise<CustomResponseType<UpdateResult & { newRecord: Role }>> {
        try {
            const response = await updateHandler<Role>({
                id,
                dto: updateRoleDto,
                table: TablesNames.ROLE,
                repository: this.roleRepository,
            });

            return updatedRes<UpdateResult & { newRecord: Role }>(
                "Role has been updated successfully",
                response
            );
        } catch (error) {
            return errorRes(error.message);
        }
    }

    async deleteRole(
        query: DeleteQueryProps,
        userTokenData: Partial<FullTokenPayload>
    ): Promise<CustomResponseType<DeleteResult>> {
        const { id, wipe } = query;

        return await deleteHandler<Role>({
            id,
            wipe,
            repository: this.roleRepository,
            table: "Role",
            userTokenData,
        });
    }
}
