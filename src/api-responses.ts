import { z } from 'zod';

export const workspaceStorageInfoSchema = z.object({
  usedBytes: z.number().optional(),
  limitBytes: z.number().optional()
});

export type WorkspaceStorageInfo = z.infer<typeof workspaceStorageInfoSchema>;

export const gitStatusItemSchema = z.object({
  docId: z.string(),
  repoPath: z.string(),
  name: z.string().nullable(),
  folder: z.string().nullable(),
  size: z.number().nullable(),
  type: z.string().nullable(),
  currentHash: z.string().nullable(),
  committedHash: z.string().nullable(),
  lastSha: z.string().nullable(),
  status: z.union([z.literal('clean'), z.literal('modified'), z.literal('new')])
});

export const gitWorkbenchStatusSchema = z.object({
  items: z.array(gitStatusItemSchema).optional().default([])
});

export const gitCommitInfoSchema = z.object({
  sha: z.string(),
  shortSha: z.string(),
  message: z.string(),
  authorName: z.string(),
  authorEmail: z.string(),
  date: z.string(),
  htmlUrl: z.string()
});

export const gitWorkbenchCommitsSchema = z.object({
  commits: z.array(gitCommitInfoSchema).optional().default([])
});

export const gitGraphCommitSchema = z.object({
  sha: z.string(),
  shortSha: z.string(),
  parents: z.array(z.string()),
  message: z.string(),
  authorName: z.string(),
  authorEmail: z.string(),
  date: z.string(),
  htmlUrl: z.string(),
  refs: z.array(z.string()).default([])
});

export const gitGraphResponseSchema = z.object({
  repoFullName: z.string(),
  defaultBranch: z.string(),
  commits: z.array(gitGraphCommitSchema)
});

export const gitDiffFileSchema = z.object({
  path: z.string(),
  oldPath: z.string().optional(),
  status: z.union([
    z.literal('added'),
    z.literal('removed'),
    z.literal('modified'),
    z.literal('renamed')
  ]),
  additions: z.number(),
  deletions: z.number(),
  patch: z.string()
});

export const gitDiffResponseSchema = z.object({
  base: z.string(),
  head: z.string(),
  files: z.array(gitDiffFileSchema),
  stats: z.object({
    totalAdditions: z.number(),
    totalDeletions: z.number(),
    totalFiles: z.number()
  }),
  truncated: z.boolean().default(false)
});

export const gitRevertResponseSchema = z.object({
  ok: z.boolean(),
  newSha: z.string().optional(),
  message: z.string().optional(),
  filesChanged: z.number().optional(),
  conflicts: z.array(z.string()).optional(),
  error: z.string().optional()
});

export const gitCheckoutResponseSchema = z.object({
  ok: z.boolean(),
  branch: z.string().optional(),
  sha: z.string().optional(),
  htmlUrl: z.string().optional(),
  treeSize: z.number().optional(),
  files: z.array(z.string()).optional(),
  error: z.string().optional()
});

export const gitMeResponseSchema = z.object({
  username: z.string().optional(),
  email: z.string().optional(),
  id: z.number().optional()
});

export const resolvedDocumentMetaSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  folder: z.string().optional(),
  type: z.string().optional(),
  mimeType: z.string().optional(),
  url: z.string().nullable().optional(),
  storagePath: z.string().nullable().optional()
}).passthrough();

export const documentListSchema = z.array(resolvedDocumentMetaSchema);

export const semanticStateResponseSchema = z.object({
  state: z.any().optional() // Usa z.any() para evitar definir todo el tipo si es muy grande, o define si es simple
});

export const dashboardApiItemSchema = z.record(z.string(), z.unknown()).and(z.object({ id: z.string() }));

export const semanticSearchResponseSchema = z.object({
  matches: z.array(z.any()).optional().default([]),
  context: z.string().optional()
}).passthrough();

export const ollamaChatResponseSchema = z.object({
  message: z.object({
    role: z.string(),
    content: z.string()
  }).optional(),
  response: z.string().optional()
}).passthrough();

export const agentResponseBodySchema = z.object({
  status: z.string(),
  finalReply: z.string().optional(),
  results: z.array(z.any()).optional()
}).passthrough();

export const agentContextResponseSchema = z.object({
  context: z.string().optional()
});

export const boardColumnSchema = z.object({
  id: z.string(),
  name: z.string(),
  order: z.number()
}).passthrough();

export const boardCardSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  columnId: z.string(),
  order: z.number(),
  ownerId: z.string().optional(),
  sourceDocId: z.string().optional(),
  sourceDocName: z.string().optional(),
  sourceFragment: z.string().optional(),
  sourcePath: z.string().optional()
}).passthrough();

export const boardDataSchema = z.object({
  boardId: z.string(),
  workspaceId: z.string(),
  columns: z.array(boardColumnSchema),
  cards: z.array(boardCardSchema)
}).passthrough();

export const snippetSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  markdown: z.string(),
  workspaceId: z.string(),
  category: z.string(),
  order: z.number(),
  ownerId: z.string().optional()
}).passthrough();
