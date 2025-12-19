// supportTicket.entity.ts
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
import { User } from "../user.entity";

@Entity("support_tickets")
export class SupportTicket {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @UpdateDateColumn({ type: "timestamptz" })
    updatedAt: Date;

    @CreateDateColumn({ type: "timestamptz" })
    createdAt: Date;

    @Column({ type: "varchar", length: 50, nullable: false })
    type: string;

    @Column({ type: "varchar", length: 200, nullable: false })
    title: string;

    @Column({ type: "boolean", default: false })
    urgent: boolean;

    @Column({ type: "text", nullable: false })
    content: string;

    @ManyToOne(() => User, (user) => user.supportTickets, {
        cascade: true,
        onDelete: "CASCADE",
    })
    @JoinColumn()
    user: User;
}
