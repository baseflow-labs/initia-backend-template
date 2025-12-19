import { IsNotEmpty, IsOptional, IsUUID } from "class-validator";
import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { FormSection } from "./formSection.entity";

@Entity()
export class Form {
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
    @OneToMany(() => FormSection, (formSection) => formSection.form)
    formSections: FormSection[];
}
