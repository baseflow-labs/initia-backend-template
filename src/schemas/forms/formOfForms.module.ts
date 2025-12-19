import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Form, FormAnswer, FormSection, FormSectionInput } from "src/entities";
import { FormOfFormsController } from "./formOfForms.controller";
import { FormOfFormsService } from "./formOfForms.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Form,
            FormSection,
            FormSectionInput,
            FormAnswer,
        ]),
    ],
    controllers: [FormOfFormsController],
    providers: [FormOfFormsService],
    exports: [FormOfFormsService],
})
export class FormOfFormsModule {}
