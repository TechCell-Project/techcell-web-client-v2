import z from 'zod';

export const MessageRes = z
  .object({
    message: z.string().optional(),
    status: z.number().optional(),
  })
  .strict();

export type MessageResType = z.TypeOf<typeof MessageRes>;

export const SearchSchema = z.object({
  keyword: z.string().min(1, { message: 'Tìm kiếm cần ít nhất 1 kí tự' }),
});

export type SearchType = z.TypeOf<typeof SearchSchema>;
