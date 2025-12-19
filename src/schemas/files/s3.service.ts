import {
    DeleteObjectsCommand,
    GetObjectCommand,
    PutObjectCommand,
    S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Injectable, Logger } from "@nestjs/common";
import { CustomResponseType, FileObject, UploadedFileMeta } from "src/types";
import { Readable } from "stream";

@Injectable()
export class S3Service {
    private s3: S3Client;
    private readonly bucketName: string = process.env.S3_BUCKET_NAME!;
    private readonly logger = new Logger(S3Service.name);

    constructor() {
        this.s3 = new S3Client({
            region: process.env.AWS_REGION,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY!,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
            },
        });
    }

    async getFile(key: string): Promise<Readable> {
        const command = new GetObjectCommand({
            Bucket: this.bucketName,
            Key: key,
        });

        const { Body } = await this.s3.send(command);
        return Body as Readable;
    }

    async getFileURL(
        key: string,
        expiresInSeconds = 3600
    ): Promise<CustomResponseType<string>> {
        try {
            const command = new GetObjectCommand({
                Bucket: this.bucketName,
                Key: key,
            });

            const url = await getSignedUrl(this.s3, command, {
                expiresIn: expiresInSeconds,
            });

            return {
                status: 200,
                message: "Presigned URL generated",
                payload: url,
            };
        } catch (error) {
            this.logger.error("Error generating presigned URL", error);
            return {
                status: 500,
                message: "Error generating presigned URL",
                payload: "",
            };
        }
    }

    async bulkUploadFiles({
        files,
    }: {
        files: FileObject[];
    }): Promise<UploadedFileMeta[]> {
        const uploaded: UploadedFileMeta[] = [];

        for (const { file, filePath, fileName } of files) {
            const key = `${filePath}/${fileName}`;

            await this.s3.send(
                new PutObjectCommand({
                    Bucket: this.bucketName,
                    Key: key,
                    Body: file.buffer,
                    ContentType: file.mimetype,
                })
            );

            uploaded.push({
                key,
                name: file.originalname,
                mimeType: file.mimetype,
            });
        }

        return uploaded;
    }

    async bulkDeleteFiles({
        files,
    }: {
        files: { filePath: string; fileName: string }[];
    }): Promise<void> {
        if (!files.length) return;

        const keys = files.map(({ filePath, fileName }) => {
            const cleanFilePath = filePath
                .replace(/^\/+/, "")
                .replace(/\/+$/, "");
            const cleanFileName = fileName.replace(/^\/+/, "");
            return { Key: `${cleanFilePath}/${cleanFileName}` };
        });

        try {
            const result = await this.s3.send(
                new DeleteObjectsCommand({
                    Bucket: this.bucketName,
                    Delete: {
                        Objects: keys,
                        Quiet: false,
                    },
                })
            );
        } catch (error) {
            throw error;
        }
    }
}
