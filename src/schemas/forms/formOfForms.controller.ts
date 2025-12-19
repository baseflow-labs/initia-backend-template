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
} from "@nestjs/common";

import type { Response } from "express";
import { FormOfFormsService } from "./formOfForms.service";
import { CreateFormDto } from "@/dto/forms/create-form.dto";
import { UpdateFormDto } from "@/dto/forms/update-form.dto";
import { CreateFormSectionDto } from "@/dto/forms/formSection/create-formSection.dto";
import { UpdateFormSectionDto } from "@/dto/forms/formSection/update-formSection.dto";
import { CreateFormSectionInputDto } from "@/dto/forms/formSectionInput/create-formSectionInput.dto";
import { UpdateFormSectionInputDto } from "@/dto/forms/formSectionInput/update-formSectionInput.dto";
import { CreateFormAnswerDto } from "@/dto/forms/formAnswer/create-formAnswer.dto";
import { UpdateFormAnswerDto } from "@/dto/forms/formAnswer/update-formAnswer.dto";

@Controller("form")
export class FormOfFormsController {
    constructor(private readonly formOfFormsService: FormOfFormsService) {}

    // ---------- Form (single-entity endpoints) ----------
    @Post()
    async createForm(@Body() dto: CreateFormDto, @Res() res: Response) {
        const r = await this.formOfFormsService.createForm(dto);
        return res.status(r.status).json(r);
    }

    @Get()
    async getForms(@Res() res: Response) {
        const r = await this.formOfFormsService.getForms({});
        return res.status(r.status).json(r);
    }

    @Patch(":id")
    async updateForm(
        @Param("id") id: string,
        @Body() dto: UpdateFormDto,
        @Res() res: Response
    ) {
        const r = await this.formOfFormsService.updateForm(id, dto);
        return res.status(r.status).json(r);
    }

    @Delete()
    async deleteForm(
        @Query("id") id: string,
        @Res() res: Response,
        @Query("wipe") wipe?: string
    ) {
        const r = await this.formOfFormsService.deleteForm(
            { id, wipe: wipe === "true" },
            {}
        );
        return res.status(r.status).json(r);
    }

    // ---------- FormSection ----------
    @Post("sections")
    async createSection(
        @Body() dto: CreateFormSectionDto,
        @Res() res: Response
    ) {
        const r = await this.formOfFormsService.createFormSection(dto);
        return res.status(r.status).json(r);
    }

    @Get("sections")
    async getSections(@Res() res: Response) {
        const r = await this.formOfFormsService.getFormSections({});
        return res.status(r.status).json(r);
    }

    @Get(":formId/sections")
    async getSectionsByForm(
        @Param("formId") formId: string,
        @Res() res: Response
    ) {
        const r = await this.formOfFormsService.getFormSectionsByForm(formId);
        return res.status(r.status).json(r);
    }

    @Patch("sections/:id")
    async updateSection(
        @Param("id") id: string,
        @Body() dto: UpdateFormSectionDto,
        @Res() res: Response
    ) {
        const r = await this.formOfFormsService.updateFormSection(id, dto);
        return res.status(r.status).json(r);
    }

    @Delete("sections")
    async deleteSection(
        @Query("id") id: string,
        @Res() res: Response,
        @Query("wipe") wipe?: string
    ) {
        const r = await this.formOfFormsService.deleteFormSection(
            { id, wipe: wipe === "true" },
            {}
        );
        return res.status(r.status).json(r);
    }

    // ---------- FormSectionInput ----------
    @Post("inputs")
    async createInput(
        @Body() dto: CreateFormSectionInputDto,
        @Res() res: Response
    ) {
        const r = await this.formOfFormsService.createFormSectionInput(dto);
        return res.status(r.status).json(r);
    }

    @Get("inputs")
    async getInputs(@Res() res: Response) {
        const r = await this.formOfFormsService.getFormSectionInputs({});
        return res.status(r.status).json(r);
    }

    @Get("sections/:sectionId/inputs")
    async getInputsBySection(
        @Param("sectionId") sectionId: string,
        @Res() res: Response
    ) {
        const r =
            await this.formOfFormsService.getFormSectionInputsBySection(
                sectionId
            );
        return res.status(r.status).json(r);
    }

    @Patch("inputs/:id")
    async updateInput(
        @Param("id") id: string,
        @Body() dto: UpdateFormSectionInputDto,
        @Res() res: Response
    ) {
        const r = await this.formOfFormsService.updateFormSectionInput(id, dto);
        return res.status(r.status).json(r);
    }

    @Delete("inputs")
    async deleteInput(
        @Query("id") id: string,
        @Res() res: Response,
        @Query("wipe") wipe?: string
    ) {
        const r = await this.formOfFormsService.deleteFormSectionInput(
            { id, wipe: wipe === "true" },
            {}
        );
        return res.status(r.status).json(r);
    }

    // ---------- FormAnswer ----------
    @Post("answers")
    async createAnswer(@Body() dto: CreateFormAnswerDto, @Res() res: Response) {
        const r = await this.formOfFormsService.createFormAnswer(dto);
        return res.status(r.status).json(r);
    }

    @Get("answers")
    async getAnswers(@Res() res: Response) {
        const r = await this.formOfFormsService.getFormAnswers({});
        return res.status(r.status).json(r);
    }

    @Get("inputs/:inputId/answers")
    async getAnswersByInput(
        @Param("inputId") inputId: string,
        @Res() res: Response
    ) {
        const r = await this.formOfFormsService.getFormAnswersByInput(inputId);
        return res.status(r.status).json(r);
    }

    @Patch("answers/:id")
    async updateAnswer(
        @Param("id") id: string,
        @Body() dto: UpdateFormAnswerDto,
        @Res() res: Response
    ) {
        const r = await this.formOfFormsService.updateFormAnswer(id, dto);
        return res.status(r.status).json(r);
    }

    @Delete("answers")
    async deleteAnswer(
        @Query("id") id: string,
        @Res() res: Response,
        @Query("wipe") wipe?: string
    ) {
        const r = await this.formOfFormsService.deleteFormAnswer(
            { id, wipe: wipe === "true" },
            {}
        );
        return res.status(r.status).json(r);
    }

    // ---------- Full Form create (form + sections + inputs) ----------
    @Post("full")
    async createFullForm(
        @Body()
        dto: {
            title: string;
            description?: string;
            sections: Array<{
                title: string;
                description?: string;
                inputs: Array<{
                    label: string;
                    labelNote?: string;
                    name: string;
                    type: string;
                    required?: boolean;
                    options?: string[];
                }>;
            }>;
        },
        @Res() res: Response
    ) {
        const r = await this.formOfFormsService.createFullForm(dto);
        return res.status(r.status).json(r);
    }
}
