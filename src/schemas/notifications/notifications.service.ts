import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {
    CreateNotificationDto,
    UpdateNotificationDto,
    notificationFileFields,
} from "@/dto";
import { Notification } from "@/entities";
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
export class NotificationsService {
    constructor(
        // ----- external services -----
        private readonly fileService: FilesService,
        // ----- base services -----
        @InjectRepository(Notification)
        private readonly notificationRepository: Repository<Notification>
    ) {}

    // --- Basic CRUD APIs ---

    async getNotifications(
        query: FindManyOptions
    ): Promise<CustomResponseType<Notification[]>> {
        return await getAllHandler<Notification>({
            query,
            repository: this.notificationRepository,
            table: TablesNames.NOTIFICATION,
            fileService: this.fileService,
        });
    }

    async getNotificationById(
        id: string
    ): Promise<CustomResponseType<Notification>> {
        return await getByIdHandler<Notification>({
            id,
            repository: this.notificationRepository,
            table: TablesNames.NOTIFICATION,
            fileService: this.fileService,
        });
    }

    async createNotification(
        createNotificationDto: CreateNotificationDto
    ): Promise<CustomResponseType<Notification>> {
        try {
            const cleanDto = getCleanDto(
                createNotificationDto,
                notificationFileFields
            );

            const response = await createHandler<Notification>({
                dto: cleanDto,
                repository: this.notificationRepository,
            });

            await linkUploadedFilesToRecord(
                response,
                notificationFileFields,
                TablesNames.NOTIFICATION,
                createNotificationDto,
                this.fileService
            );

            return newInstanceRes<Notification>(
                "Notification has been created successfully",
                response
            );
        } catch (error) {
            return errorRes(error.message);
        }
    }

    async createBulkNotification(
        createNotificationDtos: CreateNotificationDto[]
    ): Promise<CustomResponseType<Notification[]>> {
        try {
            const responses = await Promise.all(
                createNotificationDtos.map(
                    async (dto) => await this.createNotification(dto)
                )
            );

            return newInstanceRes<Notification[]>(
                `Bulk Notification creation successful`,
                responses.map((r) => r.payload)
            );
        } catch (error) {
            return errorRes(error.message);
        }
    }

    async updateNotification(
        id: string,
        updateNotificationDto: UpdateNotificationDto
    ): Promise<CustomResponseType<UpdateResult & { newRecord: Notification }>> {
        try {
            const cleanDto = getCleanDto(
                updateNotificationDto,
                notificationFileFields
            );

            const response = await updateHandler<Notification>({
                id,
                dto: cleanDto,
                table: TablesNames.NOTIFICATION,
                repository: this.notificationRepository,
            });

            await linkUploadedFilesToRecord(
                { id },
                notificationFileFields,
                TablesNames.NOTIFICATION,
                updateNotificationDto,
                this.fileService
            );

            return updatedRes<UpdateResult & { newRecord: Notification }>(
                "Notification has been updated successfully",
                response
            );
        } catch (error) {
            return errorRes(error.message);
        }
    }

    async updateBulkNotification(
        updates: { id: string; data: UpdateNotificationDto }[]
    ): Promise<
        CustomResponseType<(UpdateResult & { newRecord: Notification })[]>
    > {
        try {
            const responses = await Promise.all(
                updates.map(
                    async ({ id, data }) =>
                        await this.updateNotification(id, data)
                )
            );

            return updatedRes<(UpdateResult & { newRecord: Notification })[]>(
                "Notification items updated successfully",
                responses.map(
                    (r) =>
                        r.payload as UpdateResult & { newRecord: Notification }
                )
            );
        } catch (error) {
            return errorRes(error.message);
        }
    }

    async upsertNotification(
        lookupPropName: string,
        updateNotificationDto: UpdateNotificationDto
    ): Promise<CustomResponseType<Notification>> {
        try {
            const response = await upsertHandler<Notification>({
                lookupPropName,
                dto: updateNotificationDto,
                // table: "Notification",
                repository: this.notificationRepository,
            });

            return updatedRes<Notification>(
                "Notification has been upserted successfully",
                response
            );
        } catch (error) {
            return errorRes(error.message);
        }
    }

    async deleteNotification(
        query: DeleteQueryProps,
        userTokenData: Partial<FullTokenPayload>
    ): Promise<CustomResponseType<DeleteResult>> {
        const { id, wipe } = query;

        return await deleteHandler<Notification>({
            id,
            wipe,
            repository: this.notificationRepository,
            table: "Notification",
            userTokenData,
        });
    }

    async deleteBulkNotification(
        query: { ids: string; wipe?: boolean },
        userTokenData: Partial<FullTokenPayload>
    ): Promise<CustomResponseType<DeleteResult[]>> {
        const { ids, wipe } = query;

        try {
            const results = await Promise.all(
                JSON.parse(ids).map(
                    async (id: string) =>
                        await this.deleteNotification(
                            { id, wipe },
                            userTokenData
                        )
                )
            );

            return deletedRes(
                "Notification items deleted successfully",
                results.map((r) => r.payload as DeleteResult)
            );
        } catch (error) {
            return errorRes(error.message);
        }
    }
}
