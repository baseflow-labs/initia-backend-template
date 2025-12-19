import { IsOptional } from "class-validator";
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { UserManualSubsection } from "./userManualSubsection.entity";

@Entity("user_manual_contents")
export class UserManualContent {
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
        () => UserManualSubsection,
        (userManualSubsection) => userManualSubsection.contents,
        {
            cascade: true,
            onDelete: "CASCADE",
        }
    )
    @JoinColumn()
    subsection: UserManualSubsection;
}
