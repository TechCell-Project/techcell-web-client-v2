export const SUCCESS = 200;
export const INVALID = 400;
export const UNAUTHORIZED = 401;
export const NOTFOUND = 404;
export const ENTITY_ERROR = 422;
export const OVERLOAD = 429;
export const SERVER_ERROR = 500;

export const CASE_AUTH_LOGIN = 'auth-login';
export const CASE_AUTH_REGISTER = 'auth-register';
export const CASE_CART = 'cart';
export const CASE_ORDER = 'order';
export const CASE_ORDER_CANCEL = 'order-cancel';
export const CASE_ORDER_NEW_PAYMENT_URL = 'order-new-payment-url';
export const CASE_ORDERS_FETCH = 'orders-fetch';
export const CASE_CART_DELETE_PRODUCT = 'order-delete-product';

export const CASE_PRODUCT_FETCH = 'product-detail-fetch';

export const CASE_DEFAULT = 'default';

export const ERROR_MSG = new Map<number, Record<string, string>>([
    [
        INVALID,
        {
            [CASE_DEFAULT]: 'Dữ liệu không hợp lệ',
            [CASE_PRODUCT_FETCH]: 'Sản phẩm không tồn tại',
        },
    ],
    [
        UNAUTHORIZED,
        {
            [CASE_DEFAULT]: 'Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại',
        },
    ],
    [
        NOTFOUND,
        {
            [CASE_AUTH_LOGIN]: 'Tài khoản hoặc mật khẩu không đúng.',
            [CASE_AUTH_REGISTER]: 'Thông tin không chính xác',
            [CASE_ORDER_CANCEL]: 'Hủy đơn thất bại. Không tìm thấy đơn hàng',
            [CASE_ORDER_NEW_PAYMENT_URL]: 'Chuyển hướng thất bại. Đơn hàng không tồn tại',
            [CASE_CART_DELETE_PRODUCT]: 'Sản phẩm không còn tồn tại',
            [CASE_ORDERS_FETCH]: 'Không tìm thấy đơn hàng nào',
            [CASE_PRODUCT_FETCH]: 'Không tìm thấy sản phẩm nào',
            [CASE_DEFAULT]: 'Không tìm thấy dữ liệu',
        },
    ],
    [
        OVERLOAD,
        {
            [CASE_DEFAULT]: 'Quá nhiều yêu cầu. Vui lòng thử lại sau',
        },
    ],
    [
        ENTITY_ERROR,
        {
            [CASE_DEFAULT]: 'Form dữ liệu không hợp lệ',
        },
    ],
    [
        SERVER_ERROR,
        {
            [CASE_DEFAULT]: 'Có lỗi xảy ra. Vui lòng thử lại sau ít phút',
        },
    ],
]);
