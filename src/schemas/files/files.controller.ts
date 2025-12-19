import {
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Res,
    UploadedFile,
    UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import type { Response } from "express";
import { TablesNames } from "src/enums/tables.enum";

import { FilesService } from "./files.service";

@Controller("file")
export class FilesController {
    constructor(private readonly filesService: FilesService) {}

    @Get("download/:filePath")
    async streamFile(
        @Param("filePath") filePath: string,
        @Res() res: Response
    ) {
        const result = await this.filesService.getFile(filePath);
        if (!result) {
            return res.status(400).json({ message: "File Not Found" });
        }
        res.setHeader("Content-Type", "application/octet-stream");
        res.setHeader("Content-Disposition", `inline; filename="file"`);
        res.send(result);
    }

    @Post("upload/:service")
    @UseInterceptors(FileInterceptor("file"))
    async uploadFile(
        @Param("service") service: TablesNames,
        @UploadedFile() file: Express.Multer.File
    ) {
        const fileRecord = await this.filesService.saveSingleFileAsOrphan(
            file,
            service
        );
        return { id: fileRecord.id, path: fileRecord.filePath };
    }

    @Delete("delete/:fileId")
    async deleteFile(@Param("fileId") fileId: string) {
        await this.filesService.deleteFileById(fileId);
        return { message: "Deleted" };
    }
}
