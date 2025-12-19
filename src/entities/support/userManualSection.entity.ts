import { IsOptional } from "class-validator";
import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { UserManualSubsection } from "./userManualSubsection.entity";

@Entity("user_manual_sections")
export class UserManualSection {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @UpdateDateColumn({ type: "timestamptz" })
    updatedAt: Date;

    @CreateDateColumn({ type: "timestamptz" })
    createdAt: Date;

    @Column({ type: "varchar", length: 200, nullable: false })
    title: string;

    @IsOptional()
    @Column({ type: "text", nullable: true })
    description?: string;

    // --- relations ---
    @OneToMany(
        () => UserManualSubsection,
        (userManualSubsection) => userManualSubsection.section,
        {
            onDelete: "CASCADE",
        }
    )
    subsections: UserManualSubsection[];
}
