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
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseUUIDPipe,
    Patch,
    Post,
    Query,
    Res,
} from "@nestjs/common";

import type { Response } from "express";
import { SupportService } from "./support.service";

@Controller("support")
export class SupportController {
    constructor(private readonly supportService: SupportService) {}

    // FAQs
    @Post("faqs")
    async createFaq(@Body() dto: CreateFaqDto, @Res() res: Response) {
        const r = await this.supportService.createFaq(dto);
        return res.status(r.status).json(r);
    }

    @Get("faqs")
    async getFaqs(@Res() res: Response) {
        const r = await this.supportService.getFaqs({});
        return res.status(r.status).json(r);
    }

    @Patch("faqs/:id")
    async updateFaq(
        @Param("id", new ParseUUIDPipe()) id: string,
        @Body() dto: UpdateFaqDto,
        @Res() res: Response
    ) {
        const r = await this.supportService.updateFaq(id, dto);
        return res.status(r.status).json(r);
    }

    @Delete("faqs/:id")
    async deleteFaq(
        @Param("id", new ParseUUIDPipe()) id: string,
        @Query("wipe") wipe: string,
        @Res() res: Response
    ) {
        const r = await this.supportService.deleteFaq(
            { id, wipe: wipe === "true" },
            {}
        );
        return res.status(r.status).json(r);
    }

    // Support Tickets
    @Post("support-tickets")
    async createSupportTicket(
        @Body() dto: CreateSupportTicketDto,
        @Res() res: Response
    ) {
        const r = await this.supportService.createSupportTicket(dto);
        return res.status(r.status).json(r);
    }

    @Get("support-tickets")
    async getSupportTickets(@Res() res: Response) {
        const r = await this.supportService.getSupportTickets({});
        return res.status(r.status).json(r);
    }

    @Get("support-tickets/:id")
    async getSupportTicketById(
        @Param("id", new ParseUUIDPipe()) id: string,
        @Res() res: Response
    ) {
        const r = await this.supportService.getSupportTicketById(id);
        return res.status(r.status).json(r);
    }

    // User Manual Sections
    @Post("manual/sections")
    async createSection(
        @Body() dto: CreateUserManualSectionDto,
        @Res() res: Response
    ) {
        const r = await this.supportService.createUserManualSection(dto);
        return res.status(r.status).json(r);
    }

    @Get("manual/sections")
    async getSections(@Res() res: Response) {
        const r = await this.supportService.getUserManualSections({});
        return res.status(r.status).json(r);
    }

    @Patch("manual/sections/:id")
    async updateSection(
        @Param("id", new ParseUUIDPipe()) id: string,
        @Body() dto: UpdateUserManualSectionDto,
        @Res() res: Response
    ) {
        const r = await this.supportService.updateUserManualSection(id, dto);
        return res.status(r.status).json(r);
    }

    @Delete("manual/sections/:id")
    async deleteSection(
        @Param("id", new ParseUUIDPipe()) id: string,
        @Query("wipe") wipe: string,
        @Res() res: Response
    ) {
        const r = await this.supportService.deleteUserManualSection(
            { id, wipe: wipe === "true" },
            {}
        );
        return res.status(r.status).json(r);
    }

    // User Manual Subsections
    @Post("manual/subsections")
    async createSubsection(
        @Body() dto: CreateUserManualSubsectionDto,
        @Res() res: Response
    ) {
        const r = await this.supportService.createUserManualSubsection(dto);
        return res.status(r.status).json(r);
    }

    @Get("manual/subsections")
    async getSubsections(@Res() res: Response) {
        const r = await this.supportService.getUserManualSubsections({});
        return res.status(r.status).json(r);
    }

    @Get("manual/sections/:sectionId/subsections")
    async getSubsectionsBySection(
        @Param("sectionId", new ParseUUIDPipe()) sectionId: string,
        @Res() res: Response
    ) {
        const r =
            await this.supportService.getUserManualSubsectionsBySection(
                sectionId
            );
        return res.status(r.status).json(r);
    }

    @Patch("manual/subsections/:id")
    async updateSubsection(
        @Param("id", new ParseUUIDPipe()) id: string,
        @Body() dto: UpdateUserManualSubsectionDto,
        @Res() res: Response
    ) {
        const r = await this.supportService.updateUserManualSubsection(id, dto);
        return res.status(r.status).json(r);
    }

    @Delete("manual/subsections/:id")
    async deleteSubsection(
        @Param("id", new ParseUUIDPipe()) id: string,
        @Query("wipe") wipe: string,
        @Res() res: Response
    ) {
        const r = await this.supportService.deleteUserManualSubsection(
            { id, wipe: wipe === "true" },
            {}
        );
        return res.status(r.status).json(r);
    }

    // User Manual Contents
    @Post("manual/contents")
    async createContent(
        @Body() dto: CreateUserManualContentDto,
        @Res() res: Response
    ) {
        const r = await this.supportService.createUserManualContent(dto);
        return res.status(r.status).json(r);
    }

    @Get("manual/contents")
    async getContents(@Res() res: Response) {
        const r = await this.supportService.getUserManualContents({});
        return res.status(r.status).json(r);
    }

    @Get("manual/subsections/:subsectionId/contents")
    async getContentsBySubsection(
        @Param("subsectionId", new ParseUUIDPipe()) subsectionId: string,
        @Res() res: Response
    ) {
        const r =
            await this.supportService.getUserManualContentsBySubsection(
                subsectionId
            );
        return res.status(r.status).json(r);
    }

    @Patch("manual/contents/:id")
    async updateContent(
        @Param("id", new ParseUUIDPipe()) id: string,
        @Body() dto: UpdateUserManualContentDto,
        @Res() res: Response
    ) {
        const r = await this.supportService.updateUserManualContent(id, dto);
        return res.status(r.status).json(r);
    }

    @Delete("manual/contents/:id")
    async deleteContent(
        @Param("id", new ParseUUIDPipe()) id: string,
        @Query("wipe") wipe: string,
        @Res() res: Response
    ) {
        const r = await this.supportService.deleteUserManualContent(
            { id, wipe: wipe === "true" },
            {}
        );
        return res.status(r.status).json(r);
    }

    // App Evaluations
    @Post("app-evaluations")
    async createAppEvaluation(
        @Body() dto: CreateAppEvaluationDto,
        @Res() res: Response
    ) {
        const r = await this.supportService.createAppEvaluation(dto);
        return res.status(r.status).json(r);
    }

    @Get("app-evaluations")
    async getAppEvaluations(@Res() res: Response) {
        const r = await this.supportService.getAppEvaluations({});
        return res.status(r.status).json(r);
    }

    @Get("app-evaluations/:id")
    async getAppEvaluationById(
        @Param("id", new ParseUUIDPipe()) id: string,
        @Res() res: Response
    ) {
        const r = await this.supportService.getAppEvaluationById(id);
        return res.status(r.status).json(r);
    }
}
