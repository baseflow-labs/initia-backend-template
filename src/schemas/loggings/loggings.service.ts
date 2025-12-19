import { GetLoggingQueryDto } from "@/dto/loggings/getLogging.dto";
import { Log } from "@/entities";
import { LogLevel } from "@/entities/logging.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Brackets, Repository } from "typeorm";

const MAX_PAGE_SIZE = 200;

@Injectable()
export class LoggingService {
    constructor(@InjectRepository(Log) private repo: Repository<Log>) {}

    async write(params: {
        level: LogLevel;
        message: string;
        context?: string;
        stack?: string;
        meta?: Record<string, any>;
    }) {
        // Tip: swallow errors to avoid recursive logging loops
        try {
            const entry = this.repo.create(params);
            await this.repo.save(entry);
        } catch {
            /* no-op */
        }
    }

    async findMany(q: GetLoggingQueryDto) {
        const page = Math.max(1, q.page ?? 1);
        const pageSize = Math.min(MAX_PAGE_SIZE, Math.max(1, q.pageSize ?? 25));

        const qb = this.repo.createQueryBuilder("l");

        if (q.level) qb.andWhere("l.level = :level", { level: q.level });
        if (q.context)
            qb.andWhere("l.context ILIKE :ctx", { ctx: `%${q.context}%` });
        if (q.q) {
            qb.andWhere(
                new Brackets((b) =>
                    b
                        .where("l.message ILIKE :qq", { qq: `%${q.q}%` })
                        .orWhere("l.stack ILIKE :qq", { qq: `%${q.q}%` })
                )
            );
        }
        if (q.since) qb.andWhere("l.createdAt >= :since", { since: q.since });
        if (q.until) qb.andWhere("l.createdAt <= :until", { until: q.until });

        qb.orderBy(`l.${q.sortBy}`, q.order)
            .skip((page - 1) * pageSize)
            .take(pageSize);

        const [items, total] = await qb.getManyAndCount();
        return {
            items,
            total,
            page,
            pageSize,
            totalPages: Math.ceil(total / pageSize),
        };
    }

    async findOneById(id: string) {
        return this.repo.findOne({ where: { id } });
    }
}
