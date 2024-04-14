import z from 'zod';

export const MessageRes = z
  .object({
    message: z.string().optional(),
    status: z.number().optional(),
  })
  .strict();

export type MessageResType = z.TypeOf<typeof MessageRes>;
