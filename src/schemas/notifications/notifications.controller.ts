import { NotificationsService } from "./notifications.service";
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
import { CreateNotificationDto, UpdateNotificationDto } from "@/dto";
import { Notification } from "@/entities";
import { NotificationFields, TablesNames } from "@/enums";
import { getUserTokenData } from "@/helpers";
import { DELETE_Pipe, GET_Pipe, POST_PATCH_Pipe } from "@/pipes";
import type { CustomResponseType, DeleteQueryProps } from "@/types";
import type { DeleteResult, FindManyOptions, UpdateResult } from "typeorm";

@ControllerWrapper("notification")
export class NotificationsController {
    constructor(private readonly notificationsService: NotificationsService) {}

    // --- Basic CRUD endpoints ---

    @Get()
    @GetAllByQuery({
        fieldsEnum: NotificationFields,
        descendants: RELATIONS_OBJECT.notification.descendants,
    })
    async getNotifications(
        @Query(
            new GET_Pipe(
                NotificationFields,
                RELATIONS_OBJECT.notification.ascendants
            )
        )
        query: FindManyOptions,
        @Res() res: Response
    ) {
        const response: CustomResponseType<Notification[]> =
            await this.notificationsService.getNotifications(query);
        return res.status(response.status).json(response);
    }

    @Get(":id")
    @ApiOperation({ summary: "Get a Single notification by ID" })
    async getNotificationById(@Param("id") id: string, @Res() res: Response) {
        const response: CustomResponseType<Notification> =
            await this.notificationsService.getNotificationById(id);

        return res.status(response.status).json(response);
    }

    @Post()
    @EditorsWrapper(CreateNotificationDto, "Create a New notification")
    async createNotification(
        @Body(new POST_PATCH_Pipe(TablesNames.NOTIFICATION))
        createNotificationDto: CreateNotificationDto,
        @Res() res: Response
    ) {
        const response: CustomResponseType<Notification> =
            await this.notificationsService.createNotification(
                createNotificationDto
            );

        return res.status(response.status).json(response);
    }

    @Post("bulk")
    @EditorsWrapper(CreateNotificationDto, "Bulk create notifications")
    async createBulkNotification(
        @Body(new POST_PATCH_Pipe(TablesNames.NOTIFICATION))
        createNotificationDtos: CreateNotificationDto[],
        @Res() res: Response
    ) {
        const response = await this.notificationsService.createBulkNotification(
            createNotificationDtos
        );

        return res.status(response.status).json(response);
    }

    @Patch(":id")
    @EditorsWrapper(UpdateNotificationDto, "Update a notification")
    async updateNotification(
        @Param("id") id: string,
        @Body(new POST_PATCH_Pipe(TablesNames.NOTIFICATION))
        updateNotificationDto: UpdateNotificationDto,
        @Res() res: Response
    ) {
        const response: CustomResponseType<UpdateResult> =
            await this.notificationsService.updateNotification(
                id,
                updateNotificationDto
            );

        return res.status(response.status).json(response);
    }

    @Patch("bulk")
    @EditorsWrapper(UpdateNotificationDto, "Bulk update notification")
    async updateBulkNotification(
        @Body(new POST_PATCH_Pipe(TablesNames.NOTIFICATION))
        updates: { id: string; data: UpdateNotificationDto }[],
        @Res() res: Response
    ) {
        const response =
            await this.notificationsService.updateBulkNotification(updates);

        return res.status(response.status).json(response);
    }

    @Post("upsert/:prop")
    @EditorsWrapper(
        CreateNotificationDto,
        "Update or Create a New notification"
    )
    async upsertNotification(
        @Param("prop") prop: string,
        @Body(new POST_PATCH_Pipe(TablesNames.NOTIFICATION))
        upsertNotificationDto: CreateNotificationDto,
        @Res() res: Response
    ) {
        const response: CustomResponseType<Notification> =
            await this.notificationsService.upsertNotification(
                prop,
                upsertNotificationDto
            );

        return res.status(response.status).json(response);
    }

    @Delete()
    @DeletionQuery("Delete notification")
    async deleteNotification(
        @Query(new DELETE_Pipe()) query: DeleteQueryProps,
        @Req() req: Request,
        @Res() res: Response
    ) {
        const response: CustomResponseType<DeleteResult> =
            await this.notificationsService.deleteNotification(
                query,
                getUserTokenData(req)
            );

        return res.status(response.status).json(response);
    }

    @Delete("bulk")
    @DeletionQuery("Bulk delete notification")
    async deleteBulkNotification(
        @Query(new DELETE_Pipe()) query: { ids: string; wipe?: boolean },
        @Req() req: Request,
        @Res() res: Response
    ) {
        const response = await this.notificationsService.deleteBulkNotification(
            query,
            getUserTokenData(req)
        );

        return res.status(response.status).json(response);
    }
}
