import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { MetadataService } from "./metadata.service";
import { MetadataController } from "./metadata.controller";
import { Metadata } from "src/entities/metadata.entity";
import { FilesModule } from "../files/files.module";

@Module({
    imports: [TypeOrmModule.forFeature([Metadata]), FilesModule],
    controllers: [MetadataController],
    providers: [MetadataService],
    exports: [MetadataService],
})
export class MetadataModule {}
