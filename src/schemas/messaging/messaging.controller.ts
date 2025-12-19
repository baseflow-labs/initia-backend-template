import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
    Res,
    UseGuards,
    ParseUUIDPipe,
    HttpCode,
    HttpStatus,
} from "@nestjs/common";
import { Response } from "express";
import { ControllerWrapper } from "@/decorators";
import { UserMessagingService } from "./messaging.service";
import { FilesService } from "../files/files.service";
import {
    CreateUserMessagingDto,
    CreateDirectUserMessagingDto,
    CreateUserMessagingMessageDto,
    CreateUserMessagingMessageReactionDto,
    UpdateUserMessagingDto,
    UpdateUserMessagingMessageRecipientDto,
    DeleteUserMessagingMessageRecipientDto,
    UpdateUserMessagingMessageDto,
    UpdateUserMessagingMessageReadStatusDto,
} from "@/dto";

@ControllerWrapper("userMessaging")
@Controller("userMessaging")
export class UserMessagingController {
    constructor(private readonly userMessagingService: UserMessagingService) {}

    // ---- UserMessagings ----

    @Post()
    async createUserMessaging(
        @Body() dto: CreateUserMessagingDto,
        @Res() res: Response
    ) {
        const response =
            await this.userMessagingService.createUserMessaging(dto);
        return res.status(response.status).json(response);
    }

    @Post("direct")
    async createDirect(
        @Body() dto: CreateDirectUserMessagingDto,
        @Res() res: Response
    ) {
        const response = await this.userMessagingService.createDirect(
            dto.participantIds
        );
        return res.status(response.status).json(response);
    }

    @Get()
    async listUserMessagings(
        @Query("cursor") cursor: string,
        @Query("limit") limit = "30",
        @Query("userId") userId: string,
        @Res() res: Response
    ) {
        const response = await this.userMessagingService.listUserMessagings(
            userId,
            {
                cursor,
                limit: Math.min(Number(limit) || 30, 100),
            }
        );
        return res.status(response.status).json(response);
    }

    @Get(":id")
    async getUserMessaging(
        @Param("id", new ParseUUIDPipe()) id: string,
        @Res() res: Response
    ) {
        const response =
            await this.userMessagingService.getUserMessagingById(id);
        return res.status(response.status).json(response);
    }

    @Patch(":id")
    async updateUserMessagingMeta(
        @Param("id", new ParseUUIDPipe()) id: string,
        @Body()
        dto: UpdateUserMessagingDto,
        @Res() res: Response
    ) {
        const response =
            await this.userMessagingService.updateUserMessagingMeta(id, dto);
        return res.status(response.status).json(response);
    }

    @Post(":id/participants")
    async addParticipants(
        @Param("id", new ParseUUIDPipe()) id: string,
        @Body() dto: UpdateUserMessagingMessageRecipientDto,
        @Res() res: Response
    ) {
        const response = await this.userMessagingService.addParticipants(
            id,
            dto.actorId,
            dto.userIds
        );
        return res.status(response.status).json(response);
    }

    @Delete(":id/participants/:userId")
    async removeParticipant(
        @Param("id", new ParseUUIDPipe()) id: string,
        @Param("userId", new ParseUUIDPipe()) userId: string,
        @Query("actorId") actorId: string,
        @Res() res: Response
    ) {
        const response = await this.userMessagingService.removeParticipant(
            id,
            actorId,
            userId
        );
        return res.status(response.status).json(response);
    }

    @Post(":id/leave")
    @HttpCode(HttpStatus.OK)
    async leaveUserMessaging(
        @Param("id", new ParseUUIDPipe()) id: string,
        @Body() dto: DeleteUserMessagingMessageRecipientDto,
        @Res() res: Response
    ) {
        const response = await this.userMessagingService.leaveUserMessaging(
            id,
            dto.userId
        );
        return res.status(response.status).json(response);
    }

    @Get(":id/unread-count")
    async unreadCount(
        @Param("id", new ParseUUIDPipe()) id: string,
        @Query("userId") userId: string,
        @Res() res: Response
    ) {
        const response = await this.userMessagingService.getUnreadCount(
            id,
            userId
        );
        return res.status(response.status).json(response);
    }

    // ---- Messages ----

    @Get(":id/messages")
    async listMessages(
        @Param("id", new ParseUUIDPipe()) id: string,
        @Query("cursor") cursor: string,
        @Query("limit") limit = "50",
        @Res() res: Response,
        @Query("parentMessageId") parentMessageId?: string
    ) {
        const response = await this.userMessagingService.listMessages(id, {
            cursor,
            limit: Math.min(Number(limit) || 50, 100),
            parentMessageId,
        });
        return res.status(response.status).json(response);
    }

    @Post(":id/messages")
    async sendMessage(
        @Param("id", new ParseUUIDPipe()) id: string,
        @Body() dto: CreateUserMessagingMessageDto & { senderId: string },
        @Res() res: Response
    ) {
        const response = await this.userMessagingService.sendMessage(
            id,
            dto.senderId,
            dto
        );
        return res.status(response.status).json(response);
    }

    @Patch("messages/:messageId")
    async editMessage(
        @Param("messageId", new ParseUUIDPipe()) messageId: string,
        @Body() dto: UpdateUserMessagingMessageDto,
        @Res() res: Response
    ) {
        const response = await this.userMessagingService.editMessage(
            messageId,
            dto.editorId,
            dto.text
        );
        return res.status(response.status).json(response);
    }

    @Delete("messages/:messageId")
    async deleteMessage(
        @Param("messageId", new ParseUUIDPipe()) messageId: string,
        @Query("actorId") actorId: string,
        @Res() res: Response,
        @Query("hard") hard?: string
    ) {
        const response = await this.userMessagingService.deleteMessage(
            messageId,
            actorId,
            hard === "true"
        );
        return res.status(response.status).json(response);
    }

    @Post("messages/:messageId/hide")
    async hideMessage(
        @Param("messageId", new ParseUUIDPipe()) messageId: string,
        @Body() dto: DeleteUserMessagingMessageRecipientDto,
        @Res() res: Response
    ) {
        const response = await this.userMessagingService.hideMessageForUser(
            messageId,
            dto.userId
        );
        return res.status(response.status).json(response);
    }

    @Post("messages/:messageId/reactions")
    async react(
        @Param("messageId", new ParseUUIDPipe()) messageId: string,
        @Body() dto: CreateUserMessagingMessageReactionDto & { userId: string },
        @Res() res: Response
    ) {
        const response = await this.userMessagingService.react(
            messageId,
            dto.userId,
            dto.emoji
        );
        return res.status(response.status).json(response);
    }

    @Delete("messages/:messageId/reactions/:emoji")
    async unreact(
        @Param("messageId", new ParseUUIDPipe()) messageId: string,
        @Param("emoji") emoji: string,
        @Query("userId") userId: string,
        @Res() res: Response
    ) {
        const response = await this.userMessagingService.unreact(
            messageId,
            userId,
            emoji
        );
        return res.status(response.status).json(response);
    }

    @Post(":id/read")
    async markRead(
        @Param("id", new ParseUUIDPipe()) id: string,
        @Body() dto: UpdateUserMessagingMessageReadStatusDto,
        @Res() res: Response
    ) {
        const response = await this.userMessagingService.markRead(
            id,
            dto.userId,
            dto.upToMessageId
        );
        return res.status(response.status).json(response);
    }
}
