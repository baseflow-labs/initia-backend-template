import {
    Column,
    CreateDateColumn,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    Unique,
    UpdateDateColumn,
} from "typeorm";
import { UserMessagingMessage } from "./userMessagingMessage.entity";

@Entity("message_recipients")
@Unique("uq_message_user", ["messageId", "userId"])
@Index(["userId", "messageId"])
export class UserMessagingMessageRecipient {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @UpdateDateColumn({ type: "timestamptz" })
    updatedAt: Date;

    @CreateDateColumn({ type: "timestamptz" })
    createdAt: Date;

    // --- columns ---
    @Index()
    @Column("uuid")
    messageId: string;

    @ManyToOne(() => UserMessagingMessage, (m) => m.recipients, {
        onDelete: "CASCADE",
    })
    @JoinColumn({ name: "messageId" })
    message: UserMessagingMessage;

    @Index()
    @Column("uuid")
    userId: string; // FK to users

    @Column({ type: "timestamptz", nullable: true })
    deliveredAt?: Date;

    @Column({ type: "timestamptz", nullable: true })
    readAt?: Date;

    // Per-user soft hide (does not affect others)
    @Column({ default: false })
    isHidden: boolean;
}
