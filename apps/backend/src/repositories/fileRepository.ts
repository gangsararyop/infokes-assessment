import { eq } from "drizzle-orm";
import { db } from "../db";
import { files } from "../schema";

type NewFile = typeof files.$inferInsert;

export const FileRepository = {
  findAllByFolderId: async (folderId: number) => {
    return db.select().from(files).where(eq(files.folderId, folderId));
  },

  create: async (file: NewFile) => {
    return db.insert(files).values(file);
  },
};
