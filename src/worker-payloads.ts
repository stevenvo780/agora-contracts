/**
 * Contratos de los endpoints `/api/sync/worker-*`.
 *
 * Parsers estrictos: el endpoint nunca debe usar `as T` sobre el body.
 * Si el daemon manda algo malformado, queremos un 400 con campo concreto,
 * no 4 capas adentro como `undefined`.
 */
import { z } from 'zod';
import { parseZod, type ParseResult, err, fieldErr, isString } from './result';

export const workerCommitSchema = z.object({
  repoPath: z.string(),
  contentHash: z.string().min(1),
  size: z.number().min(0).nullable().optional().default(null),
  mimeType: z.string().nullable().optional().default(null)
});

export type WorkerCommitPayload = z.infer<typeof workerCommitSchema>;

/**
 * Sanitiza un repoPath relativo: quita slashes iniciales, rechaza traversal
 * y dobles slashes. Compartido por todos los endpoints worker-*.
 */
export const sanitizeRepoPath = (input: unknown): string | null => {
  if (typeof input !== 'string') return null;
  const cleaned = input.replace(/^\/+/, '').trim();
  if (!cleaned) return null;
  if (cleaned.split('/').some((seg) => seg === '..' || seg === '')) return null;
  return cleaned;
};

/** Divide repoPath en (folder, name). Sin slash = doc en raíz (folder=""). */
export const splitRepoPath = (repoPath: string): { folder: string; name: string } => {
  const idx = repoPath.lastIndexOf('/');
  if (idx === -1) return { folder: '', name: repoPath };
  return { folder: repoPath.slice(0, idx), name: repoPath.slice(idx + 1) };
};

export const parseWorkerCommitPayload = (input: unknown): ParseResult<WorkerCommitPayload> => {
  const result = parseZod<WorkerCommitPayload>(workerCommitSchema, input);
  if (!result.ok) return result;
  const sanitized = sanitizeRepoPath(result.value.repoPath);
  if (!sanitized) return err('field "repoPath" contains traversal or empty segments');
  return { ok: true, value: { ...result.value, repoPath: sanitized } };
};

export const workerDeleteSchema = z.object({
  repoPath: z.string()
});

export type WorkerDeletePayload = z.infer<typeof workerDeleteSchema>;

export const parseWorkerDeletePayload = (input: unknown): ParseResult<WorkerDeletePayload> => {
  const result = parseZod<WorkerDeletePayload>(workerDeleteSchema, input);
  if (!result.ok) return result;
  const sanitized = sanitizeRepoPath(result.value.repoPath);
  if (!sanitized) return err('field "repoPath" contains traversal or empty segments');
  return { ok: true, value: { repoPath: sanitized } };
};

export const workerUploadUrlSchema = z.object({
  repoPath: z.string(),
  size: z.number().positive(),
  mimeType: z.string().nullable().optional().default(null)
});

export type WorkerUploadUrlPayload = z.infer<typeof workerUploadUrlSchema>;

export const parseWorkerUploadUrlPayload = (input: unknown): ParseResult<WorkerUploadUrlPayload> => {
  const result = parseZod<WorkerUploadUrlPayload>(workerUploadUrlSchema, input);
  if (!result.ok) return result;
  const sanitized = sanitizeRepoPath(result.value.repoPath);
  if (!sanitized) return err('field "repoPath" contains traversal or empty segments');
  return { ok: true, value: { ...result.value, repoPath: sanitized } };
};
