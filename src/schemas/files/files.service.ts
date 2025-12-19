import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { basename, dirname, extname, join } from "path";
import { File } from "src/entities";
import { TablesNames } from "src/enums/tables.enum";
import { createHandler } from "src/helpers";
import { errorRes, newInstanceRes } from "src/responses";
import { CustomResponseType } from "src/types";
import { Readable } from "stream";
import { LessThan, Repository } from "typeorm";

import { S3Service } from "./s3.service";

@Injectable()
export class FilesService {
    constructor(
        @InjectRepository(File)
        private readonly fileRepository: Repository<File>,
        private readonly s3Service: S3Service
    ) {}

    async getFile(filePath: string): Promise<Readable> {
        return await this.s3Service.getFile(filePath);
    }

    async getPresignedUrl(
        filePath: string
    ): Promise<CustomResponseType<string>> {
        const fileName = basename(filePath);
        const fileDir = dirname(filePath);
        return this.s3Service.getFileURL(`${filePath}/${fileName}`);
    }

    async createFileData(dto: Object): Promise<CustomResponseType<File>> {
        try {
            const response = await createHandler<File>({
                dto,
                repository: this.fileRepository,
            });

            return newInstanceRes<File>(
                "File data has been created successfully",
                response
            );
        } catch (error) {
            return errorRes(error.message);
        }
    }

    async attachFilePreviewsToRecord(
        record: any,
        tableName: TablesNames
    ): Promise<any> {
        const fileEntities = await this.fileRepository.find({
            where: { tableName, rowId: record.id },
        });
        for (const file of fileEntities.sort((a, b) =>
            a.createdAt > b.createdAt ? -1 : 1
        )) {
            const url = await this.getPresignedUrl(file.filePath);
            if (url.status === 200) {
                if (!record[file.propName]) record[file.propName] = [];
                record[file.propName].push({
                    id: file.id,
                    path: file.filePath,
                    url: url.payload,
                });
            }
        }
        return record;
    }

    async attachFilePreviewsToRecords(
        records: any[],
        tableName: TablesNames
    ): Promise<any[]> {
        for (const record of records.filter((record) => record?.id)) {
            await this.attachFilePreviewsToRecord(record, tableName);
        }
        return records;
    }

    async saveSingleFileAsOrphan(
        file: Express.Multer.File,
        service = TablesNames.FILE
    ): Promise<File> {
        const timestamp = Date.now();
        const ext = extname(file.originalname);
        const cleanName = file.originalname.replace(ext, "").replace("[]", "");
        const fileName = `${cleanName}-${timestamp}${ext}`;
        const filePath = join("PROJECT_NAME", service).replaceAll("\\", "/");

        await this.s3Service.bulkUploadFiles({
            files: [{ file, filePath, fileName }],
        });

        const res = await this.createFileData({
            tableName: service,
            rowId: "orphan",
            propName: "temp",
            filePath: `/${filePath}/${fileName}`,
        });

        return res.payload;
    }

    async deleteFileById(fileId: string): Promise<void> {
        const file = await this.fileRepository.findOne({
            where: { id: fileId },
        });
        if (!file) return;

        await this.s3Service.bulkDeleteFiles({
            files: [
                {
                    filePath: dirname(file.filePath),
                    fileName: basename(file.filePath),
                },
            ],
        });

        await this.fileRepository.delete(fileId);
    }

    async linkFilesToRow({
        tableName,
        propName,
        rowId,
        fileIds,
    }: {
        tableName: TablesNames;
        propName: string;
        rowId: string;
        fileIds: string[];
    }): Promise<void> {
        await this.fileRepository.update(fileIds, {
            rowId,
            tableName,
            propName,
        });
    }

    async cleanupOrphanFiles(olderThanHours = 24): Promise<void> {
        const cutoffDate = new Date(Date.now() - olderThanHours * 3600 * 1000);
        const orphans = await this.fileRepository.find({
            where: {
                rowId: "orphan",
                updatedAt: LessThan(cutoffDate),
            },
        });

        for (const file of orphans) {
            await this.deleteFileById(file.id);
        }
    }
}
