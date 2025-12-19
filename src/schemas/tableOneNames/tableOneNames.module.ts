import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { TableOneNamesService } from "./tableOneNames.service";
import { TableOneNamesController } from "./tableOneNames.controller";
import { TableOneName } from "@/entities";
import { FilesModule } from "@/schemas/files/files.module";

@Module({
    imports: [FilesModule, TypeOrmModule.forFeature([TableOneName])],
    controllers: [TableOneNamesController],
    providers: [TableOneNamesService],
    exports: [TableOneNamesService],
})
export class TableOneNamesModule {}
