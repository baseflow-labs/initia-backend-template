import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {
    DeleteResult,
    FindManyOptions,
    Repository,
    UpdateResult,
} from "typeorm";

import {
    createHandler,
    deleteHandler,
    getAllHandler,
    updateHandler,
} from "@/helpers";
import {
    CustomResponseType,
    DeleteQueryProps,
    FullTokenPayload,
} from "@/types";
import { errorRes, newInstanceRes, updatedRes, deletedRes } from "@/responses";
import { Form, FormAnswer, FormSection, FormSectionInput } from "@/entities";
import {
    CreateFormDto,
    UpdateFormDto,
    CreateFormSectionDto,
    UpdateFormSectionDto,
    CreateFormSectionInputDto,
    UpdateFormSectionInputDto,
    CreateFormAnswerDto,
    UpdateFormAnswerDto,
} from "@/dto";

@Injectable()
export class FormOfFormsService {
    constructor(
        @InjectRepository(Form)
        private readonly formRepository: Repository<Form>,
        @InjectRepository(FormSection)
        private readonly sectionRepository: Repository<FormSection>,
        @InjectRepository(FormSectionInput)
        private readonly inputRepository: Repository<FormSectionInput>,
        @InjectRepository(FormAnswer)
        private readonly answerRepository: Repository<FormAnswer>
    ) {}

    // ---------- Form ----------
    async getForms(
        query: FindManyOptions<Form>
    ): Promise<CustomResponseType<Form[]>> {
        return await getAllHandler<Form>({
            query,
            repository: this.formRepository,
            table: "Forms",
        });
    }

    async createForm(dto: CreateFormDto): Promise<CustomResponseType<Form>> {
        try {
            const created = await createHandler<Form>({
                dto,
                repository: this.formRepository,
            });

            return newInstanceRes<Form>("Form created successfully", created);
        } catch (e) {
            return errorRes(e.message);
        }
    }

    async updateForm(
        id: string,
        dto: UpdateFormDto
    ): Promise<CustomResponseType<UpdateResult & { newRecord: Form }>> {
        try {
            const response = await updateHandler<Form>({
                id,
                dto,
                table: "Form",
                repository: this.formRepository,
            });
            return updatedRes<UpdateResult & { newRecord: Form }>(
                "Form updated successfully",
                response
            );
        } catch (e) {
            return errorRes(e.message);
        }
    }

    async deleteForm(
        query: DeleteQueryProps,
        userTokenData: Partial<FullTokenPayload>
    ): Promise<CustomResponseType<DeleteResult>> {
        return await deleteHandler<Form>({
            id: query.id,
            wipe: query.wipe,
            repository: this.formRepository,
            table: "Form",
            userTokenData,
        });
    }

    // ---------- FormSection ----------
    async getFormSections(
        query: FindManyOptions<FormSection>
    ): Promise<CustomResponseType<FormSection[]>> {
        return await getAllHandler<FormSection>({
            query,
            repository: this.sectionRepository,
            table: "FormSections",
        });
    }

    async getFormSectionsByForm(
        formId: string
    ): Promise<CustomResponseType<FormSection[]>> {
        return await getAllHandler<FormSection>({
            query: { where: { form: { id: formId } } },
            repository: this.sectionRepository,
            table: "FormSections",
        });
    }

    async createFormSection(
        dto: CreateFormSectionDto
    ): Promise<CustomResponseType<FormSection>> {
        try {
            const created = await createHandler<FormSection>({
                dto: {
                    title: dto.title,
                    description: dto.description ?? null,
                    form: { id: dto.formId } as any,
                },
                repository: this.sectionRepository,
            });
            return newInstanceRes<FormSection>(
                "Section created successfully",
                created
            );
        } catch (e) {
            return errorRes(e.message);
        }
    }

    async updateFormSection(
        id: string,
        dto: UpdateFormSectionDto
    ): Promise<CustomResponseType<UpdateResult & { newRecord: FormSection }>> {
        try {
            const patch: any = { ...dto };
            if (dto.formId) patch.form = { id: dto.formId } as any;
            delete patch.formId;

            const response = await updateHandler<FormSection>({
                id,
                dto: patch,
                table: "FormSection",
                repository: this.sectionRepository,
            });
            return updatedRes<UpdateResult & { newRecord: FormSection }>(
                "Section updated successfully",
                response
            );
        } catch (e) {
            return errorRes(e.message);
        }
    }

    async deleteFormSection(
        query: DeleteQueryProps,
        userTokenData: Partial<FullTokenPayload>
    ): Promise<CustomResponseType<DeleteResult>> {
        return await deleteHandler<FormSection>({
            id: query.id,
            wipe: query.wipe,
            repository: this.sectionRepository,
            table: "FormSection",
            userTokenData,
        });
    }

    // ---------- FormSectionInput ----------
    async getFormSectionInputs(
        query: FindManyOptions<FormSectionInput>
    ): Promise<CustomResponseType<FormSectionInput[]>> {
        return await getAllHandler<FormSectionInput>({
            query,
            repository: this.inputRepository,
            table: "FormSectionInputs",
        });
    }

    async getFormSectionInputsBySection(
        sectionId: string
    ): Promise<CustomResponseType<FormSectionInput[]>> {
        return await getAllHandler<FormSectionInput>({
            query: { where: { formSection: { id: sectionId } } },
            repository: this.inputRepository,
            table: "FormSectionInputs",
        });
    }

    async createFormSectionInput(
        dto: CreateFormSectionInputDto
    ): Promise<CustomResponseType<FormSectionInput>> {
        try {
            const created = await createHandler<FormSectionInput>({
                dto: {
                    label: dto.label,
                    labelNote: dto.labelNote ?? null,
                    name: dto.name,
                    type: dto.type,
                    required: dto.required ?? null,
                    options: dto.options ?? null,
                    formSection: { id: dto.formSectionId } as any,
                },
                repository: this.inputRepository,
            });
            return newInstanceRes<FormSectionInput>(
                "Input created successfully",
                created
            );
        } catch (e) {
            return errorRes(e.message);
        }
    }

    async updateFormSectionInput(
        id: string,
        dto: UpdateFormSectionInputDto
    ): Promise<
        CustomResponseType<UpdateResult & { newRecord: FormSectionInput }>
    > {
        try {
            const patch: any = { ...dto };
            if (dto.formSectionId)
                patch.formSection = { id: dto.formSectionId } as any;
            delete patch.formSectionId;

            const response = await updateHandler<FormSectionInput>({
                id,
                dto: patch,
                table: "FormSectionInput",
                repository: this.inputRepository,
            });
            return updatedRes<UpdateResult & { newRecord: FormSectionInput }>(
                "Input updated successfully",
                response
            );
        } catch (e) {
            return errorRes(e.message);
        }
    }

    async deleteFormSectionInput(
        query: DeleteQueryProps,
        userTokenData: Partial<FullTokenPayload>
    ): Promise<CustomResponseType<DeleteResult>> {
        return await deleteHandler<FormSectionInput>({
            id: query.id,
            wipe: query.wipe,
            repository: this.inputRepository,
            table: "FormSectionInput",
            userTokenData,
        });
    }

    // ---------- FormAnswer ----------
    async getFormAnswers(
        query: FindManyOptions<FormAnswer>
    ): Promise<CustomResponseType<FormAnswer[]>> {
        return await getAllHandler<FormAnswer>({
            query,
            repository: this.answerRepository,
            table: "FormAnswers",
        });
    }

    async getFormAnswersByInput(
        inputId: string
    ): Promise<CustomResponseType<FormAnswer[]>> {
        return await getAllHandler<FormAnswer>({
            query: { where: { input: { id: inputId } } },
            repository: this.answerRepository,
            table: "FormAnswers",
        });
    }

    async createFormAnswer(
        dto: CreateFormAnswerDto
    ): Promise<CustomResponseType<FormAnswer>> {
        try {
            const created = await createHandler<FormAnswer>({
                dto: { answer: dto.answer, input: { id: dto.inputId } as any },
                repository: this.answerRepository,
            });
            return newInstanceRes<FormAnswer>(
                "Answer created successfully",
                created
            );
        } catch (e) {
            return errorRes(e.message);
        }
    }

    async updateFormAnswer(
        id: string,
        dto: UpdateFormAnswerDto
    ): Promise<CustomResponseType<UpdateResult & { newRecord: FormAnswer }>> {
        try {
            const patch: any = { ...dto };
            if (dto.inputId) patch.input = { id: dto.inputId } as any;
            delete patch.inputId;

            const response = await updateHandler<FormAnswer>({
                id,
                dto: patch,
                table: "FormAnswer",
                repository: this.answerRepository,
            });
            return updatedRes<UpdateResult & { newRecord: FormAnswer }>(
                "Answer updated successfully",
                response
            );
        } catch (e) {
            return errorRes(e.message);
        }
    }

    async deleteFormAnswer(
        query: DeleteQueryProps,
        userTokenData: Partial<FullTokenPayload>
    ): Promise<CustomResponseType<DeleteResult>> {
        return await deleteHandler<FormAnswer>({
            id: query.id,
            wipe: query.wipe,
            repository: this.answerRepository,
            table: "FormAnswer",
            userTokenData,
        });
    }

    // ---------- Full Form create (form + sections + inputs) ----------
    async createFullForm(dto: {
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
    }): Promise<
        CustomResponseType<{
            form: Form;
            sections: Array<{
                section: FormSection;
                inputs: FormSectionInput[];
            }>;
        }>
    > {
        try {
            return await this.formRepository.manager.transaction(async (em) => {
                const form = await createHandler<Form>({
                    dto: {
                        title: dto.title,
                        description: dto.description ?? null,
                    },
                    repository: this.formRepository,
                });

                const sectionsPayload: Array<{
                    section: FormSection;
                    inputs: FormSectionInput[];
                }> = [];

                for (const s of dto.sections || []) {
                    const section = await createHandler<FormSection>({
                        dto: {
                            title: s.title,
                            description: s.description ?? null,
                            form: { id: form.id } as any,
                        },
                        repository: this.sectionRepository,
                    });

                    const createdInputs: FormSectionInput[] = [];
                    for (const inp of s.inputs || []) {
                        const input = await createHandler<FormSectionInput>({
                            dto: {
                                label: inp.label,
                                labelNote: inp.labelNote ?? null,
                                name: inp.name,
                                type: inp.type,
                                required: inp.required ?? null,
                                options: inp.options ?? null,
                                formSection: { id: section.id } as any,
                            },
                            repository: this.inputRepository,
                        });
                        createdInputs.push(input);
                    }

                    sectionsPayload.push({ section, inputs: createdInputs });
                }

                return newInstanceRes(
                    "Form (with sections & inputs) created successfully",
                    {
                        form,
                        sections: sectionsPayload,
                    }
                );
            });
        } catch (e) {
            return errorRes(e.message);
        }
    }
}
