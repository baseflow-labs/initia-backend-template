import { IsOptional } from "class-validator";
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { User } from "../user.entity";

@Entity("app_evaluations")
export class AppEvaluation {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @UpdateDateColumn({ type: "timestamptz" })
    updatedAt: Date;

    @CreateDateColumn({ type: "timestamptz" })
    createdAt: Date;

    @Column({ type: "int", nullable: false })
    ui: number;

    @Column({ type: "int", nullable: false })
    comprehensiveness: number;

    @Column({ type: "int", nullable: false })
    performance: number;

    @Column({ type: "int", nullable: false })
    dataAccuracy: number;

    @Column({ type: "int", nullable: false })
    overall: number;

    @IsOptional()
    @Column({ type: "text", nullable: true })
    notes?: string;

    @ManyToOne(() => User, (user) => user.appEvaluations, {
        cascade: true,
        onDelete: "CASCADE",
    })
    @JoinColumn()
    user: User;
}
