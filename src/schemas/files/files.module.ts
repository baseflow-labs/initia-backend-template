import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { File } from "src/entities";
import { FilesController } from "./files.controller";
import { FilesService } from "./files.service";
import { S3Service } from "./s3.service";

@Module({
    imports: [TypeOrmModule.forFeature([File])],
    providers: [FilesService, S3Service],
    controllers: [FilesController],
    exports: [FilesService],
})
export class FilesModule {}
