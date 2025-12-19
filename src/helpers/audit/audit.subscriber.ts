import { Injectable } from "@nestjs/common";
import { ClsService } from "nestjs-cls";
import { AuditAction } from "src/enums/audit.enum";
import { AuditService } from "src/schemas/audits/audit.service";
import {
    EntitySubscriberInterface,
    EventSubscriber,
    InsertEvent,
    RemoveEvent,
    UpdateEvent,
} from "typeorm";

const SKIP_TABLES = new Set<string>(["audit_events", "app_logs"]); // extend as needed

@EventSubscriber()
@Injectable()
export class AuditSubscriber implements EntitySubscriberInterface {
    constructor(
        private readonly audit: AuditService,
        private readonly cls: ClsService
    ) {}

    listenTo() {
        return Object;
    } // all entities

    private base() {
        return {
            actorId: this.cls.get<string>("actorId"),
            actorType: ((): "user" | "service" | undefined => {
                const v = this.cls.get("actorType");
                return v === "user" || v === "service" ? v : undefined;
            })(),
            requestId: this.cls.get<string>("requestId"),
            sessionId: this.cls.get<string>("sessionId"),
            ip: this.cls.get<string>("ip"),
            userAgent: this.cls.get<string>("userAgent"),
            method: this.cls.get<string>("method"),
            path: this.cls.get<string>("path"),
            source: ((): any => this.cls.get("source"))(),
        };
    }

    private isSkippable(table?: string) {
        return table && SKIP_TABLES.has(table);
    }
    private safeClone<T>(o: T): T {
        try {
            return JSON.parse(JSON.stringify(o));
        } catch {
            return o as any;
        }
    }
    private idOf(ev: InsertEvent<any> | UpdateEvent<any> | RemoveEvent<any>) {
        const cols = ev.metadata.primaryColumns;
        const src: any =
            (ev as any).entity ??
            (ev as any).databaseEntity ??
            (ev as any).entityId;
        if (!cols?.length || !src) return undefined;
        if (cols.length === 1) return src[cols[0].propertyName];
        return cols.map((c) => src[c.propertyName]).join(":");
    }

    async afterInsert(ev: InsertEvent<any>) {
        if (this.isSkippable(ev.metadata.tableName)) return;

        await this.audit.logChange({
            action: AuditAction.CREATE,
            resourceType: ev.metadata.name,
            resourceId: this.idOf(ev),
            before: null,
            after: ev.entity ? this.safeClone(ev.entity) : undefined,
            success: true,
            statusCode: 201,
            ...this.base(),
        });
    }

    async afterUpdate(ev: UpdateEvent<any>) {
        if (this.isSkippable(ev.metadata.tableName)) return;
        await this.audit.logChange({
            action: AuditAction.UPDATE,
            resourceType: ev.metadata.name,
            resourceId: this.idOf(ev),
            before: ev.databaseEntity
                ? this.safeClone(ev.databaseEntity)
                : undefined,
            after: ev.entity ? this.safeClone(ev.entity) : undefined,
            success: true,
            statusCode: 200,
            ...this.base(),
        });
    }

    async afterRemove(ev: RemoveEvent<any>) {
        if (this.isSkippable(ev.metadata.tableName)) return;
        await this.audit.logChange({
            action: AuditAction.DELETE,
            resourceType: ev.metadata.name,
            resourceId: this.idOf(ev),
            before: ev.databaseEntity
                ? this.safeClone(ev.databaseEntity)
                : undefined,
            after: null,
            success: true,
            statusCode: 200,
            ...this.base(),
        });
    }
}
