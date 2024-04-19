import * as z from 'zod';

export const AddressTypeEnum = ['home', 'office', 'other'] as const;

const ProvinceLevelSchema = z.object({
  provinceId: z.number({ required_error: 'Không được bỏ trồng' }),
  provinceName: z.string().min(1, { message: 'Không được bỏ trống' }),
});

const DistrictLevelSchema = z.object({
  districtId: z.number({ required_error: 'Không được bỏ trống' }),
  districtName: z.string().min(1, { message: 'Không được bỏ trống' }),
});

const WardLevelSchema = z.object({
  wardCode: z.string().min(1, { message: 'Không được bỏ trống' }),
  wardName: z.string().min(1, { message: 'Không được bỏ trống' }),
});

export const AddressSchema = z.object({
  provinceLevel: z.object({
    provinceId: z.number({ required_error: 'Không được bỏ trống' }),
  }),
  districtLevel: z.object({
    districtId: z.number({ required_error: 'Không được bỏ trống' }),
  }),
  wardLevel: z.object({
    wardCode: z.string().min(1, { message: 'Không được bỏ trống' }),
  }),
  detail: z
    .string()
    .min(1, { message: 'Không được bỏ trống' })
    .min(3, { message: 'Cần ít nhất 3 kí tự' }),
  customerName: z
    .string()
    .min(1, { message: 'Không được bỏ trống' })
    .min(3, { message: 'Cần ít nhất 3 kí tự' }),
  phoneNumbers: z
    .string()
    .min(1, { message: 'Không được bỏ trống' })
    .min(10, { message: 'Cần ít nhất 3 kí tự' })
    .max(12, { message: 'SDT nhiều nhất 12 kí tự' }),
  type: z.enum(AddressTypeEnum),
});

export type AddressFormType = z.infer<typeof AddressSchema>;

export const ProfileSchema = z.object({
  firstName: z
    .string()
    .min(1, {
      message: 'Tên không được bỏ trống',
    })
    .min(2, {
      message: 'Tên cần ít nhất 2 kí tự',
    })
    .optional(),
  lastName: z
    .string()
    .min(1, {
      message: 'Họ không được bỏ trống',
    })
    .min(2, {
      message: 'Họ cần ít nhất 2 kí tự',
    })
    .optional(),
  avatarImageId: z.string().optional(),
});

export type ProfileFormType = z.infer<typeof ProfileSchema>;

export const UpdatePasswordSchema = z.object({
  oldPassword: z
    .string()
    .min(1, {
      message: 'Không được bỏ trống',
    })
    .min(8, {
      message: 'Cần ít nhất 8 kí tự',
    })
    .max(24, {
      message: 'Mật khẩu dài tối đa 24 kí tự',
    }),
  newPassword: z
    .string()
    .min(1, {
      message: 'Mật khẩu mới không được bỏ trống',
    })
    .min(8, {
      message: 'Mật khẩu mới cần ít nhất 8 kí tự',
    })
    .max(24, {
      message: 'Mật khẩu mới dài tối đa 24 kí tự',
    }),
  confirmNewPassword: z
    .string()
    .min(1, {
      message: 'Mật khẩu mới không được bỏ trống',
    })
    .min(8)
    .max(24),
}).superRefine(({ confirmNewPassword, newPassword }, ctx) => {
  if (confirmNewPassword !== newPassword) {
    ctx.addIssue({
      code: 'custom',
      message: 'Nhập lại mật khẩu không trùng khớp',
      path: ['confirmNewPassword'],
    });
  }
});

export type UpdatePassFormType = z.infer<typeof UpdatePasswordSchema>;