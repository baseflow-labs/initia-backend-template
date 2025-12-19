import { Body, Get, Put, Res } from "@nestjs/common";
import type { Response } from "express";
import { RELATIONS_OBJECT } from "@/constants";
import { ControllerWrapper, GetAllByQuery } from "@/decorators";
import { metadataFileFields, UpdateMetadataDto } from "@/dto";
import { Metadata } from "@/entities";
import { MetadataFields, TablesNames } from "@/enums";
import { POST_PATCH_Pipe } from "@/pipes";
import { CustomResponseType } from "@/types";
import { UpdateResult } from "typeorm";
import { FilesService } from "../files/files.service";
import { MetadataService } from "./metadata.service";

@ControllerWrapper("metadata")
export class MetadataController {
    constructor(
        private readonly metadataService: MetadataService,
        private readonly fileService: FilesService
    ) {}

    // --- Basic CRUD endpoints ---

    @Get()
    @GetAllByQuery({
        fieldsEnum: MetadataFields,
        descendants: RELATIONS_OBJECT.metadata.descendants,
    })
    async getMetadata(@Res() res: Response) {
        const response: CustomResponseType<Metadata> =
            await this.metadataService.getMetadataById();
        return res.status(response.status).json(response);
    }

    @Put()
    // @EditorsWrapper(UpdateMetadataDto, "update a metadata")
    async updateMetadata(
        @Body(new POST_PATCH_Pipe(TablesNames.METADATA))
        updateMetadataDto: UpdateMetadataDto,
        @Res() res: Response
    ) {
        const response: CustomResponseType<UpdateResult> =
            await this.metadataService.updateMetadata(
                Object.keys(updateMetadataDto)
                    .filter(
                        (key) =>
                            !metadataFileFields
                                .map(({ name }) => name)
                                .includes(key)
                    )
                    ?.reduce(
                        (final: any, key) => ({
                            ...final,
                            [key]: updateMetadataDto[key],
                        }),
                        {}
                    )
            );

        for (const fileField of metadataFileFields) {
            if (updateMetadataDto[fileField.name]) {
                await this.fileService.linkFilesToRow({
                    tableName: TablesNames.METADATA,
                    propName: fileField.name,
                    rowId: "1",
                    fileIds: updateMetadataDto[fileField.name].map(
                        ({ id }) => id
                    ),
                });
            }
        }

        return res.status(response.status).json(response);
    }
}
