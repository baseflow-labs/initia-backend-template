import { IsEnum, IsUUID } from "class-validator";
import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";

import { TablesNames } from "src/enums/tables.enum";

@Entity()
export class File {
    // --- base columns ---
    @PrimaryGeneratedColumn("uuid")
    @IsUUID()
    id: string;

    @UpdateDateColumn({ type: "timestamp" })
    updatedAt: Date;

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;

    // --- columns ---

    @IsEnum(TablesNames)
    @Column({
        type: "enum",
        nullable: false,
        comment: "",
        enum: TablesNames,
    })
    tableName: TablesNames;

    @Column({
        type: "text",
        nullable: false,
        comment: "",
    })
    propName: string;

    @Column({
        type: "text",
        nullable: false,
        comment: "",
    })
    rowId: string;

    @Column({
        type: "text",
        nullable: false,
        comment: "",
    })
    filePath: string;

    // --- relations ---
}
