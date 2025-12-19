import { Type } from "class-transformer";
import { IsIn, IsOptional, IsString } from "class-validator";
import type { LogLevel } from "@/entities/logging.entity";

export const LOG_LEVELS: LogLevel[] = ["warn", "error"];

export class GetLoggingQueryDto {
    @IsOptional()
    @IsIn(LOG_LEVELS)
    level?: LogLevel;

    @IsOptional()
    @IsString()
    q?: string; // search message/stack

    @IsOptional()
    @IsString()
    context?: string; // class/context name

    @IsOptional()
    @IsString()
    since?: string; // ISO date string

    @IsOptional()
    @IsString()
    until?: string; // ISO date string

    @Type(() => Number)
    @IsOptional()
    page: number = 1;

    @Type(() => Number)
    @IsOptional()
    pageSize: number = 25; // cap in service

    @IsOptional()
    @IsIn(["createdAt", "level"])
    sortBy: "createdAt" | "level" = "createdAt";

    @IsOptional()
    @IsIn(["ASC", "DESC"])
    order: "ASC" | "DESC" = "DESC";
}
