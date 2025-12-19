import { FilesDataObject } from "src/types/files";

export const getCleanDto = (
    currentDto: object,
    fileFields: FilesDataObject[]
) =>
    fileFields.length
        ? Object.keys(currentDto)
              .filter(
                  (key) => !fileFields.map(({ name }) => name).includes(key)
              )
              ?.reduce(
                  (final: any, key) => ({
                      ...final,
                      [key]: currentDto[key],
                  }),
                  {}
              )
        : currentDto;

export const linkUploadedFilesToRecord = async (
    response: { id: string },
    fileFields: FilesDataObject[],
    service: string,
    dto: { [key: string]: any },
    fileService: any
) => {
    if (fileFields.length) {
        for (const fileField of fileFields) {
            await fileService.linkFilesToRow({
                tableName: service,
                propName: fileField.name,
                rowId: response.id,
                fileIds: dto[fileField.name].map(({ id }) => id),
            });
        }
    }
};
