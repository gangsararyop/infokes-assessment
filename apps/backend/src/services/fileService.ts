import { FileRepository } from "../repositories/fileRepository";
import { files } from "../schema";

type newFile = typeof files.$inferInsert;

export const FileService = {
  getFilesByFolderId: async (folderId: number) => {
    return FileRepository.findAllByFolderId(Number(folderId || 0));
  },

  createFile: async (file: newFile) => {
    return FileRepository.create(file);
  },
};
