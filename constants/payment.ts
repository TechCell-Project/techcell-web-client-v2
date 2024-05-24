import CODImg from '@/public/img_payment/cod.png';
import VNPAYImg from '@/public/img_payment/vnpay.webp';
import ATMImg from '@/public/img_payment/payment1.png';
import VISAImg from '@/public/img_payment/visa-512.webp';
import MASTERCARDImg from '@/public/img_payment/mastercard.png';
import JCBImg from '@/public/img_payment/JCB.png';

export const STATUS_ALL = 'all';
export const STATUS_PENDING = 'pending';
export const STATUS_PROCESSING = 'processing';
export const STATUS_CONFIRMED = 'confirmed';
export const STATUS_PREPARING = 'preparing';
export const STATUS_PREPARED = 'prepared';
export const STATUS_SHIPPING = 'shipping';
export const STATUS_CANCELLED = 'canceled';
export const STATUS_FAILED = 'failed';
export const STATUS_COMPLETED = 'completed';
export const STATUS_WAIT_FOR_PAYMENT = 'wait-for-payment';

export const COMMON_STATUS_KEYS = [STATUS_ALL, STATUS_PENDING, STATUS_COMPLETED, STATUS_CANCELLED];

export type StatusLabel = {
  key: string;
  label: string;
};

export const ORDER_STATUS_KEYS = [...COMMON_STATUS_KEYS, STATUS_SHIPPING];

export const PAYMENT_STATUS_KEYS = [...COMMON_STATUS_KEYS, STATUS_WAIT_FOR_PAYMENT];

const COMMON_STATUSES: Map<string, StatusLabel> = new Map<string, StatusLabel>([
  [
    STATUS_ALL,
    {
      key: STATUS_ALL,
      label: 'Tất cả',
    },
  ],
  [
    STATUS_PENDING,
    {
      key: STATUS_PENDING,
      label: 'Chờ xác nhận',
    },
  ],
  [
    STATUS_CANCELLED,
    {
      key: STATUS_CANCELLED,
      label: 'Đã hủy',
    },
  ],
]);

export const ORDER_STATUSES: Map<string, StatusLabel> = new Map(COMMON_STATUSES)
  .set(STATUS_CONFIRMED, {
    key: STATUS_CONFIRMED,
    label: 'Đã xác nhận',
  })
  .set(STATUS_PREPARING, {
    key: STATUS_PREPARING,
    label: 'Đang chuẩn bị hàng',
  })
  .set(STATUS_PREPARED, {
    key: STATUS_PREPARED,
    label: 'Đã chuẩn bị hàng',
  })
  .set(STATUS_SHIPPING, {
    key: STATUS_SHIPPING,
    label: 'Đang giao hàng',
  })
  .set(STATUS_FAILED, {
    key: STATUS_FAILED,
    label: 'Giao thất bại',
  })
  .set(STATUS_COMPLETED, {
    key: STATUS_COMPLETED,
    label: 'Đã giao hàng',
  });

export type ValidOrderStatus = keyof typeof ORDER_STATUSES;

export function isValidOrderStatus(status: string): boolean {
  return ORDER_STATUSES.has(status);
}

export const PAYMENT_STATUSES: Map<string, StatusLabel> = new Map(COMMON_STATUSES)
  .set(STATUS_PROCESSING, {
    key: STATUS_PROCESSING,
    label: 'Đang xử lý',
  })
  .set(STATUS_WAIT_FOR_PAYMENT, {
    key: STATUS_WAIT_FOR_PAYMENT,
    label: 'Chờ thanh toán',
  })
  .set(STATUS_COMPLETED, {
    key: STATUS_COMPLETED,
    label: 'Đã thanh toán',
  })
  .set(STATUS_FAILED, {
    key: STATUS_FAILED,
    label: 'Thanh toán thất bại',
  });

export type ValidPaymentStatus = keyof typeof PAYMENT_STATUSES;

export type PaymentMethodLabel = {
  key: string;
  label: string;
  imgLable: string;
};

export const PAYMENT_METHODS: Map<string, PaymentMethodLabel> = new Map<string, PaymentMethodLabel>(
  [
    [
      'COD',
      {
        key: 'COD',
        label: 'Thanh toán khi nhận hàng',
        imgLable: CODImg.src,
      },
    ],
    [
      'VNPAY',
      {
        key: 'VNPAY',
        label: 'Thanh toán bằng VNPay',
        imgLable: VNPAYImg.src,
      },
    ],
    [
      'VNBANK',
      {
        key: 'VNBANK',
        label: 'Thanh toán bằng thẻ VNBANK',
        imgLable: VNPAYImg.src,
      },
    ],
    [
      'INTCARD',
      {
        key: 'INTCARD',
        label: 'Thanh toán bằng thẻ INTCARD',
        imgLable: VNPAYImg.src,
      },
    ],
    // {
    //   key: 'ATM',
    //   label: 'Thanh toán bằng thẻ ATM',
    //   imgLable: ATMImg.src,
    // },
    // {
    //   key: 'VISA',
    //   label: 'Thanh toán bằng thẻ Visa',
    //   imgLable: VISAImg.src,
    // },
    // {
    //   key: 'MASTERCARD',
    //   label: 'Thanh toán bằng Mastercard',
    //   imgLable: MASTERCARDImg.src,
    // },
    // {
    //   key: 'JCB',
    //   label: 'Thanh toán bằng thẻ JCB',
    //   imgLable: JCBImg.src,
    // },
  ],
);

// export type ValidPaymentMethod = (typeof PAYMENT_METHODS)[number]['key'];
