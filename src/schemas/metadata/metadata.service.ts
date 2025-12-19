import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { metadataFileFields, UpdateMetadataDto } from "@/dto";
import { Metadata } from "@/entities";
import { TablesNames } from "@/enums";
import { getByIdHandler, updateHandler } from "@/helpers";
import { errorRes, updatedRes } from "@/responses";
import { CustomResponseType } from "@/types";
import { Repository, UpdateResult } from "typeorm";

import { FilesService } from "../files/files.service";

@Injectable()
export class MetadataService {
    constructor(
        // ----- external services -----
        private readonly filesService: FilesService,
        // ----- base services -----
        @InjectRepository(Metadata)
        private readonly metadataRepository: Repository<Metadata>
    ) {}

    // --- Basic CRUD APIs ---

    async getMetadataById(): Promise<CustomResponseType<Metadata>> {
        const resp = await getByIdHandler<Metadata>({
            id: "1",
            repository: this.metadataRepository,
            table: TablesNames.METADATA,
        });

        const withFile = await this.filesService.attachFilePreviewsToRecord(
            resp.payload,
            TablesNames.METADATA
        );

        return { ...resp, payload: withFile };
    }

    async updateMetadata(
        updateMetadataDto: UpdateMetadataDto
    ): Promise<CustomResponseType<UpdateResult & { newRecord: Metadata }>> {
        try {
            const response = await updateHandler<Metadata>({
                id: "1",
                dto: Object.keys(updateMetadataDto)
                    .filter(
                        (key) =>
                            !metadataFileFields
                                .map(({ name }) => name)
                                .includes(key)
                    )
                    ?.reduce(
                        (final, key) => ({
                            ...final,
                            [key]: updateMetadataDto[key],
                        }),
                        {}
                    ),
                table: TablesNames.METADATA,
                repository: this.metadataRepository,
            });

            for (const fileField of metadataFileFields) {
                if (updateMetadataDto[fileField.name]) {
                    await this.filesService.linkFilesToRow({
                        tableName: TablesNames.FILE,
                        propName: fileField.name,
                        rowId: "1",
                        fileIds: updateMetadataDto[fileField.name]
                            .filter(({ id }) => id)
                            .map(({ id }) => id),
                    });
                }
            }

            return updatedRes<UpdateResult & { newRecord: Metadata }>(
                "Metadata has been updated successfully",
                response
            );
        } catch (error) {
            return errorRes(error.message);
        }
    }
}
