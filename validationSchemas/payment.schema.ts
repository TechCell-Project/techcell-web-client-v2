import * as z from 'zod';

export const PaymentSchema = z.object({
//   paymentMethod: z.enum(['COD', 'VNPAY', 'VNBANK', 'INTCARD']).default('COD'),
  orderNote: z.string({
    required_error: 'Ghi chú đơn hàng không được bỏ trống',
  }),
  shipNote: z.string({
    required_error: 'Ghi chú vận chuyển không được bỏ trống',
  }),
});

export type PaymentFormType = z.infer<typeof PaymentSchema>;
