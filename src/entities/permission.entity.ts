import { Role } from "./role.entity";
import { PermissionAction } from "../enums/permissions.enum";
import { TablesNames } from "../enums/tables.enum";
import {
    Entity,
    Column,
    CreateDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    ManyToOne,
} from "typeorm";
import { IsUUID, IsEnum, Length } from "class-validator";

@Entity()
export class Permission {
    // --- base columns ---
    @PrimaryGeneratedColumn("uuid")
    @IsUUID()
    id: string;

    @UpdateDateColumn({ type: "timestamp" })
    updatedAt: Date;

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;

    // --- columns ---

    @IsEnum(PermissionAction)
    @Column({
        type: "enum",
        enum: PermissionAction,
        nullable: false,
    })
    action: PermissionAction;

    @IsEnum(TablesNames)
    @Column({
        type: "enum",
        enum: TablesNames,
        nullable: false,
    })
    table: TablesNames;

    @Length(3, 25)
    @Column({
        nullable: true,
    })
    description: string;

    // --- relations ---

    @ManyToOne(() => Role, (role) => role.permissions)
    role: Role;
}
