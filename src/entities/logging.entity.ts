import {
    Column,
    CreateDateColumn,
    Entity,
    Index,
    PrimaryGeneratedColumn,
} from "typeorm";

export type LogLevel = "warn" | "error";

@Entity("logging")
export class Log {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Index()
    @Column({ type: "varchar", length: 10 })
    level!: LogLevel;

    @Column({ type: "varchar", length: 2000 })
    message!: string;

    @Column({ type: "varchar", length: 255, nullable: true })
    context?: string; // Nest context or class name

    @Column({ type: "text", nullable: true })
    stack?: string;

    @Column({ type: "jsonb", nullable: true })
    meta?: Record<string, any>; // requestId, userId, path, method, statusCode, etc.

    @CreateDateColumn()
    createdAt!: Date;
}
