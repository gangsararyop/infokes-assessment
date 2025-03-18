import Elysia from "elysia";
import { FolderService } from "../services/folderService";
import { folders } from "../schema";

type NewFolder = typeof folders.$inferInsert;

export const FolderController = (app: Elysia) =>
  app
    .get("/v1/folders", async () => FolderService.getFolders())
    .get("/v1/folders/:id", async ({ params }) =>
      FolderService.getFolder(Number(params.id || 0))
    )
    .post("/v1/folders", async ({ body }) =>
      FolderService.createFolder(body as NewFolder)
    );
