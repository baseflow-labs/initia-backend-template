import { TableOneNamesService } from "./tableOneNames.service";
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
import type { Request, Response } from "express";
import { RELATIONS_OBJECT } from "@/constants";
import {
    DeletionQuery,
    ControllerWrapper,
    EditorsWrapper,
    GetAllByQuery,
} from "@/decorators";
import { CreateTableOneNameDto, UpdateTableOneNameDto } from "@/dto";
import { TableOneName } from "@/entities";
import { TableOneNameFields, TablesNames } from "@/enums";
import { getUserTokenData } from "@/helpers";
import { DELETE_Pipe, GET_Pipe, POST_PATCH_Pipe } from "@/pipes";
import type { CustomResponseType, DeleteQueryProps } from "@/types";
import type { DeleteResult, FindManyOptions, UpdateResult } from "typeorm";

@ControllerWrapper("tableOneName")
export class TableOneNamesController {
    constructor(private readonly tableOneNamesService: TableOneNamesService) {}

    // --- Basic CRUD endpoints ---

    @Get()
    @GetAllByQuery({
        fieldsEnum: TableOneNameFields,
        descendants: RELATIONS_OBJECT.tableOneName.descendants,
    })
    async getTableOneNames(
        @Query(
            new GET_Pipe(
                TableOneNameFields,
                RELATIONS_OBJECT.tableOneName.ascendants
            )
        )
        query: FindManyOptions,
        @Res() res: Response
    ) {
        const response: CustomResponseType<TableOneName[]> =
            await this.tableOneNamesService.getTableOneNames(query);
        return res.status(response.status).json(response);
    }

    @Get(":id")
    @ApiOperation({ summary: "Get a Single tableOneName by ID" })
    async getTableOneNameById(@Param("id") id: string, @Res() res: Response) {
        const response: CustomResponseType<TableOneName> =
            await this.tableOneNamesService.getTableOneNameById(id);

        return res.status(response.status).json(response);
    }

    @Post()
    @EditorsWrapper(CreateTableOneNameDto, "Create a New tableOneName")
    async createTableOneName(
        @Body(new POST_PATCH_Pipe(TablesNames.TABLE_ONE_NAME))
        createTableOneNameDto: CreateTableOneNameDto,
        @Res() res: Response
    ) {
        const response: CustomResponseType<TableOneName> =
            await this.tableOneNamesService.createTableOneName(
                createTableOneNameDto
            );

        return res.status(response.status).json(response);
    }

    @Post("bulk")
    @EditorsWrapper(CreateTableOneNameDto, "Bulk create tableOneNames")
    async createBulkTableOneName(
        @Body(new POST_PATCH_Pipe(TablesNames.TABLE_ONE_NAME))
        createTableOneNameDtos: CreateTableOneNameDto[],
        @Res() res: Response
    ) {
        const response = await this.tableOneNamesService.createBulkTableOneName(
            createTableOneNameDtos
        );

        return res.status(response.status).json(response);
    }

    @Patch(":id")
    @EditorsWrapper(UpdateTableOneNameDto, "Update a tableOneName")
    async updateTableOneName(
        @Param("id") id: string,
        @Body(new POST_PATCH_Pipe(TablesNames.TABLE_ONE_NAME))
        updateTableOneNameDto: UpdateTableOneNameDto,
        @Res() res: Response
    ) {
        const response: CustomResponseType<UpdateResult> =
            await this.tableOneNamesService.updateTableOneName(
                id,
                updateTableOneNameDto
            );

        return res.status(response.status).json(response);
    }

    @Patch("bulk")
    @EditorsWrapper(UpdateTableOneNameDto, "Bulk update tableOneName")
    async updateBulkTableOneName(
        @Body(new POST_PATCH_Pipe(TablesNames.TABLE_ONE_NAME))
        updates: { id: string; data: UpdateTableOneNameDto }[],
        @Res() res: Response
    ) {
        const response =
            await this.tableOneNamesService.updateBulkTableOneName(updates);

        return res.status(response.status).json(response);
    }

    @Post("upsert/:prop")
    @EditorsWrapper(
        CreateTableOneNameDto,
        "Update or Create a New tableOneName"
    )
    async upsertTableOneName(
        @Param("prop") prop: string,
        @Body(new POST_PATCH_Pipe(TablesNames.TABLE_ONE_NAME))
        upsertTableOneNameDto: CreateTableOneNameDto,
        @Res() res: Response
    ) {
        const response: CustomResponseType<TableOneName> =
            await this.tableOneNamesService.upsertTableOneName(
                prop,
                upsertTableOneNameDto
            );

        return res.status(response.status).json(response);
    }

    @Delete()
    @DeletionQuery("Delete tableOneName")
    async deleteTableOneName(
        @Query(new DELETE_Pipe()) query: DeleteQueryProps,
        @Req() req: Request,
        @Res() res: Response
    ) {
        const response: CustomResponseType<DeleteResult> =
            await this.tableOneNamesService.deleteTableOneName(
                query,
                getUserTokenData(req)
            );

        return res.status(response.status).json(response);
    }

    @Delete("bulk")
    @DeletionQuery("Bulk delete tableOneName")
    async deleteBulkTableOneName(
        @Query(new DELETE_Pipe()) query: { ids: string; wipe?: boolean },
        @Req() req: Request,
        @Res() res: Response
    ) {
        const response = await this.tableOneNamesService.deleteBulkTableOneName(
            query,
            getUserTokenData(req)
        );

        return res.status(response.status).json(response);
    }
}
