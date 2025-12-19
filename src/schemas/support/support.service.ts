import { CreateAppEvaluationDto } from "@/dto/support/appEvaluation/create-appEvaluation.dto";
import { CreateFaqDto } from "@/dto/support/faq/create-faq.dto";
import { UpdateFaqDto } from "@/dto/support/faq/update-faq.dto";
import { CreateSupportTicketDto } from "@/dto/support/supportTicket/create-supportTicket.dto";
import { CreateUserManualContentDto } from "@/dto/support/userManual/content/create-userManualContent.dto";
import { UpdateUserManualContentDto } from "@/dto/support/userManual/content/update-userManualContent.dto";
import { CreateUserManualSectionDto } from "@/dto/support/userManual/section/create-userManualSection.dto";
import { UpdateUserManualSectionDto } from "@/dto/support/userManual/section/update-userManualSection.dto";
import { CreateUserManualSubsectionDto } from "@/dto/support/userManual/subsection/create-userManualSubsection.dto";
import { UpdateUserManualSubsectionDto } from "@/dto/support/userManual/subsection/update-userManualSubsection.dto";
import {
    AppEvaluation,
    Faq,
    SupportTicket,
    UserManualContent,
    UserManualSection,
    UserManualSubsection,
} from "@/entities";
import { TablesNames } from "@/enums";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {
    createHandler,
    deleteHandler,
    getAllHandler,
    getByIdHandler,
    updateHandler,
} from "src/helpers";
import { errorRes, newInstanceRes, updatedRes } from "src/responses";
import {
    CustomResponseType,
    DeleteQueryProps,
    FullTokenPayload,
} from "src/types";
import {
    DeleteResult,
    FindManyOptions,
    Repository,
    UpdateResult,
} from "typeorm";

@Injectable()
export class SupportService {
    constructor(
        @InjectRepository(Faq) private readonly faqRepo: Repository<Faq>,
        @InjectRepository(SupportTicket)
        private readonly ticketRepo: Repository<SupportTicket>,
        @InjectRepository(UserManualSection)
        private readonly sectionRepo: Repository<UserManualSection>,
        @InjectRepository(UserManualSubsection)
        private readonly subsectionRepo: Repository<UserManualSubsection>,
        @InjectRepository(UserManualContent)
        private readonly contentRepo: Repository<UserManualContent>,
        @InjectRepository(AppEvaluation)
        private readonly evalRepo: Repository<AppEvaluation>
    ) {}

    // FAQs
    async getFaqs(
        query: FindManyOptions<Faq>
    ): Promise<CustomResponseType<Faq[]>> {
        return await getAllHandler<Faq>({
            query,
            repository: this.faqRepo,
            table: "Faqs",
        });
    }

    async createFaq(dto: CreateFaqDto): Promise<CustomResponseType<Faq>> {
        try {
            const created = await createHandler<Faq>({
                dto,
                repository: this.faqRepo,
            });
            return newInstanceRes<Faq>("FAQ created successfully", created);
        } catch (e) {
            return errorRes(e.message);
        }
    }

    async updateFaq(
        id: string,
        dto: UpdateFaqDto
    ): Promise<CustomResponseType<UpdateResult & { newRecord: Faq }>> {
        try {
            const response = await updateHandler<Faq>({
                id,
                dto,
                table: TablesNames.FAQ,
                repository: this.faqRepo,
            });
            return updatedRes<UpdateResult & { newRecord: Faq }>(
                "FAQ updated successfully",
                response
            );
        } catch (e) {
            return errorRes(e.message);
        }
    }

    async deleteFaq(
        query: DeleteQueryProps,
        userTokenData: Partial<FullTokenPayload>
    ): Promise<CustomResponseType<DeleteResult>> {
        return await deleteHandler<Faq>({
            id: query.id,
            wipe: query.wipe,
            repository: this.faqRepo,
            table: "Faq",
            userTokenData,
        });
    }

    // Support Tickets
    async getSupportTickets(
        query: FindManyOptions<SupportTicket>
    ): Promise<CustomResponseType<SupportTicket[]>> {
        return await getAllHandler<SupportTicket>({
            query,
            repository: this.ticketRepo,
            table: "SupportTickets",
        });
    }

    async getSupportTicketById(
        id: string
    ): Promise<CustomResponseType<SupportTicket>> {
        return await getByIdHandler<SupportTicket>({
            id,
            repository: this.ticketRepo,
            table: TablesNames.SUPPORT_TICKET,
        });
    }

    async createSupportTicket(
        dto: CreateSupportTicketDto
    ): Promise<CustomResponseType<SupportTicket>> {
        try {
            const created = await createHandler<SupportTicket>({
                dto: { ...dto, user: { id: dto.userId } as any },
                repository: this.ticketRepo,
            });
            return newInstanceRes<SupportTicket>(
                "Support ticket created successfully",
                created
            );
        } catch (e) {
            return errorRes(e.message);
        }
    }

    // User Manual Sections
    async getUserManualSections(
        query: FindManyOptions<UserManualSection>
    ): Promise<CustomResponseType<UserManualSection[]>> {
        return await getAllHandler<UserManualSection>({
            query,
            repository: this.sectionRepo,
            table: "UserManualSections",
        });
    }

    async createUserManualSection(
        dto: CreateUserManualSectionDto
    ): Promise<CustomResponseType<UserManualSection>> {
        try {
            const created = await createHandler<UserManualSection>({
                dto,
                repository: this.sectionRepo,
            });
            return newInstanceRes<UserManualSection>(
                "Section created successfully",
                created
            );
        } catch (e) {
            return errorRes(e.message);
        }
    }

    async updateUserManualSection(
        id: string,
        dto: UpdateUserManualSectionDto
    ): Promise<
        CustomResponseType<UpdateResult & { newRecord: UserManualSection }>
    > {
        try {
            const response = await updateHandler<UserManualSection>({
                id,
                dto,
                table: TablesNames.USER_MANUAL_SECTION,
                repository: this.sectionRepo,
            });
            return updatedRes<UpdateResult & { newRecord: UserManualSection }>(
                "Section updated successfully",
                response
            );
        } catch (e) {
            return errorRes(e.message);
        }
    }

    async deleteUserManualSection(
        query: DeleteQueryProps,
        userTokenData: Partial<FullTokenPayload>
    ): Promise<CustomResponseType<DeleteResult>> {
        return await deleteHandler<UserManualSection>({
            id: query.id,
            wipe: query.wipe,
            repository: this.sectionRepo,
            table: "UserManualSection",
            userTokenData,
        });
    }

    // User Manual Subsections
    async getUserManualSubsections(
        query: FindManyOptions<UserManualSubsection>
    ): Promise<CustomResponseType<UserManualSubsection[]>> {
        return await getAllHandler<UserManualSubsection>({
            query,
            repository: this.subsectionRepo,
            table: "UserManualSubsections",
        });
    }

    async getUserManualSubsectionsBySection(
        sectionId: string
    ): Promise<CustomResponseType<UserManualSubsection[]>> {
        return await getAllHandler<UserManualSubsection>({
            query: { where: { section: { id: sectionId } } },
            repository: this.subsectionRepo,
            table: "UserManualSubsections",
        });
    }

    async createUserManualSubsection(
        dto: CreateUserManualSubsectionDto
    ): Promise<CustomResponseType<UserManualSubsection>> {
        try {
            const created = await createHandler<UserManualSubsection>({
                dto: {
                    title: dto.title,
                    description: dto.description ?? null,
                    section: { id: dto.sectionId } as any,
                },
                repository: this.subsectionRepo,
            });
            return newInstanceRes<UserManualSubsection>(
                "Subsection created successfully",
                created
            );
        } catch (e) {
            return errorRes(e.message);
        }
    }

    async updateUserManualSubsection(
        id: string,
        dto: UpdateUserManualSubsectionDto
    ): Promise<
        CustomResponseType<UpdateResult & { newRecord: UserManualSubsection }>
    > {
        try {
            const patch: any = { ...dto };
            if (dto.sectionId) patch.section = { id: dto.sectionId } as any;
            delete patch.sectionId;

            const response = await updateHandler<UserManualSubsection>({
                id,
                dto: patch,
                table: TablesNames.USER_MANUAL_SUB_SECTION,
                repository: this.subsectionRepo,
            });
            return updatedRes<
                UpdateResult & { newRecord: UserManualSubsection }
            >("Subsection updated successfully", response);
        } catch (e) {
            return errorRes(e.message);
        }
    }

    async deleteUserManualSubsection(
        query: DeleteQueryProps,
        userTokenData: Partial<FullTokenPayload>
    ): Promise<CustomResponseType<DeleteResult>> {
        return await deleteHandler<UserManualSubsection>({
            id: query.id,
            wipe: query.wipe,
            repository: this.subsectionRepo,
            table: "UserManualSubsection",
            userTokenData,
        });
    }

    // User Manual Contents
    async getUserManualContents(
        query: FindManyOptions<UserManualContent>
    ): Promise<CustomResponseType<UserManualContent[]>> {
        return await getAllHandler<UserManualContent>({
            query,
            repository: this.contentRepo,
            table: "UserManualContents",
        });
    }

    async getUserManualContentsBySubsection(
        subsectionId: string
    ): Promise<CustomResponseType<UserManualContent[]>> {
        return await getAllHandler<UserManualContent>({
            query: { where: { subsection: { id: subsectionId } } },
            repository: this.contentRepo,
            table: "UserManualContents",
        });
    }

    async createUserManualContent(
        dto: CreateUserManualContentDto
    ): Promise<CustomResponseType<UserManualContent>> {
        try {
            const created = await createHandler<UserManualContent>({
                dto: {
                    title: dto.title,
                    description: dto.description ?? null,
                    subsection: { id: dto.subsectionId } as any,
                },
                repository: this.contentRepo,
            });
            return newInstanceRes<UserManualContent>(
                "Content created successfully",
                created
            );
        } catch (e) {
            return errorRes(e.message);
        }
    }

    async updateUserManualContent(
        id: string,
        dto: UpdateUserManualContentDto
    ): Promise<
        CustomResponseType<UpdateResult & { newRecord: UserManualContent }>
    > {
        try {
            const patch: any = { ...dto };
            if (dto.subsectionId)
                patch.subsection = { id: dto.subsectionId } as any;
            delete patch.subsectionId;

            const response = await updateHandler<UserManualContent>({
                id,
                dto: patch,
                table: TablesNames.USER_MANUAL_CONTENT,
                repository: this.contentRepo,
            });
            return updatedRes<UpdateResult & { newRecord: UserManualContent }>(
                "Content updated successfully",
                response
            );
        } catch (e) {
            return errorRes(e.message);
        }
    }

    async deleteUserManualContent(
        query: DeleteQueryProps,
        userTokenData: Partial<FullTokenPayload>
    ): Promise<CustomResponseType<DeleteResult>> {
        return await deleteHandler<UserManualContent>({
            id: query.id,
            wipe: query.wipe,
            repository: this.contentRepo,
            table: "UserManualContent",
            userTokenData,
        });
    }

    // App Evaluations
    async getAppEvaluations(
        query: FindManyOptions<AppEvaluation>
    ): Promise<CustomResponseType<AppEvaluation[]>> {
        return await getAllHandler<AppEvaluation>({
            query,
            repository: this.evalRepo,
            table: "AppEvaluations",
        });
    }

    async getAppEvaluationById(
        id: string
    ): Promise<CustomResponseType<AppEvaluation>> {
        return await getByIdHandler<AppEvaluation>({
            id,
            repository: this.evalRepo,
            table: TablesNames.APP_EVALUATION,
        });
    }

    async createAppEvaluation(
        dto: CreateAppEvaluationDto
    ): Promise<CustomResponseType<AppEvaluation>> {
        try {
            const created = await createHandler<AppEvaluation>({
                dto: {
                    ui: dto.ui,
                    comprehensiveness: dto.comprehensiveness,
                    performance: dto.performance,
                    dataAccuracy: dto.dataAccuracy,
                    overall: dto.overall,
                    notes: dto.notes ?? null,
                    user: { id: dto.user } as any,
                },
                repository: this.evalRepo,
            });
            return newInstanceRes<AppEvaluation>(
                "App evaluation created successfully",
                created
            );
        } catch (e) {
            return errorRes(e.message);
        }
    }
}
