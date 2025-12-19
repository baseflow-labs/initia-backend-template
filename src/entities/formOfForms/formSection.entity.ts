import { IsNotEmpty, IsOptional, IsUUID } from "class-validator";
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { Form } from "./form.entity";
import { FormSectionInput } from "./formSectionInput.entity";

@Entity()
export class FormSection {
    @PrimaryGeneratedColumn("uuid")
    @IsUUID()
    id: string;

    @UpdateDateColumn({ type: "timestamp" })
    updatedAt: Date;

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;

    // --- columns ---
    @IsNotEmpty()
    @Column({ type: "varchar", length: 120, nullable: false })
    title: string;

    @IsOptional()
    @Column({ type: "varchar", length: 500, nullable: true })
    description?: string;

    // --- relations ---

    @ManyToOne(() => Form, (c) => c.formSections, {
        onDelete: "CASCADE",
    })
    @JoinColumn({ name: "formSectionId" })
    form: Form;

    @OneToMany(
        () => FormSectionInput,
        (formSectionInput) => formSectionInput.formSection
    )
    formSectionInputs: FormSectionInput[];
}
