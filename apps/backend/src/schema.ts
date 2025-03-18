import { AnyPgColumn, integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const folders = pgTable("folders", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: varchar("name", { length: 255 }).notNull(),
  parentId: integer("parentId").references((): AnyPgColumn => folders.id, {
    onDelete: "cascade",
  }),
});

export const files = pgTable("files", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: varchar("name", { length: 255 }).notNull(),
  folderId: integer("folderId").references(() => folders.id, {
    onDelete: "cascade",
  }),
});
