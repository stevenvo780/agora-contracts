/**
 * Payloads de endpoints `/api/` con auth Firebase (no HMAC). Mismo patrón
 * que worker-payloads, pero para body que viene del cliente browser.
 */
import { z } from 'zod';
import { parseZod, type ParseResult } from './result';

export const snippetCreateSchema = z.object({
  title: z.string().trim().min(1, 'Title is required'),
  description: z.string().trim().optional().default(''),
  markdown: z.string(),
  workspaceId: z.string().trim().min(1).nullable().optional().default(null),
  category: z.string().trim().min(1).optional().default('general'),
  order: z.number().optional().default(0)
});

export type SnippetCreatePayload = z.infer<typeof snippetCreateSchema>;

export const parseSnippetCreatePayload = (input: unknown): ParseResult<SnippetCreatePayload> => {
  return parseZod(snippetCreateSchema, input);
};

export const snippetUpdateSchema = z.object({
  title: z.string().trim().optional(),
  description: z.string().trim().optional(),
  markdown: z.string().optional(),
  category: z.string().trim().optional(),
  order: z.number().optional()
});

export type SnippetUpdatePayload = z.infer<typeof snippetUpdateSchema>;

export const parseSnippetUpdatePayload = (input: unknown): ParseResult<SnippetUpdatePayload> => {
  return parseZod(snippetUpdateSchema, input);
};

export const documentCreateSchema = z.object({
  name: z.string().trim().optional().default('Sin titulo'),
  type: z.string().optional().default('text'),
  content: z.preprocess(
    (value) => (typeof value === 'string' || value === null || value === undefined ? value : null),
    z.string().nullable().optional().default(null)
  ),
  workspaceId: z.string().trim().min(1).nullable().optional().default(null),
  folder: z.string().nullable().optional().default(null),
  mimeType: z.string().nullable().optional().default(null),
  url: z.string().nullable().optional().default(null),
  storagePath: z.string().nullable().optional().default(null),
  order: z.number().nullable().optional().default(null)
}).transform(data => ({
  ...data,
  name: data.name || 'Sin titulo'
}));

export type DocumentCreatePayload = z.infer<typeof documentCreateSchema>;

export const parseDocumentCreatePayload = (input: unknown): ParseResult<DocumentCreatePayload> => {
  return parseZod(documentCreateSchema, input);
};

export const documentUpdateSchema = z.object({
  name: z.string().trim().optional(),
  type: z.string().optional(),
  content: z.string().nullable().optional(),
  folder: z.string().nullable().optional(),
  mimeType: z.string().nullable().optional(),
  url: z.string().nullable().optional(),
  storagePath: z.string().nullable().optional(),
  order: z.number().nullable().optional(),
  allowEmptyOverwrite: z.boolean().optional(),
  size: z.number().nullable().optional(),
  refreshUrl: z.boolean().optional()
});

export type DocumentUpdatePayload = z.infer<typeof documentUpdateSchema>;

export const parseDocumentUpdatePayload = (input: unknown): ParseResult<DocumentUpdatePayload> => {
  return parseZod(documentUpdateSchema, input);
};

export const uploadUrlRequestSchema = z.object({
  mimeType: z.string().trim().optional().default('application/octet-stream'),
  fileSize: z.number()
});

export type UploadUrlRequestPayload = z.infer<typeof uploadUrlRequestSchema>;

export const parseUploadUrlRequestPayload = (input: unknown): ParseResult<UploadUrlRequestPayload> => {
  return parseZod(uploadUrlRequestSchema, input);
};

export const signedUrlRequestSchema = z.object({
  fileName: z.string().trim().min(1),
  mimeType: z.string().trim().min(1),
  workspaceId: z.string().trim().optional(),
  folder: z.string().trim().optional(),
  fileSize: z.number()
});

export type SignedUrlRequestPayload = z.infer<typeof signedUrlRequestSchema>;

export const parseSignedUrlRequestPayload = (input: unknown): ParseResult<SignedUrlRequestPayload> => {
  return parseZod(signedUrlRequestSchema, input);
};

export const registerUploadRequestSchema = z.object({
  storagePath: z.string().trim().min(1),
  fileName: z.string().trim().min(1),
  originalName: z.string().trim().optional(),
  mimeType: z.string().trim().optional(),
  workspaceId: z.string().trim().optional(),
  folder: z.string().trim().optional(),
  size: z.number().optional()
});

export type RegisterUploadRequestPayload = z.infer<typeof registerUploadRequestSchema>;

export const parseRegisterUploadRequestPayload = (input: unknown): ParseResult<RegisterUploadRequestPayload> => {
  return parseZod(registerUploadRequestSchema, input);
};

export const boardActionBaseSchema = z.object({
  workspaceId: z.string().trim().min(1),
  type: z.enum(['column', 'card'])
});

export const boardCreateSchema = boardActionBaseSchema.and(z.object({
  name: z.string().trim().optional(),
  title: z.string().trim().optional(),
  description: z.string().optional(),
  columnId: z.string().trim().optional(),
  order: z.number().optional(),
  sourceDocId: z.string().nullable().optional(),
  sourceDocName: z.string().nullable().optional(),
  sourceFragment: z.string().nullable().optional(),
  sourcePath: z.string().nullable().optional()
}));

export const boardPatchSchema = boardActionBaseSchema.and(z.object({
  id: z.string().trim().min(1),
  data: z.object({
    name: z.string().trim().optional(),
    title: z.string().trim().optional(),
    description: z.string().optional(),
    columnId: z.string().trim().optional(),
    order: z.number().optional(),
    sourceDocId: z.string().nullable().optional(),
    sourceDocName: z.string().nullable().optional(),
    sourceFragment: z.string().nullable().optional(),
    sourcePath: z.string().nullable().optional()
  }).optional()
}));

export const boardDeleteSchema = boardActionBaseSchema.and(z.object({
  id: z.string().trim().min(1)
}));

export type BoardCreatePayload = z.infer<typeof boardCreateSchema>;
export type BoardPatchPayload = z.infer<typeof boardPatchSchema>;
export type BoardDeletePayload = z.infer<typeof boardDeleteSchema>;

export const parseBoardCreatePayload = (input: unknown): ParseResult<BoardCreatePayload> => {
  return parseZod(boardCreateSchema, input);
};

export const parseBoardPatchPayload = (input: unknown): ParseResult<BoardPatchPayload> => {
  return parseZod(boardPatchSchema, input);
};

export const parseBoardDeletePayload = (input: unknown): ParseResult<BoardDeletePayload> => {
  return parseZod(boardDeleteSchema, input);
};
