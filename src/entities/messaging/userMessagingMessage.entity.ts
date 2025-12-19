import {
    Column,
    CreateDateColumn,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { UserMessaging } from "./userMessaging.entity";
import { UserMessagingMessageRecipient } from "./userMessagingMessageRecipient.entity";
import { UserMessagingMessageReaction } from "./userMessagingMessageReaction.entity";

@Entity("messages")
@Index(["userMessagingId", "createdAt"])
export class UserMessagingMessage {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @UpdateDateColumn({ type: "timestamptz" })
    updatedAt: Date;

    @CreateDateColumn({ type: "timestamptz" })
    createdAt: Date;

    // --- columns ---
    @Index()
    @Column("uuid")
    userMessagingId: string;

    @ManyToOne(() => UserMessaging, (c) => c.messages, { onDelete: "CASCADE" })
    @JoinColumn({ name: "userMessagingId" })
    userMessaging: UserMessaging;

    @Index()
    @Column("uuid")
    senderId: string; // FK to users

    @Column({ type: "text", nullable: true })
    text?: string;

    @Index()
    @Column({ type: "uuid", nullable: true })
    parentMessageId?: string; // threading

    @Column({ default: false })
    isEdited: boolean;

    @Column({ default: false })
    isDeleted: boolean;

    @Column({ type: "timestamptz", nullable: true })
    deletedAt?: Date;

    // --- relations ---
    @OneToMany(() => UserMessagingMessageRecipient, (r) => r.message)
    recipients: UserMessagingMessageRecipient[];

    @OneToMany(() => UserMessagingMessageReaction, (r) => r.message)
    reactions: UserMessagingMessageReaction[];
}
