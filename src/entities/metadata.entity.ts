import { IsNotEmpty, IsOptional } from "class-validator";
import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryColumn,
    UpdateDateColumn,
} from "typeorm";

@Entity()
export class Metadata {
    // --- base columns ---
    @PrimaryColumn()
    id: number;

    @UpdateDateColumn({ type: "timestamp" })
    updatedAt: Date;

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;

    // --- columns ---

    @IsNotEmpty()
    @Column({
        type: "text",
        nullable: false,
        comment: "",
    })
    name: string;

    @IsNotEmpty()
    @Column({
        type: "text",
        nullable: false,
        comment: "",
    })
    logo: string;

    @IsNotEmpty()
    @Column({
        type: "text",
        nullable: true,
        comment: "",
    })
    phoneNumber?: string;

    @IsOptional()
    @Column({
        type: "text",
        nullable: true,
        comment: "",
    })
    slogan?: string;

    // --- relations ---
}
