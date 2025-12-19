import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    Unique,
    JoinColumn,
    Index,
} from "typeorm";
import { UserMessaging } from "./userMessaging.entity";

@Entity("userMessaging_participants")
@Unique("uq_userMessaging_user", ["userMessagingId", "userId"])
export class UserMessagingParticipant {
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

    @ManyToOne(() => UserMessaging, (c) => c.participants, {
        onDelete: "CASCADE",
    })
    @JoinColumn({ name: "userMessagingId" })
    userMessaging: UserMessaging;

    @Index()
    @Column("uuid")
    userId: string; // FK to users

    @Column({ type: "varchar", length: 10, default: "member" })
    role: "owner" | "admin" | "member";

    @Column({ default: true })
    isActive: boolean;

    @Column({ default: false })
    muted: boolean;

    @Column({ type: "timestamptz", nullable: true })
    lastReadAt?: Date;
}
