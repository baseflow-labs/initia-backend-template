import { IsNotEmpty, IsUUID } from "class-validator";
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { FormSectionInput } from "./formSectionInput.entity";

@Entity()
export class FormAnswer {
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
    answer: string;

    // --- relations ---

    @ManyToOne(() => FormSectionInput, (form) => form.formAnswers, {
        onDelete: "CASCADE",
    })
    @JoinColumn({ name: "FormAnswerId" })
    input: FormSectionInput;
}
