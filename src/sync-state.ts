export const SYNC_STATE_IDS = [
  'synced',
  'local-only',
  'uploading',
  'remote-only',
  'conflict',
  'deleted-pending'
] as const;

export type SyncStateId = typeof SYNC_STATE_IDS[number];

export interface SyncStateRecord {
  state: SyncStateId;
  path: string;
  localHash?: string | null;
  remoteHash?: string | null;
  updatedAt: number;
  reason?: string;
}

export const isSyncStateId = (value: unknown): value is SyncStateId => (
  typeof value === 'string' && (SYNC_STATE_IDS as readonly string[]).includes(value)
);
