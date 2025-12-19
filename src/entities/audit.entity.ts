import { AuditAction } from "src/enums/audit.enum";
import {
    Column,
    CreateDateColumn,
    Entity,
    Index,
    PrimaryGeneratedColumn,
} from "typeorm";

export type ActorType = "user" | "service";
export type SourceType = "api" | "job" | "webhook" | "cli";

@Entity("audit_events")
export class AuditEvent {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @CreateDateColumn()
    @Index()
    createdAt!: Date;

    @Index()
    @Column({ type: "varchar", length: 64, nullable: true })
    actorId?: string;

    @Column({ type: "varchar", length: 16, nullable: true })
    actorType?: ActorType;

    @Index()
    @Column({ type: "varchar", length: 64 })
    action!: AuditAction;

    @Index()
    @Column({ type: "varchar", length: 128, nullable: true })
    resourceType?: string;

    @Index()
    @Column({ type: "varchar", length: 128, nullable: true })
    resourceId?: string;

    @Column({ type: "boolean", default: true })
    success!: boolean;

    @Column({ type: "int", nullable: true })
    statusCode?: number;

    @Column({ type: "varchar", length: 1024, nullable: true })
    errorMessage?: string;

    @Column({ type: "varchar", length: 128, nullable: true })
    requestId?: string;

    @Column({ type: "varchar", length: 128, nullable: true })
    sessionId?: string;

    @Column({ type: "varchar", length: 64, nullable: true })
    ip?: string;

    @Column({ type: "varchar", length: 256, nullable: true })
    userAgent?: string;

    @Column({ type: "varchar", length: 8, nullable: true })
    method?: string;

    @Index()
    @Column({ type: "varchar", length: 512, nullable: true })
    path?: string;

    @Column({ type: "varchar", length: 16, nullable: true })
    source?: SourceType;

    @Column({ type: "jsonb", nullable: true })
    before?: Record<string, any>;

    @Column({ type: "jsonb", nullable: true })
    after?: Record<string, any>;

    @Column({ type: "jsonb", nullable: true })
    diff?: any;
}
