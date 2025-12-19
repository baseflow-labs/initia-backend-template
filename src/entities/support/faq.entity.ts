import { IsOptional } from "class-validator";
import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";

@Entity("faqs")
export class Faq {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @UpdateDateColumn({ type: "timestamptz" })
    updatedAt: Date;

    @CreateDateColumn({ type: "timestamptz" })
    createdAt: Date;

    @Column({ type: "varchar", length: 200, nullable: false })
    title: string;

    @Column({ type: "text", nullable: false })
    content: string;

    @IsOptional()
    @Column({ type: "varchar", length: 2048, nullable: true })
    link?: string;
}
