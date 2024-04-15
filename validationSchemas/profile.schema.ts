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
  phoneNumber: z
    .string()
    .min(1, { message: 'Không được bỏ trống' })
    .min(10, { message: 'Cần ít nhất 3 kí tự' })
    .max(12, { message: 'SDT nhiều nhất 12 kí tự' }),
  type: z.enum(AddressTypeEnum),
  isDefault: z.boolean().optional(),
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
  address: z.array(AddressSchema).optional(),
});

export type ProfileFormType = z.infer<typeof ProfileSchema>;
