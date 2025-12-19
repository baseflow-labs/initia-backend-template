import { User } from "./user.entity";
import { IsEnum, IsUUID } from "class-validator";
import { NotificationChannels } from "src/enums/notificationChannels.enum";
import { TablesNames } from "src/enums/tables.enum";
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";

@Entity()
export class Notification {
    // --- base columns ---
    @PrimaryGeneratedColumn("uuid")
    @IsUUID()
    id: string;

    @UpdateDateColumn({ type: "timestamp" })
    updatedAt: Date;

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;

    // --- columns ---

    @Column({
        type: "text",
        nullable: false,
        comment: "",
    })
    title: string;

    @Column({
        type: "text",
        nullable: false,
        comment: "",
    })
    message: string;

    @IsEnum(TablesNames)
    @Column({
        type: "enum",
        nullable: false,
        comment: "",
        enum: TablesNames,
        // default: NotificationChannels.DEFAULT_VALUE,
    })
    service: TablesNames;

    @Column({
        type: "boolean",
        nullable: true,
        default: false,
        comment: "",
    })
    isRead?: boolean;

    @Column({
        type: "boolean",
        nullable: true,
        default: false,
        comment: "",
    })
    important?: boolean;

    @IsEnum(NotificationChannels)
    @Column({
        type: "enum",
        nullable: false,
        comment: "",
        enum: NotificationChannels,
        // default: NotificationChannels.DEFAULT_VALUE,
    })
    channel: NotificationChannels;

    // --- relations ---
    @ManyToOne(() => User, (user) => user.notifications, {
        cascade: true,
        onDelete: "CASCADE",
    })
    @JoinColumn()
    user: User;
}
