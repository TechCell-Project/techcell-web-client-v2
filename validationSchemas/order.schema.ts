import * as z from 'zod';

export const CancelOrderSchema = z.object({
  reason: z.string({
    required_error: 'Lý do hủy đơn không được bỏ trống',
  }),
});

export type CancelOrderFormType = z.infer<typeof CancelOrderSchema>;
