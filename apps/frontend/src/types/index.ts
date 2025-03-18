export interface Folder {
  id: number;
  name: string;
  folders: Folder[];
}

export interface File {
  id: number;
  name: string;
  folderId: number;
}
