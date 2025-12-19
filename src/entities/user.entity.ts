import { UserRole } from "../enums/userRole.enum";

import {
    Entity,
    Column,
    CreateDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    OneToMany,
} from "typeorm";
import {
    IsAlphanumeric,
    NotContains,
    IsNotEmpty,
    MinLength,
    MaxLength,
    IsUUID,
    IsEmail,
    IsEnum,
    Matches,
    Length,
} from "class-validator";

import { Notification } from "./notification.entity";

import { AppEvaluation } from "./support/appEvaluation.entity";
import { SupportTicket } from "./support/supportTicket.entity";

@Entity()
export class User {
    // --- base columns ---
    @PrimaryGeneratedColumn("uuid")
    @IsUUID()
    id: string;

    @UpdateDateColumn({ type: "timestamp" })
    updatedAt: Date;

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;

    // --- columns ---

    @IsEmail()
    @Column({
        unique: true,
        nullable: false,
    })
    email: string;

    @Length(8, 25)
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)
    @Column({
        nullable: false,
    })
    password: string;

    @IsEnum(UserRole)
    @Column({
        type: "enum",
        enum: UserRole,
        nullable: true,
        default: UserRole.CUSTOMER,
    })
    role: UserRole;

    @Column({
        nullable: true,
        default: "",
    })
    token?: string;

    @IsAlphanumeric()
    @NotContains(" ")
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(25)
    @Column({
        type: "text",
        nullable: false,
        comment: "username must have length between (5, 25) characters",
        unique: true,
    })
    username: string;

    // --- relations ---

    @OneToMany(() => SupportTicket, (supportTicket) => supportTicket.user, {
        onDelete: "CASCADE",
    })
    supportTickets: SupportTicket[];

    @OneToMany(() => AppEvaluation, (appEvaluation) => appEvaluation.user, {
        onDelete: "CASCADE",
    })
    appEvaluations: AppEvaluation[];

    @OneToMany(() => Notification, (notification) => notification.user, {
        onDelete: "CASCADE",
    })
    notifications?: Notification[];
}
