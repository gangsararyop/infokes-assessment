import { eq } from "drizzle-orm";
import { db } from "../db";
import { files, folders } from "../schema";

type NewFolder = typeof folders.$inferInsert;

export const FolderRepository = {
  findAll: async () => {
    return db.select().from(folders);
  },

  findById: async (id: number) => {
    console.log("test", id);
    return db.select().from(folders).where(eq(folders.id, id));
  },

  findByParentId: async (parentId: number) => {
    return db.select().from(folders).where(eq(folders.parentId, parentId));
  },

  create: async (folder: NewFolder) => {
    return db.insert(folders).values(folder);
  },
};
