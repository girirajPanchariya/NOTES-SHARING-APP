import { Share } from "./share";

export interface Note {
  id: string;

  title: string;

  content: string;

  ownerId: string;

  createdAt: string;

  updatedAt: string;

  shareLinks?: Share[];
}

export interface CreateNote {
  title: string;

  content: string;

  shareType: "ONE_TIME" | "TIME";

  accessType: "PUBLIC" | "PASSWORD";

  expiry?: string;
}

export interface UpdateNote {
  title?: string;

  content?: string;

  expiry?: string;
}