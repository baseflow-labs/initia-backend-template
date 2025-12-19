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
import { FormAnswer } from "./formAnswer.entity";
import { FormSection } from "./formSection.entity";

@Entity()
export class FormSectionInput {
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
    label: string;

    @IsOptional()
    @Column({ type: "text", nullable: true })
    labelNote?: string;

    @IsNotEmpty()
    @Column({ type: "varchar", length: 120, nullable: false })
    name: string;

    @IsNotEmpty()
    @Column({ type: "varchar", length: 120, nullable: false })
    type: string;

    @IsOptional()
    @Column({ type: "boolean", nullable: true })
    required?: string;

    @IsOptional()
    @Column({
        type: "text",
        array: true,
        nullable: true,
        comment: "",
    })
    options?: string[];

    // --- relations ---

    @ManyToOne(() => FormSection, (c) => c.formSectionInputs, {
        onDelete: "CASCADE",
    })
    @JoinColumn({ name: "formSectionId" })
    formSection: FormSection;

    @OneToMany(() => FormAnswer, (formSection) => formSection.input)
    formAnswers: FormAnswer[];
}
