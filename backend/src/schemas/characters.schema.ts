import { z } from 'zod';

export const charactersQuerySchema = z.object({
  name: z
    .string()
    .min(1, 'Name cannot be empty')
    .optional(),
  page: z
    .string()
    .regex(/^\d+$/, 'Page must be a positive integer')
    .transform(Number)
    .pipe(z.number().int().positive())
    .optional(),
  status: z
    .enum(['alive', 'dead', 'unknown'], {
      message: 'Status must be one of: alive, dead, unknown',
    })
    .optional(),
});

export type CharactersQueryParams = z.infer<typeof charactersQuerySchema>;

export const characterIdParamSchema = z.object({
  id: z
    .string()
    .regex(/^\d+$/, 'ID must be a positive integer')
    .transform(Number)
    .pipe(z.number().int().positive()),
});

export type CharacterIdParam = z.infer<typeof characterIdParamSchema>;
