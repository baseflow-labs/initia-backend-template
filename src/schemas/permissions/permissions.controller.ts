import {
    Body,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
    Req,
    Res,
} from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";
import type { DeleteResult, FindManyOptions, UpdateResult } from "typeorm";
import type { Request, Response } from "express";
import { PermissionsService } from "./permissions.service";
import {
    EditorsWrapper,
    ControllerWrapper,
    GetAllByQuery,
    DeletionQuery,
} from "@/decorators";
import type { CustomResponseType, DeleteQueryProps } from "@/types";
import { PermissionFields, TablesNames } from "@/enums";
import { RELATIONS_OBJECT } from "@/constants";
import { DELETE_Pipe, GET_Pipe, POST_PATCH_Pipe } from "@/pipes";
import { Permission } from "@/entities";
import { CreatePermissionDto, UpdatePermissionDto } from "@/dto";
import { getUserTokenData } from "@/helpers";

@ControllerWrapper("permission")
export class PermissionsController {
    constructor(private readonly permissionsService: PermissionsService) {}

    // --- Basic CRUD endpoints ---

    @Get()
    @GetAllByQuery({
        fieldsEnum: PermissionFields,
        descendants: RELATIONS_OBJECT.permission.descendants,
    })
    async getPermissions(
        @Query(
            new GET_Pipe(
                PermissionFields,
                RELATIONS_OBJECT.permission.ascendants
            )
        )
        query: FindManyOptions,
        @Res() res: Response
    ) {
        const response: CustomResponseType<Permission[]> =
            await this.permissionsService.getPermissions(query);
        return res.status(response.status).json(response);
    }

    @Get(":id")
    @ApiOperation({ summary: "get a single permission using its ID" })
    async getPermissionById(@Param("id") id: string, @Res() res: Response) {
        const response: CustomResponseType<Permission> =
            await this.permissionsService.getPermissionById(id);

        return res.status(response.status).json(response);
    }

    @Post()
    @EditorsWrapper(CreatePermissionDto, "create a new permission")
    async createPermission(
        @Body(new POST_PATCH_Pipe(TablesNames.PERMISSION))
        createPermissionDto: CreatePermissionDto,
        @Res() res: Response
    ) {
        const response: CustomResponseType<Permission> =
            await this.permissionsService.createPermission(createPermissionDto);

        return res.status(response.status).json(response);
    }

    @Patch(":id")
    @EditorsWrapper(UpdatePermissionDto, "update a permission")
    async updatePermission(
        @Param("id") id: string,
        @Body(new POST_PATCH_Pipe(TablesNames.PERMISSION))
        updatePermissionDto: UpdatePermissionDto,
        @Res() res: Response
    ) {
        const response: CustomResponseType<UpdateResult> =
            await this.permissionsService.updatePermission(
                id,
                updatePermissionDto
            );

        return res.status(response.status).json(response);
    }

    @Delete()
    @DeletionQuery("delete permissions")
    async deletePermission(
        @Query(new DELETE_Pipe()) query: DeleteQueryProps,
        @Req() req: Request,
        @Res() res: Response
    ) {
        const response: CustomResponseType<DeleteResult> =
            await this.permissionsService.deletePermission(
                query,
                getUserTokenData(req)
            );

        return res.status(response.status).json(response);
    }
}
