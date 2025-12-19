import { IsOptional } from "class-validator";
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
import { UserManualSection } from "./userManualSection.entity";
import { UserManualContent } from "./userManualContent.entity";

@Entity("user_manual_subsections")
export class UserManualSubsection {
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
    @ManyToOne(
        () => UserManualSection,
        (userManualSection) => userManualSection.subsections,
        {
            cascade: true,
            onDelete: "CASCADE",
        }
    )
    @JoinColumn()
    section: UserManualSection;

    @OneToMany(
        () => UserManualContent,
        (userManualContent) => userManualContent.subsection,
        {
            onDelete: "CASCADE",
        }
    )
    contents: UserManualContent[];
}
