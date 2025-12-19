export interface FileObject {
    file: Express.Multer.File;
    filePath: string;
    fileName: string;
}

export interface UploadedFileMeta {
    key: string;
    name: string;
    mimeType: string;
}

export interface FilesDataObject {
    name: string;
}
