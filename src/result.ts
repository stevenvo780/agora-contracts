import { z } from 'zod';

export type ParseOk<T> = { ok: true; value: T };
export type ParseErr = { ok: false; error: string };
export type ParseResult<T> = ParseOk<T> | ParseErr;

export const ok = <T>(value: T): ParseOk<T> => ({ ok: true, value });
export const err = (error: string): ParseErr => ({ ok: false, error });

export const isString = (v: unknown): v is string => typeof v === 'string';
export const isNumber = (v: unknown): v is number => typeof v === 'number' && Number.isFinite(v);
export const isBool = (v: unknown): v is boolean => typeof v === 'boolean';
export const isObject = (v: unknown): v is Record<string, unknown> =>
  v !== null && typeof v === 'object' && !Array.isArray(v);

export const fieldErr = (field: string, expected: string, got: unknown): ParseErr =>
  err(`field "${field}" expected ${expected}, got ${typeof got === 'object' && got !== null ? 'object' : typeof got}`);

/** Helper to use Zod schemas but return the legacy ParseResult format */
export function parseZod<T>(schema: z.ZodType<T>, data: unknown): ParseResult<T> {
  const parsed = schema.safeParse(data);
  if (parsed.success) {
    return ok(parsed.data);
  }
  const issues = parsed.error.issues.map(i => `${i.path.join('.')}: ${i.message}`).join(', ');
  return err(`Validation failed: ${issues}`);
}
