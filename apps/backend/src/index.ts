import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { FolderController } from "./controllers/folderController";
import { FileController } from "./controllers/fileController";

const app = new Elysia();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(FolderController);
app.use(FileController);

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
