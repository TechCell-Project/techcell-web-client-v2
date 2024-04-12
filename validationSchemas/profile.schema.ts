import * as z from 'zod';

export const ProfileSchema = z.object({
  firstName: z
    .string()
    .min(1, {
      message: 'Tên không được bỏ trống',
    })
    .min(2, {
      message: 'Tên cần ít nhất 2 kí tự',
    }),
  lastName: z
    .string()
    .min(1, {
      message: 'Họ không được bỏ trống',
    })
    .min(2, {
      message: 'Họ cần ít nhất 2 kí tự',
    }),
  avatarImageId: z.string().optional(),
});

export type ProfileFormType = z.infer<typeof ProfileSchema>;
