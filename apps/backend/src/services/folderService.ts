import { FolderRepository } from "../repositories/folderRepository";
import { folders } from "../schema";

type NewFolder = typeof folders.$inferInsert;

export const FolderService = {
  formattedFolder: (
    folders: { id: number; name: string; parentId: number | null }[]
  ) => {
    const folderMap = new Map<number, any>();

    folders.forEach((folder) => {
      folderMap.set(folder.id, { ...folder, folders: [] });
    });

    let rootFolders: any[] = [];

    folders.forEach((folder) => {
      if (folder.parentId === null) {
        rootFolders.push(folderMap.get(folder.id));
      } else {
        const parentFolder = folderMap.get(folder.parentId);
        if (parentFolder) {
          parentFolder.folders.push(folderMap.get(folder.id));
        }
      }
    });

    return rootFolders;
  },

  getFolders: async () => {
    const folders = await FolderRepository.findAll();

    return FolderService.formattedFolder(folders);
  },

  getFolder: async (id: number) => {
    const folder = await FolderRepository.findById(id);

    const singleFolder = folder[0];

    const foldersByParentId = await FolderRepository.findByParentId(
      singleFolder.id
    );

    return { ...singleFolder, folders: foldersByParentId };
  },

  createFolder: async (folder: NewFolder) => {
    return FolderRepository.create(folder);
  },
};
