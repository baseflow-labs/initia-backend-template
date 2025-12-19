import {
    ForbiddenException,
    Injectable,
    UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserMessagingDto, CreateUserMessagingMessageDto } from "@/dto";
import {
    UserMessaging,
    UserMessagingMessage,
    UserMessagingMessageReaction,
    UserMessagingMessageRecipient,
    UserMessagingParticipant,
} from "@/entities";
import {
    createHandler,
    deleteHandler,
    getAllHandler,
    getByIdHandler,
    updateHandler,
} from "@/helpers";
import { errorRes, newInstanceRes, updatedRes } from "@/responses";
import {
    CustomResponseType,
    DeleteQueryProps,
    FullTokenPayload,
} from "@/types";
import {
    DeleteResult,
    FindManyOptions,
    In,
    IsNull,
    LessThanOrEqual,
    Repository,
    UpdateResult,
} from "typeorm";

@Injectable()
export class UserMessagingService {
    constructor(
        // ----- base repositories -----
        @InjectRepository(UserMessaging)
        private readonly userMessagingRepository: Repository<UserMessaging>,
        @InjectRepository(UserMessagingParticipant)
        private readonly participantRepository: Repository<UserMessagingParticipant>,
        @InjectRepository(UserMessagingMessage)
        private readonly messageRepository: Repository<UserMessagingMessage>,
        @InjectRepository(UserMessagingMessageRecipient)
        private readonly recipientRepository: Repository<UserMessagingMessageRecipient>,
        @InjectRepository(UserMessagingMessageReaction)
        private readonly reactionRepository: Repository<UserMessagingMessageReaction>
    ) {}

    async getUserMessagings(
        query: FindManyOptions<UserMessaging>
    ): Promise<CustomResponseType<UserMessaging[]>> {
        return await getAllHandler<UserMessaging>({
            query,
            repository: this.userMessagingRepository,
            table: "UserMessagings",
        });
    }

    async getUserMessagingById(
        id: string
    ): Promise<CustomResponseType<UserMessaging>> {
        return await getByIdHandler<UserMessaging>({
            id,
            repository: this.userMessagingRepository,
            table: "UserMessaging",
        });
    }

    async createUserMessaging(
        dto: CreateUserMessagingDto
    ): Promise<CustomResponseType<UserMessaging>> {
        try {
            let directPairKey: string | null = null;
            if (!dto.isGroup) {
                if (dto.participantIds.length !== 2) {
                    throw new ForbiddenException(
                        "Direct userMessaging must include exactly 2 users"
                    );
                }
                directPairKey = this.makePairKey(
                    dto.participantIds[0],
                    dto.participantIds[1]
                );

                const existing = await this.userMessagingRepository.findOne({
                    where: { isGroup: false, directPairKey },
                });
                if (existing) {
                    return newInstanceRes<UserMessaging>(
                        "UserMessaging already exists",
                        existing
                    );
                }
            }

            const conv = await createHandler<UserMessaging>({
                dto: {
                    isGroup: dto.isGroup,
                    title: dto.title ?? null,
                    description: dto.description ?? null,
                    avatarUrl: dto.avatarUrl ?? null,
                    directPairKey,
                },
                repository: this.userMessagingRepository,
            });

            const participants = dto.participantIds.map((userId, idx) =>
                this.participantRepository.create({
                    userMessagingId: conv.id,
                    userId,
                    role: dto.isGroup
                        ? idx === 0
                            ? "owner"
                            : "member"
                        : "member",
                    isActive: true,
                    muted: false,
                })
            );
            await this.participantRepository.save(participants);

            return newInstanceRes<UserMessaging>(
                "UserMessaging has been created successfully",
                conv
            );
        } catch (error) {
            return errorRes(error.message);
        }
    }

    async createDirect(
        participantIds: string[]
    ): Promise<CustomResponseType<UserMessaging>> {
        return this.createUserMessaging({ isGroup: false, participantIds });
    }

    async listUserMessagings(
        userId: string,
        opts: { cursor?: string; limit: number }
    ): Promise<
        CustomResponseType<{ items: UserMessaging[]; nextCursor?: string }>
    > {
        try {
            // active memberships
            const memberships = await this.participantRepository.find({
                where: { userId, isActive: true },
                select: { userMessagingId: true },
            });

            const convIds = memberships.map((m) => m.userMessagingId);
            if (!convIds.length) {
                return newInstanceRes("OK", {
                    items: [],
                    nextCursor: undefined,
                });
            }

            // Build where:
            // - only the user's userMessagings
            // - cursor = lastMessageAt <= cursor (fallback to createdAt if lastMessageAt is null)
            const where: any = { id: In(convIds) };
            if (opts.cursor) {
                // If you want strict lastMessageAt cursor, this is enough:
                where.lastMessageAt = LessThanOrEqual(new Date(opts.cursor));
                // (Optionally handle null lastMessageAt with createdAt fallback in a query builder if needed)
            }

            const take = Math.min(Number(opts.limit) || 30, 100) + 1;

            const items = await this.userMessagingRepository.find({
                where,
                order: { lastMessageAt: "DESC", createdAt: "DESC" },
                take,
            });

            const hasMore = items.length > take - 1;
            const trimmed = hasMore ? items.slice(0, take - 1) : items;
            const last = trimmed[trimmed.length - 1];
            const nextCursor =
                hasMore && last
                    ? (last.lastMessageAt || last.createdAt).toISOString()
                    : undefined;

            return newInstanceRes("OK", { items: trimmed, nextCursor });
        } catch (error) {
            return errorRes(error.message);
        }
    }

    async updateUserMessaging(
        id: string,
        dto: Partial<Pick<UserMessaging, "title" | "description" | "avatarUrl">>
    ): Promise<
        CustomResponseType<UpdateResult & { newRecord: UserMessaging }>
    > {
        try {
            const response = await updateHandler<UserMessaging>({
                id,
                dto,
                table: "UserMessaging",
                repository: this.userMessagingRepository,
            });

            return updatedRes<UpdateResult & { newRecord: UserMessaging }>(
                "UserMessaging has been updated successfully",
                response
            );
        } catch (error) {
            return errorRes(error.message);
        }
    }

    async updateUserMessagingMeta(
        id: string,
        dto: { title?: string; description?: string; avatarUrl?: string }
    ): Promise<
        CustomResponseType<UpdateResult & { newRecord: UserMessaging }>
    > {
        return this.updateUserMessaging(id, dto);
    }

    async deleteUserMessaging(
        query: DeleteQueryProps,
        userTokenData: Partial<FullTokenPayload>
    ): Promise<CustomResponseType<DeleteResult>> {
        return await deleteHandler<UserMessaging>({
            id: query.id,
            wipe: query.wipe,
            repository: this.userMessagingRepository,
            table: "UserMessaging",
            userTokenData,
        });
    }

    async addParticipants(
        userMessagingId: string,
        actorId: string,
        userIds: string[]
    ): Promise<CustomResponseType<{ added: number }>> {
        try {
            const conv = await this.userMessagingRepository.findOne({
                where: { id: userMessagingId },
            });
            if (!conv) return errorRes("UserMessaging not found");

            const actor = await this.participantRepository.findOne({
                where: { userMessagingId, userId: actorId, isActive: true },
            });
            if (!actor || (actor.role !== "owner" && actor.role !== "admin")) {
                throw new ForbiddenException(
                    "Only owner/admin can add participants"
                );
            }

            const existing = await this.participantRepository.find({
                where: { userMessagingId, userId: In(userIds) },
            });
            const existingIds = new Set(existing.map((e) => e.userId));

            const toInsert = userIds
                .filter((uid) => !existingIds.has(uid))
                .map((uid) =>
                    this.participantRepository.create({
                        userMessagingId,
                        userId: uid,
                        role: "member",
                        isActive: true,
                        muted: false,
                    })
                );

            if (toInsert.length)
                await this.participantRepository.save(toInsert);

            return newInstanceRes<{ added: number }>(
                "Participants added successfully",
                { added: toInsert.length }
            );
        } catch (error) {
            return errorRes(error.message);
        }
    }

    async removeParticipant(
        userMessagingId: string,
        actorId: string,
        userId: string
    ): Promise<CustomResponseType<null>> {
        try {
            const actor = await this.participantRepository.findOne({
                where: { userMessagingId, userId: actorId, isActive: true },
            });
            if (
                !actor ||
                (actor.role !== "owner" &&
                    actor.role !== "admin" &&
                    actorId !== userId)
            ) {
                throw new ForbiddenException("Forbidden");
            }

            const target = await this.participantRepository.findOne({
                where: { userMessagingId, userId },
            });
            if (!target) return errorRes("Participant not found");

            target.isActive = false;
            await this.participantRepository.save(target);

            return updatedRes("Participant removed successfully", {
                affected: 1,
                raw: {},
                generatedMaps: [],
                newRecord: null,
            } as any);
        } catch (error) {
            return errorRes(error.message);
        }
    }

    async leaveUserMessaging(
        userMessagingId: string,
        userId: string
    ): Promise<CustomResponseType<null>> {
        try {
            const part = await this.participantRepository.findOne({
                where: { userMessagingId, userId },
            });
            if (!part) return errorRes("Not a participant");

            part.isActive = false;
            await this.participantRepository.save(part);

            return updatedRes("Left userMessaging successfully", {
                affected: 1,
                raw: {},
                generatedMaps: [],
                newRecord: null,
            } as any);
        } catch (error) {
            return errorRes(error.message);
        }
    }

    async listMessages(
        userMessagingId: string,
        opts: { cursor?: string; limit: number; parentMessageId?: string }
    ): Promise<
        CustomResponseType<{
            items: UserMessagingMessage[];
            nextCursor?: string;
        }>
    > {
        try {
            const where: any = { userMessagingId };
            if (opts.parentMessageId)
                where.parentMessageId = opts.parentMessageId;
            if (opts.cursor)
                where.createdAt = LessThanOrEqual(new Date(opts.cursor));

            const items = await this.messageRepository.find({
                where,
                order: { createdAt: "DESC", id: "DESC" },
                take: Math.min(opts.limit || 50, 100) + 1,
            });

            const hasMore = items.length > (opts.limit || 50);
            const trimmed = hasMore ? items.slice(0, opts.limit) : items;
            const nextCursor = hasMore
                ? trimmed[trimmed.length - 1].createdAt.toISOString()
                : undefined;

            return newInstanceRes("OK", { items: trimmed, nextCursor });
        } catch (error) {
            return errorRes(error.message);
        }
    }

    async getMessageById(
        id: string
    ): Promise<CustomResponseType<UserMessagingMessage>> {
        return await getByIdHandler<UserMessagingMessage>({
            id,
            repository: this.messageRepository,
            table: "Message",
        });
    }

    async sendMessage(
        userMessagingId: string,
        senderId: string,
        dto: CreateUserMessagingMessageDto
    ): Promise<CustomResponseType<UserMessagingMessage>> {
        try {
            const participant = await this.participantRepository.findOne({
                where: { userMessagingId, userId: senderId, isActive: true },
            });
            if (!participant) throw new ForbiddenException("Not a participant");

            return await this.messageRepository.manager.transaction(
                async (em) => {
                    const message = em.create(UserMessagingMessage, {
                        userMessaging: { id: userMessagingId } as any,
                        senderId,
                        text: dto.text ?? undefined,
                        parentMessageId: dto.parentMessageId ?? undefined,
                    });
                    await em.save(message);

                    const parts = await em.find(UserMessagingParticipant, {
                        where: {
                            userMessaging: { id: userMessagingId },
                            isActive: true,
                        },
                        select: { userId: true },
                        relations: [],
                    });

                    const recs = parts.map((p) =>
                        em.create(UserMessagingMessageRecipient, {
                            message: { id: message.id } as any,
                            userId: p.userId,
                            deliveredAt:
                                p.userId === senderId ? new Date() : undefined,
                        })
                    );
                    if (recs.length) await em.save(recs);

                    await em.update(
                        UserMessaging,
                        { id: userMessagingId },
                        {
                            lastMessageAt: new Date(),
                            lastMessageId: message.id,
                        }
                    );

                    return newInstanceRes<UserMessagingMessage>(
                        "Message has been sent successfully",
                        message
                    );
                }
            );
        } catch (error) {
            return errorRes(error.message);
        }
    }

    async editMessage(
        messageId: string,
        editorId: string,
        text: string
    ): Promise<CustomResponseType<UserMessagingMessage>> {
        try {
            const msg = await this.messageRepository.findOne({
                where: { id: messageId },
            });
            if (!msg) return errorRes("Message not found");
            if (msg.senderId !== editorId) {
                throw new ForbiddenException(
                    "You can only edit your own messages"
                );
            }

            const response = await updateHandler<UserMessagingMessage>({
                id: messageId,
                dto: { text, isEdited: true },
                table: "Message",
                repository: this.messageRepository,
            });

            return updatedRes<UserMessagingMessage>(
                "Message has been updated successfully",
                response as any
            );
        } catch (error) {
            return errorRes(error.message);
        }
    }

    async deleteMessage(
        messageId: string,
        actorId: string,
        hard = false
    ): Promise<CustomResponseType<null>> {
        try {
            const msg = await this.messageRepository.findOne({
                where: { id: messageId },
            });
            if (!msg) return errorRes("Message not found");

            if (hard) {
                await this.messageRepository.delete(messageId);
                return updatedRes("Message has been permanently deleted", {
                    affected: 1,
                    raw: {},
                    generatedMaps: [],
                    newRecord: null,
                } as any);
            }

            if (msg.senderId !== actorId) {
                throw new ForbiddenException(
                    "You can only delete your own messages"
                );
            }

            const response = await updateHandler<UserMessagingMessage>({
                id: messageId,
                dto: { isDeleted: true, deletedAt: new Date(), text: null },
                table: "Message",
                repository: this.messageRepository,
            });

            return updatedRes("Message has been soft-deleted", response as any);
        } catch (error) {
            return errorRes(error.message);
        }
    }

    async hideMessageForUser(
        messageId: string,
        userId: string
    ): Promise<CustomResponseType<null>> {
        try {
            const rec = await this.recipientRepository.findOne({
                where: { messageId, userId },
            });
            if (!rec) return errorRes("Recipient not found");

            await updateHandler<UserMessagingMessageRecipient>({
                id: rec.id,
                dto: { isHidden: true },
                table: "MessageRecipient",
                repository: this.recipientRepository,
            });

            return updatedRes("Message hidden for user", {
                affected: 1,
                raw: {},
                generatedMaps: [],
                newRecord: null,
            } as any);
        } catch (error) {
            return errorRes(error.message);
        }
    }

    async react(
        messageId: string,
        userId: string,
        emoji: string
    ): Promise<CustomResponseType<UserMessagingMessageReaction>> {
        try {
            const existing = await this.reactionRepository.findOne({
                where: { messageId, userId, emoji },
            });
            if (existing) return newInstanceRes("Already reacted", existing);

            const reaction = await createHandler<UserMessagingMessageReaction>({
                dto: { messageId, userId, emoji },
                repository: this.reactionRepository,
            });

            return newInstanceRes("Reaction has been added", reaction);
        } catch (error) {
            return errorRes(error.message);
        }
    }

    async unreact(
        messageId: string,
        userId: string,
        emoji: string
    ): Promise<CustomResponseType<DeleteResult>> {
        try {
            const result = await this.reactionRepository.delete({
                messageId,
                userId,
                emoji,
            });
            return newInstanceRes("Reaction has been removed", result as any);
        } catch (error) {
            return errorRes(error.message);
        }
    }

    async markRead(
        userMessagingId: string,
        userId: string,
        upToMessageId: string
    ): Promise<CustomResponseType<null>> {
        try {
            const upTo = await this.messageRepository.findOne({
                where: { id: upToMessageId, userMessagingId },
            });
            if (!upTo) return errorRes("Message not found");

            const ids = (
                await this.messageRepository.find({
                    where: {
                        userMessagingId,
                        createdAt: LessThanOrEqual(upTo.createdAt),
                    },
                    select: { id: true },
                })
            ).map((m) => m.id);

            if (ids.length) {
                await this.recipientRepository
                    .createQueryBuilder()
                    .update()
                    .set({ readAt: () => "COALESCE(read_at, NOW())" })
                    .where("user_id = :userId", { userId })
                    .andWhere("message_id IN (:...ids)", { ids })
                    .execute();
            }

            await this.participantRepository.update(
                { userMessagingId, userId },
                { lastReadAt: new Date() }
            );

            return updatedRes("Marked as read", {
                affected: ids.length,
                raw: {},
                generatedMaps: [],
                newRecord: null,
            } as any);
        } catch (error) {
            return errorRes(error.message);
        }
    }

    async getUnreadCount(
        userMessagingId: string,
        userId: string
    ): Promise<CustomResponseType<{ count: number }>> {
        try {
            const count = await this.recipientRepository.count({
                where: {
                    userId,
                    isHidden: false,
                    readAt: IsNull(),
                    message: { userMessagingId },
                },
            });

            return newInstanceRes("OK", { count });
        } catch (error) {
            return errorRes(error.message);
        }
    }

    private makePairKey(a: string, b: string) {
        const [x, y] = [a, b].sort();
        return `${x}#${y}`;
    }
}
