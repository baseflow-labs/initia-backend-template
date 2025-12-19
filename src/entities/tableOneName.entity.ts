import {
    Entity,
    Column,
    CreateDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { IsNotEmpty, MaxLength, IsUUID } from "class-validator";

@Entity()
export class TableOneName {
    // --- base columns ---
    @PrimaryGeneratedColumn("uuid")
    @IsUUID()
    id: string;

    @UpdateDateColumn({ type: "timestamp" })
    updatedAt: Date;

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;

    // --- columns ---
    @IsNotEmpty()
    @MaxLength(25)
    @Column({
        type: "text",
        nullable: false,
    })
    propertyOneName: string;

    // --- relations ---
}
