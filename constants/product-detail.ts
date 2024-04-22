export type ProductDetail = {
  productName: string;
  description: string;
  attributes: AttributeProps[];
  image: ImageProps[];
  variation: VariationProps[];
};

export type AttributeProps = {
  name: string;
  k: string;
  v: string;
  u: string;
};

export type ImageProps = {
  publicId: string;
  url: string;
};

export type VariationProps = {
  skuId: string;
  price: PriceProps[];
  attributes: AttributeProps[];
  tags: string[];
};

export type PriceProps = {
  special: number;
  base: number;
};
export const PRODUCT_DETAILS: ProductDetail[] = [
  {
    productName: 'iPhone 11 Pro Max',
    description: 'This is iPhone 11 Pro Max',
    attributes: [
      {
        name: 'Chipset',
        k: 'chipset',
        v: 'Apple A13 Bionic',
        u: '(7 nm+)',
      },
      {
        name: 'CPU',
        k: 'cpu',
        v: 'Hexa-core',
        u: '(2x2.65 GHz Lightning + 4x1.8 GHz Thunder)',
      },
      {
        name: 'GPU',
        k: 'gpu',
        v: 'Apple GPU',
        u: '(đồ họa 4 nhân)',
      },
      {
        name: 'Hệ điều hành',
        k: 'he_dieu_hanh',
        v: 'iOS 13, upgradable to iOS 17.4',
        u: '',
      },
      {
        name: 'RAM',
        k: 'ram',
        v: '4',
        u: 'GB',
      },
      {
        name: 'SIM',
        k: 'sim',
        v: 'Nano-SIM và eSIM hoặc Dual SIM',
        u: '(Nano-SIM, dual stand-by)',
      },
      {
        name: 'Thời điểm ra mắt',
        k: 'thoi_diem_ra_mat',
        v: '20/10/2019',
        u: '',
      },
      {
        name: 'Xuất xứ thương hiệu',
        k: 'xuat_xu_thuong_hieu',
        v: 'Mỹ',
        u: '',
      },
      {
        name: 'Bảo mật',
        k: 'bao_mat',
        v: 'Mở khoá khuôn mặt Face ID',
        u: '',
      },
      {
        name: 'Bluetooth',
        k: 'bluetooth',
        v: '5.0|A2DP|LE',
        u: '',
      },
      {
        name: 'Camera sau',
        k: 'camera_sau',
        v: "12 MP, f/1.8, 26mm (góc rộng), 1/2.55', 1.4µm, dual pixel PDAF, OIS|12 MP, f/2.0, 52mm (telephoto), 1/3.4', 1.0µm, PDAF, OIS, 2x optical zoom|12 MP, f/2.4, 120˚, 13mm (góc siêu rộng), 1/3.6'",
        u: '',
      },
      {
        name: 'Camera trước',
        k: 'camera_truoc',
        v: "12 MP, f/2.2, 23mm (wide), 1/3.6'",
        u: '',
      },
      {
        name: 'Chống nước & bụi',
        k: 'chong_nuoc_bui',
        v: 'Chống bụi/nước theo tiêu chuẩn IP68',
        u: '(lên đến 4m trong vòng 30 phút)',
      },
      {
        name: 'Cổng kết nối USB',
        k: 'cong_ket_noi_usb',
        v: 'Lightning',
        u: '',
      },
      {
        name: 'Công nghệ màn hình & hiển thị',
        k: 'cong_nghe_man_hinh_hien_thi',
        v: 'Super Retina XDR OLED, HDR10, Dolby Vision',
        u: 'inch',
      },
      {
        name: 'Cổng sạc',
        k: 'cong_sac',
        v: 'Lightning, Không dây (Qi)',
        u: '',
      },
      {
        name: 'Cổng tai nghe',
        k: 'cong_tai_nghe',
        v: 'Lightning',
        u: '',
      },
      {
        name: 'Định vị',
        k: 'dinh_vi',
        v: 'GPS|A-GPS|BDS|GLONASS|GALILEO|QZSS',
        u: '',
      },
      {
        name: 'Độ phân giải',
        k: 'do_phan_giai',
        v: '1242 x 2688',
        u: 'pixel',
      },
      {
        name: 'Khối lượng',
        k: 'khoi_luong',
        v: '226',
        u: 'grams',
      },
      {
        name: 'Kích thước',
        k: 'kich_thuoc',
        v: '158 x 77.8 x 8.1',
        u: 'mm',
      },
      {
        name: 'Kích thước màn hình',
        k: 'kich_thuoc_man_hinh',
        v: '6.5',
        u: 'inch',
      },
      {
        name: 'Mặt kính cảm ứng',
        k: 'mat_kinh_cam_ung',
        v: 'Kính cường lực Oleophobic (ion cường lực)',
        u: '',
      },
      {
        name: 'NFC',
        k: 'nfc',
        v: 'Có',
        u: '',
      },
      {
        name: 'Pin',
        k: 'pin',
        v: 'Li-Ion 3969 mAh (15.04 Wh)',
        u: '',
      },
      {
        name: 'Quay phim camera sau',
        k: 'quay_phim_camera_sau',
        v: '4K 2160p@24fps|4K 2160p@30fps|4K 2160p@60fps|FullHD 1080p@120fps|FullHD 1080p@240fps|FullHD 1080p@30fps|FullHD 1080p@60fps|HD 720p@30fps',
        u: '',
      },
      {
        name: 'Quay phim camera trước',
        k: 'quay_phim_camera_truoc',
        v: '4K 2160p@24fps|4K 2160p@30fps|4K 2160p@60fps|FullHD 1080p@120fps|FullHD 1080p@30fps|FullHD 1080p@60fps',
        u: '',
      },
      {
        name: 'Tính năng camera sau',
        k: 'tinh_nang_camera_sau',
        v: 'Ban đêm (Night Mode)|Chạm lấy nét|Góc rộng (Wide)|Góc siêu rộng (Ultrawide)|HDR|Nhận diện khuôn mặt|Quay chậm (Slow Motion)|Toàn cảnh (Panorama)|Trôi nhanh thời gian (Time Lapse)|Tự động lấy nét (AF)|Xóa phông|Siêu cận (Macro)',
        u: '',
      },
      {
        name: 'Tính năng camera trước',
        k: 'tinh_nang_camera_truoc',
        v: 'HDR|Nhãn dán (AR Stickers)|Nhận diện khuôn mặt|Quay chậm (Slow Motion)|Retina Flash|Tự động lấy nét (AF)|Xóa phông',
        u: '',
      },
      {
        name: 'Wi-Fi',
        k: 'wi_fi',
        v: 'Dual-band (2.4 GHz/5 GHz)|Wi-Fi 802.11 a/b/g/n/ac/ax|Wi-Fi hotspot',
        u: '',
      },
    ],
    image: [
      {
        publicId: '5f9a7f5d9d8f6d7f5d8f6d7',
        url: '/phone-test/ipX.webp',
      },
    ],
    variation: [
      {
        skuId: '662175b79d1067891146a3fb',
        price: [
          {
            special: 17990000,
            base: 20790000,
          },
        ],
        attributes: [
          {
            name: 'Bô nhớ trong',
            k: 'bo_nho_trong',
            v: '64',
            u: 'GB',
          },
          {
            name: 'Màu sắc',
            k: 'mau_sac',
            v: 'Vàng',
            u: '',
          },
        ],
        tags: [],
      },
      {
        skuId: '662175b79d1067891146a3f9',
        price: [
          {
            special: 17990000,
            base: 20790000,
          },
        ],
        attributes: [
          {
            name: 'Bô nhớ trong',
            k: 'bo_nho_trong',
            v: '64',
            u: 'GB',
          },
          {
            name: 'Màu sắc',
            k: 'mau_sac',
            v: 'Xanh',
            u: '',
          },
        ],
        tags: [],
      },
      {
        skuId: '662175b79d1067891146a41f',
        price: [
          {
            special: 17990000,
            base: 20790000,
          },
        ],
        attributes: [
          {
            name: 'Bô nhớ trong',
            k: 'bo_nho_trong',
            v: '128',
            u: 'GB',
          },
          {
            name: 'Màu sắc',
            k: 'mau_sac',
            v: 'Vàng',
            u: '',
          },
        ],
        tags: [],
      },
      {
        skuId: '662175b79d1067891146a40b',
        price: [
          {
            special: 17990000,
            base: 20790000,
          },
        ],
        attributes: [
          {
            name: 'Bô nhớ trong',
            k: 'bo_nho_trong',
            v: '64',
            u: 'GB',
          },
          {
            name: 'Màu sắc',
            k: 'mau_sac',
            v: 'Xám',
            u: '',
          },
        ],
        tags: [],
      },
      {
        skuId: '662175b79d1067891146a41d',
        price: [
          {
            special: 17990000,
            base: 20790000,
          },
        ],
        attributes: [
          {
            name: 'Bô nhớ trong',
            k: 'bo_nho_trong',
            v: '128',
            u: 'GB',
          },
          {
            name: 'Màu sắc',
            k: 'mau_sac',
            v: 'Xanh',
            u: '',
          },
        ],
        tags: [],
      },
      {
        skuId: '662175b79d1067891146a409',
        price: [
          {
            special: 17990000,
            base: 20790000,
          },
        ],
        attributes: [
          {
            name: 'Bô nhớ trong',
            k: 'bo_nho_trong',
            v: '256',
            u: 'GB',
          },
          {
            name: 'Màu sắc',
            k: 'mau_sac',
            v: 'Xám',
            u: '',
          },
        ],
        tags: [],
      },
      {
        skuId: '662175b79d1067891146a42f',
        price: [
          {
            special: 17990000,
            base: 20790000,
          },
        ],
        attributes: [
          {
            name: 'Bô nhớ trong',
            k: 'bo_nho_trong',
            v: '128',
            u: 'GB',
          },
          {
            name: 'Màu sắc',
            k: 'mau_sac',
            v: 'Xám',
            u: '',
          },
        ],
        tags: [],
      },
      {
        skuId: '662175b79d1067891146a407',
        price: [
          {
            special: 17990000,
            base: 20790000,
          },
        ],
        attributes: [
          {
            name: 'Bô nhớ trong',
            k: 'bo_nho_trong',
            v: '256',
            u: 'GB',
          },
          {
            name: 'Màu sắc',
            k: 'mau_sac',
            v: 'Bạc',
            u: '',
          },
        ],
        tags: [],
      },
      {
        skuId: '662175b79d1067891146a441',
        price: [
          {
            special: 17990000,
            base: 20790000,
          },
        ],
        attributes: [
          {
            name: 'Bô nhớ trong',
            k: 'bo_nho_trong',
            v: '256',
            u: 'GB',
          },
          {
            name: 'Màu sắc',
            k: 'mau_sac',
            v: 'Vàng',
            u: '',
          },
        ],
        tags: [],
      },
      {
        skuId: '662175b79d1067891146a43b',
        price: [
          {
            special: 17990000,
            base: 20790000,
          },
        ],
        attributes: [
          {
            name: 'Bô nhớ trong',
            k: 'bo_nho_trong',
            v: '128',
            u: 'GB',
          },
          {
            name: 'Màu sắc',
            k: 'mau_sac',
            v: 'Bạc',
            u: '',
          },
        ],
        tags: [],
      },
      {
        skuId: '662175b89d1067891146a4c5',
        price: [
          {
            special: 17990000,
            base: 20790000,
          },
        ],
        attributes: [
          {
            name: 'Bô nhớ trong',
            k: 'bo_nho_trong',
            v: '64',
            u: 'GB',
          },
          {
            name: 'Màu sắc',
            k: 'mau_sac',
            v: 'Bạc',
            u: '',
          },
        ],
        tags: [],
      },
      {
        skuId: '662175b99d1067891146a4c9',
        price: [
          {
            special: 17990000,
            base: 20790000,
          },
        ],
        attributes: [
          {
            name: 'Bô nhớ trong',
            k: 'bo_nho_trong',
            v: '256',
            u: 'GB',
          },
          {
            name: 'Màu sắc',
            k: 'mau_sac',
            v: 'Xanh',
            u: '',
          },
        ],
        tags: [],
      },
    ],
  },
];
