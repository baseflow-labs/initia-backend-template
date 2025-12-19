import { Controller, Get, Param, Query } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AuditEvent } from "src/entities/audit.entity";
import { Brackets, Repository } from "typeorm";

@Controller("audit")
export class AuditController {
    constructor(
        @InjectRepository(AuditEvent) private repo: Repository<AuditEvent>
    ) {}

    @Get()
    async list(
        @Query("actorId") actorId?: string,
        @Query("resourceType") resourceType?: string,
        @Query("resourceId") resourceId?: string,
        @Query("action") action?: string,
        @Query("success") success?: "true" | "false",
        @Query("since") since?: string,
        @Query("until") until?: string,
        @Query("q") q?: string,
        @Query("page") page = "1",
        @Query("pageSize") pageSize = "25"
    ) {
        const p = Math.max(1, +page);
        const s = Math.min(200, Math.max(1, +pageSize));
        const qb = this.repo.createQueryBuilder("e");

        if (actorId) qb.andWhere("e.actorId = :actorId", { actorId });
        if (resourceType)
            qb.andWhere("e.resourceType = :rt", { rt: resourceType });
        if (resourceId) qb.andWhere("e.resourceId = :rid", { rid: resourceId });
        if (action) qb.andWhere("e.action = :action", { action });
        if (success) qb.andWhere("e.success = :s", { s: success === "true" });
        if (since) qb.andWhere("e.createdAt >= :since", { since });
        if (until) qb.andWhere("e.createdAt <= :until", { until });
        if (q)
            qb.andWhere(
                new Brackets((b) =>
                    b
                        .where("e.path ILIKE :q", { q: `%${q}%` })
                        .orWhere("e.userAgent ILIKE :q", { q: `%${q}%` })
                )
            );

        qb.orderBy("e.createdAt", "DESC")
            .skip((p - 1) * s)
            .take(s);
        const [items, total] = await qb.getManyAndCount();
        return {
            items,
            total,
            page: p,
            pageSize: s,
            totalPages: Math.ceil(total / s),
        };
    }

    @Get(":id")
    async byId(@Param("id") id: string) {
        return this.repo.findOne({ where: { id } });
    }
}
