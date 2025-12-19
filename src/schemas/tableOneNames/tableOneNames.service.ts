import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {
    CreateTableOneNameDto,
    UpdateTableOneNameDto,
    tableOneNameFileFields,
} from "@/dto";
import { TableOneName } from "@/entities";
import {
    createHandler,
    deleteHandler,
    getAllHandler,
    getByIdHandler,
    updateHandler,
    upsertHandler,
} from "@/helpers";
import { deletedRes, errorRes, newInstanceRes, updatedRes } from "@/responses";
import {
    CustomResponseType,
    DeleteQueryProps,
    FullTokenPayload,
} from "@/types";
import { TablesNames } from "@/enums";
import { getCleanDto, linkUploadedFilesToRecord } from "@/helpers";
import { FilesService } from "src/schemas/files/files.service";
import {
    DeleteResult,
    FindManyOptions,
    Repository,
    UpdateResult,
} from "typeorm";

@Injectable()
export class TableOneNamesService {
    constructor(
        // ----- external services -----
        private readonly fileService: FilesService,
        // ----- base services -----
        @InjectRepository(TableOneName)
        private readonly tableOneNameRepository: Repository<TableOneName>
    ) {}

    // --- Basic CRUD APIs ---

    async getTableOneNames(
        query: FindManyOptions
    ): Promise<CustomResponseType<TableOneName[]>> {
        return await getAllHandler<TableOneName>({
            query,
            repository: this.tableOneNameRepository,
            table: TablesNames.TABLE_ONE_NAME,
            fileService: this.fileService,
        });
    }

    async getTableOneNameById(
        id: string
    ): Promise<CustomResponseType<TableOneName>> {
        return await getByIdHandler<TableOneName>({
            id,
            repository: this.tableOneNameRepository,
            table: TablesNames.TABLE_ONE_NAME,
            fileService: this.fileService,
        });
    }

    async createTableOneName(
        createTableOneNameDto: CreateTableOneNameDto
    ): Promise<CustomResponseType<TableOneName>> {
        try {
            const cleanDto = getCleanDto(
                createTableOneNameDto,
                tableOneNameFileFields
            );

            const response = await createHandler<TableOneName>({
                dto: cleanDto,
                repository: this.tableOneNameRepository,
            });

            await linkUploadedFilesToRecord(
                response,
                tableOneNameFileFields,
                TablesNames.TABLE_ONE_NAME,
                createTableOneNameDto,
                this.fileService
            );

            return newInstanceRes<TableOneName>(
                "TableOneName has been created successfully",
                response
            );
        } catch (error) {
            return errorRes(error.message);
        }
    }

    async createBulkTableOneName(
        createTableOneNameDtos: CreateTableOneNameDto[]
    ): Promise<CustomResponseType<TableOneName[]>> {
        try {
            const responses = await Promise.all(
                createTableOneNameDtos.map(
                    async (dto) => await this.createTableOneName(dto)
                )
            );

            return newInstanceRes<TableOneName[]>(
                `Bulk TableOneName creation successful`,
                responses.map((r) => r.payload)
            );
        } catch (error) {
            return errorRes(error.message);
        }
    }

    async updateTableOneName(
        id: string,
        updateTableOneNameDto: UpdateTableOneNameDto
    ): Promise<CustomResponseType<UpdateResult & { newRecord: TableOneName }>> {
        try {
            const cleanDto = getCleanDto(
                updateTableOneNameDto,
                tableOneNameFileFields
            );

            const response = await updateHandler<TableOneName>({
                id,
                dto: cleanDto,
                table: TablesNames.TABLE_ONE_NAME,
                repository: this.tableOneNameRepository,
            });

            await linkUploadedFilesToRecord(
                { id },
                tableOneNameFileFields,
                TablesNames.TABLE_ONE_NAME,
                updateTableOneNameDto,
                this.fileService
            );

            return updatedRes<UpdateResult & { newRecord: TableOneName }>(
                "TableOneName has been updated successfully",
                response
            );
        } catch (error) {
            return errorRes(error.message);
        }
    }

    async updateBulkTableOneName(
        updates: { id: string; data: UpdateTableOneNameDto }[]
    ): Promise<
        CustomResponseType<(UpdateResult & { newRecord: TableOneName })[]>
    > {
        try {
            const responses = await Promise.all(
                updates.map(
                    async ({ id, data }) =>
                        await this.updateTableOneName(id, data)
                )
            );

            return updatedRes<(UpdateResult & { newRecord: TableOneName })[]>(
                "TableOneName items updated successfully",
                responses.map(
                    (r) =>
                        r.payload as UpdateResult & { newRecord: TableOneName }
                )
            );
        } catch (error) {
            return errorRes(error.message);
        }
    }

    async upsertTableOneName(
        lookupPropName: string,
        updateTableOneNameDto: UpdateTableOneNameDto
    ): Promise<CustomResponseType<TableOneName>> {
        try {
            const response = await upsertHandler<TableOneName>({
                lookupPropName,
                dto: updateTableOneNameDto,
                // table: "TableOneName",
                repository: this.tableOneNameRepository,
            });

            return updatedRes<TableOneName>(
                "TableOneName has been upserted successfully",
                response
            );
        } catch (error) {
            return errorRes(error.message);
        }
    }

    async deleteTableOneName(
        query: DeleteQueryProps,
        userTokenData: Partial<FullTokenPayload>
    ): Promise<CustomResponseType<DeleteResult>> {
        const { id, wipe } = query;

        return await deleteHandler<TableOneName>({
            id,
            wipe,
            repository: this.tableOneNameRepository,
            table: "TableOneName",
            userTokenData,
        });
    }

    async deleteBulkTableOneName(
        query: { ids: string; wipe?: boolean },
        userTokenData: Partial<FullTokenPayload>
    ): Promise<CustomResponseType<DeleteResult[]>> {
        const { ids, wipe } = query;

        try {
            const results = await Promise.all(
                JSON.parse(ids).map(
                    async (id: string) =>
                        await this.deleteTableOneName(
                            { id, wipe },
                            userTokenData
                        )
                )
            );

            return deletedRes(
                "TableOneName items deleted successfully",
                results.map((r) => r.payload as DeleteResult)
            );
        } catch (error) {
            return errorRes(error.message);
        }
    }
}
