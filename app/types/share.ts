export type ShareType = "ONE_TIME" | "TIME";

export type AccessType = "PUBLIC" | "PASSWORD";

export interface Share {
  id: string;

  token: string;

  password?: string;

  accessType: AccessType;

  shareType: ShareType;

  expiresAt?: string | null;

  revoked: boolean;

  used: boolean;

  viewCount: number;

  noteId: string;

  createdAt: string;

  updatedAt: string;
}

export interface CreateShare {
  noteId: string;

  shareType: ShareType;

  accessType: AccessType;

  expiresAt?: string;
}

export interface UnlockShare {
  password: string;
}

export interface ShareResponse {
  shareLink: string;

  password?: string;

  token: string;
}