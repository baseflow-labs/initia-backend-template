import { IsOptional } from "class-validator";
import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    Index,
} from "typeorm";
import { UserMessagingParticipant } from "./userMessagingParticipant.entity";
import { UserMessagingMessage } from "./userMessagingMessage.entity";

@Entity("userMessagings")
@Index(["isGroup"])
export class UserMessaging {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @UpdateDateColumn({ type: "timestamptz" })
    updatedAt: Date;

    @CreateDateColumn({ type: "timestamptz" })
    createdAt: Date;

    // --- columns ---
    @Column({ default: false })
    isGroup: boolean;

    // Group metadata
    @IsOptional()
    @Column({ type: "varchar", length: 120, nullable: true })
    title?: string;

    @IsOptional()
    @Column({ type: "varchar", length: 500, nullable: true })
    description?: string;

    @IsOptional()
    @Column({ type: "text", nullable: true })
    avatarUrl?: string;

    // Denormalized last message for fast listing
    @Index()
    @Column({ type: "timestamptz", nullable: true })
    lastMessageAt?: Date;

    @Column({ type: "uuid", nullable: true })
    lastMessageId?: string;

    // For direct userMessagings, you may optionally store a stable pair key to enforce uniqueness.
    @Index({ unique: true, where: `"isGroup" = false` })
    @Column({ type: "varchar", length: 200, nullable: true })
    directPairKey?: string; // e.g., `${minId}#${maxId}`

    // --- relations ---
    @OneToMany(() => UserMessagingParticipant, (p) => p.userMessaging)
    participants: UserMessagingParticipant[];

    @OneToMany(() => UserMessagingMessage, (m) => m.userMessaging)
    messages: UserMessagingMessage[];
}
