import Elysia from "elysia";
import { files } from "../schema";
import { FileService } from "../services/fileService";

type NewFile = typeof files.$inferInsert;

export const FileController = (app: Elysia) =>
  app
    .get("/v1/files", async ({ query }) =>
      FileService.getFilesByFolderId(Number(query.folderId || 0))
    )
    .post("/v1/files", async ({ body }) =>
      FileService.createFile(body as NewFile)
    );
