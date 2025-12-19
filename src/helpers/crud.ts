import { NotFoundException, UnauthorizedException } from "@nestjs/common";
import { FindManyOptions, Repository, UpdateResult } from "typeorm";

import { UserRole } from "../enums/userRole.enum";
import { deletedRes, errorRes, foundRes, notFoundRes } from "../responses";
import { FullTokenPayload } from "../types";
import { TablesNames } from "src/enums/tables.enum";

export async function getAllHandler<T>({
    query,
    repository,
    table,
    blacklist,
    fileService,
}: {
    query: FindManyOptions;
    repository: Repository<any>;
    table: string;
    blacklist?: string[];
    fileService?: {
        attachFilePreviewsToRecords: (
            records: any[],
            tableName: TablesNames
        ) => Promise<any[]>;
    };
}) {
    try {
        const [response, total] = await repository.findAndCount(query);

        let filteredRecords: T[] = response;

        if (blacklist && blacklist?.length > 0) {
            filteredRecords = response.map((record) => {
                blacklist.forEach((item) => {
                    delete record[item];
                });
                return record;
            });
        }

        // attach file previews if service provided
        if (fileService) {
            filteredRecords = await fileService.attachFilePreviewsToRecords(
                filteredRecords,
                table as any
            );
        }

        // Extract pagination info
        const page =
            query.skip && query.take
                ? Math.floor(query.skip / query.take) + 1
                : 1;
        const capacity = query.take || total;
        const pagesCount = Math.ceil(total / capacity);

        return foundRes(
            filteredRecords?.length
                ? `${table} have been found`
                : `${table} list is empty`,
            filteredRecords,
            total,
            page,
            capacity,
            pagesCount
        );
    } catch (error) {
        return errorRes(error);
    }
}

export async function getByIdHandler<T>({
    id,
    repository,
    table,
    fileService,
}: {
    id: string;
    repository: Repository<any>;
    table: TablesNames;
    fileService?: {
        attachFilePreviewsToRecord: (
            record: any,
            tableName: TablesNames
        ) => Promise<any>;
    };
}) {
    try {
        let response = (await repository.findOneBy({ id } as any)) as T | null;

        if (!response) {
            return notFoundRes(`${table} does not exist`);
        }

        // attach file previews if service provided
        if (fileService) {
            response = (await fileService.attachFilePreviewsToRecord(
                response,
                table
            )) as T;
        }

        return foundRes(`${table} has been found`, response);
    } catch (error) {
        return errorRes(error.message);
    }
}

export async function createHandler<T>({
    dto,
    repository,
    foreigners = [],
    blacklist = [],
}: {
    dto: any;
    repository: Repository<any>;
    blacklist?: string[];
    foreigners?: {
        key: string;
        repository: Repository<any>;
        blacklist?: string[];
    }[];
}): Promise<T> {
    const finalObj = structuredClone(dto);

    await Promise.all(
        foreigners.map(
            async ({
                key,
                repository: foreignRepository,
                blacklist: foreignBlacklist,
            }) => {
                const foreignId = finalObj[key];
                delete finalObj[key];

                if (foreignId) {
                    const foreignRecord = await foreignRepository.findOneBy({
                        id: foreignId,
                    } as any);

                    if (!foreignRecord) {
                        return notFoundRes(`${key} doesn't exist`);
                    }

                    if (foreignBlacklist && foreignBlacklist.length > 0) {
                        foreignBlacklist.forEach((item) => {
                            delete foreignRecord[item];
                        });
                    }

                    finalObj[key] = foreignRecord;
                }
            }
        )
    );

    const newRecord = repository.create(finalObj);
    await repository.save(newRecord);

    if (blacklist.length > 0) {
        blacklist.forEach((item) => {
            delete newRecord[item];
        });
    }

    return newRecord;
}

export async function updateHandler<T>({
    id,
    dto,
    table,
    repository,
    foreigners = [],
    blacklist = [],
}: {
    id: string;
    dto: any;
    table: TablesNames;
    repository: Repository<any>;
    blacklist?: string[];
    // provide the names of the fields for the tables related to this
    // table to check if the related record exist or not
    foreigners?: {
        key: string;
        repository: Repository<any>;
        blacklist?: string[];
    }[];
}): Promise<UpdateResult & { newRecord: T }> {
    const record = (await repository.findOneBy({ id } as any)) as T;
    if (!record) {
        throw new NotFoundException(`${table} does not exist`);
    }

    const newRecord = structuredClone(dto);

    await Promise.all(
        foreigners.map(
            async ({
                key,
                repository: foreignRepository,
                blacklist: foreignBlacklist,
            }) => {
                const foreignId = newRecord[key];
                delete newRecord[key];

                if (foreignId) {
                    const foreignRecord = await foreignRepository.findOneBy({
                        id: foreignId,
                    } as any);

                    if (!foreignRecord) {
                        return notFoundRes(`${key} doesn't exist`);
                    }

                    if (foreignBlacklist && foreignBlacklist.length > 0) {
                        foreignBlacklist.forEach((item) => {
                            delete foreignRecord[item];
                        });
                    }

                    newRecord[key] = foreignRecord;
                }
            }
        )
    );

    if (blacklist.length > 0) {
        blacklist.forEach((item) => {
            delete newRecord[item];
        });
    }

    const response = await repository.update(
        {
            id,
        } as any,
        newRecord
    );

    return {
        ...response,
        newRecord: { ...newRecord, id },
    };
}

export async function upsertHandler<T>({
    lookupPropName,
    dto,
    repository,
    foreigners = [],
    blacklist = [],
}: {
    dto: any;
    repository: Repository<any>;
    lookupPropName: string;
    blacklist?: string[];
    foreigners?: {
        key: string;
        repository: Repository<any>;
        blacklist?: string[];
    }[];
}): Promise<T> {
    const finalObj = structuredClone(dto);

    await Promise.all(
        foreigners.map(
            async ({
                key,
                repository: foreignRepository,
                blacklist: foreignBlacklist,
            }) => {
                const foreignId = finalObj[key];
                delete finalObj[key];

                if (foreignId) {
                    const foreignRecord = await foreignRepository.findOneBy({
                        id: foreignId,
                    } as any);

                    if (!foreignRecord) {
                        return notFoundRes(`${key} doesn't exist`);
                    }

                    if (foreignBlacklist?.length) {
                        foreignBlacklist.forEach(
                            (item) => delete foreignRecord[item]
                        );
                    }

                    finalObj[key] = foreignRecord;
                }
            }
        )
    );

    const lookupValue = dto[lookupPropName];
    let existingRecord: T | null = null;

    if (lookupValue !== undefined) {
        existingRecord = await repository.findOneBy({
            [lookupPropName]: lookupValue,
        } as any);
    }

    let record: T;

    if (existingRecord) {
        Object.assign(existingRecord, finalObj);
        record = await repository.save(existingRecord);
    } else {
        record = await repository.save(repository.create(finalObj));
    }

    blacklist.forEach((key) => {
        delete record[key];
    });

    return record;
}

export async function deleteHandler<T>({
    id,
    wipe,
    repository,
    table,
    userTokenData,
}: {
    id: string | undefined;
    wipe: boolean | undefined;
    repository: Repository<any>;
    table: string;
    userTokenData: Partial<FullTokenPayload> | null;
}) {
    try {
        let record: any = {};

        // prevent non-admins from wiping data
        if (userTokenData?.role !== UserRole.ADMIN && wipe) {
            throw new UnauthorizedException(
                "Unauthorized, only admins can truncate tables"
            );
        }

        // check if the record ID is defined
        if (!id) throw new NotFoundException("Record ID is not defined");

        // check if the record exist
        record = (await repository.findOneBy({ id } as any)) as T;
        if (!record) {
            throw new NotFoundException(`${table} does not exist`);
        }

        // either delete a single record or truncate the whole table if specified
        const response = wipe
            ? await repository.query(
                  `TRUNCATE TABLE "${table.toLowerCase()}" CASCADE;`
              )
            : await repository.delete(id);

        return deletedRes<T>(
            wipe
                ? `Table "${table}" has been truncated`
                : `${table} has been deleted successfully`,
            response,
            record
        );
    } catch (error) {
        return errorRes(error.message);
    }
}
