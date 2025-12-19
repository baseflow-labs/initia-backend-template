import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    Unique,
    UpdateDateColumn,
    Index,
} from "typeorm";
import { UserMessagingMessage } from "./userMessagingMessage.entity";

@Entity("message_reactions")
@Unique("uq_reaction", ["messageId", "userId", "emoji"])
export class UserMessagingMessageReaction {
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

    @ManyToOne(() => UserMessagingMessage, (m) => m.reactions, {
        onDelete: "CASCADE",
    })
    @JoinColumn({ name: "messageId" })
    message: UserMessagingMessage;

    @Index()
    @Column("uuid")
    userId: string;

    @Column({ type: "varchar", length: 32 })
    emoji: string; // 👍, :heart:, U+1F44D
}
