export type PhoneProps = {
  name: string;
  modelName: string;
  brandName: string;
  image: ImgChildren[];
  price: PriceChildren[];
  tags: string[];
};

export type PriceChildren = {
  base: number;
  special: number;
};

export type ImgChildren = {
  publicId: string;
  url: string;
};

export const PHONE_TEST: PhoneProps[] = [
  {
    name: 'iPhone X',
    modelName: 'iPhone X',
    brandName: 'Apple',
    image: [
      {
        publicId: '5f9a7f5d9d8f6d7f5d8f6d7',
        url: '/phone-test/ipX.webp',
      },
    ],
    price: [
      {
        special: 3990000,
        base: 4990000,
      },
    ],
    tags: [],
  },
  {
    name: 'iPhone X',
    modelName: 'iPhone XS',
    brandName: 'Apple',
    image: [
      {
        publicId: '5f9a7f5d9d8f6d7f5d8f6d7',
        url: '/phone-test/IpXS.webp',
      },
    ],
    price: [
      {
        special: 7990000,
        base: 8990000,
      },
    ],
    tags: [],
  },
  {
    name: 'iPhone X',
    modelName: 'iPhone XS',
    brandName: 'Apple',
    image: [
      {
        publicId: '5f9a7f5d9d8f6d7f5d8f6d7',
        url: '/phone-test/IpXS.webp',
      },
    ],
    price: [
      {
        special: 8990000,
        base: 9990000,
      },
    ],
    tags: [],
  },
  {
    name: 'iPhone X',
    modelName: 'iPhone XR',
    brandName: 'Apple',
    image: [
      {
        publicId: '5f9a7f5d9d8f6d7f5d8f6d7',
        url: '/phone-test/ipXR.webp',
      },
    ],
    price: [
      {
        special: 7690000,
        base: 20000000,
      },
    ],
    tags: [],
  },
  {
    name: 'iPhone 13 series',
    modelName: 'iPhone 13',
    brandName: 'Apple',
    image: [
      {
        publicId: '5f9a7f5d9d8f6d7f5d8f6d7',
        url: '/phone-test/ip13.webp',
      },
    ],
    price: [
      {
        special: 13190000,
        base: 18990000,
      },
    ],
    tags: [],
  },
  {
    name: 'iPhone 13 series',
    modelName: 'iPhone 13 Mini',
    brandName: 'Apple',
    image: [
      {
        publicId: '5f9a7f5d9d8f6d7f5d8f6d7',
        url: '/phone-test/ip13mini.webp',
      },
    ],
    price: [
      {
        special: 11190000,
        base: 21990000,
      },
    ],
    tags: [],
  },
  {
    name: 'iPhone 13 series',
    modelName: 'iPhone 13 Pro',
    brandName: 'Apple',
    image: [
      {
        publicId: '5f9a7f5d9d8f6d7f5d8f6d7',
        url: '/phone-test/ip13pro.webp',
      },
    ],
    price: [
      {
        special: 25190000,
        base: 30990000,
      },
    ],
    tags: [],
  },
  {
    name: 'iPhone 13 series',
    modelName: 'iPhone 13 Pro Max',
    brandName: 'Apple',
    image: [
      {
        publicId: '5f9a7f5d9d8f6d7f5d8f6d7',
        url: '/phone-test/ip13pro.webp',
      },
    ],
    price: [
      {
        special: 16890000,
        base: 31990000,
      },
    ],
    tags: [],
  },
  {
    name: 'iPhone 12 series',
    modelName: 'iPhone 12',
    brandName: 'Apple',
    image: [
      {
        publicId: '5f9a7f5d9d8f6d7f5d8f6d7',
        url: '/phone-test/ip12.webp',
      },
    ],
    price: [
      {
        special: 12190000,
        base: 15990000,
      },
    ],
    tags: [],
  },
  {
    name: 'iPhone 12 series',
    modelName: 'iPhone 12 Mini',
    brandName: 'Apple',
    image: [
      {
        publicId: '5f9a7f5d9d8f6d7f5d8f6d7',
        url: '/phone-test/ip12mini.webp',
      },
    ],
    price: [
      {
        special: 7190000,
        base: 8990000,
      },
    ],
    tags: [],
  },
  {
    name: 'iPhone 12 series',
    modelName: 'iPhone 12 Pro',
    brandName: 'Apple',
    image: [
      {
        publicId: '5f9a7f5d9d8f6d7f5d8f6d7',
        url: '/phone-test/ip12pro.webp',
      },
    ],
    price: [
      {
        special: 9690000,
        base: 27990000,
      },
    ],
    tags: [],
  },
  {
    name: 'iPhone 12 series',
    modelName: 'iPhone 12 Pro Max',
    brandName: 'Apple',
    image: [
      {
        publicId: '5f9a7f5d9d8f6d7f5d8f6d7',
        url: '/phone-test/ip12pro.webp',
      },
    ],
    price: [
      {
        special: 16890000,
        base: 31990000,
      },
    ],
    tags: [],
  },
  {
    name: 'iPhone 11 series',
    modelName: 'iPhone 11',
    brandName: 'Apple',
    image: [
      {
        publicId: '5f9a7f5d9d8f6d7f5d8f6d7',
        url: '/phone-test/ip11.webp',
      },
    ],
    price: [
      {
        special: 8990000,
        base: 11790000,
      },
    ],
    tags: [],
  },
  {
    name: 'iPhone 11 series',
    modelName: 'iPhone 11 Pro',
    brandName: 'Apple',
    image: [
      {
        publicId: '5f9a7f5d9d8f6d7f5d8f6d7',
        url: '/phone-test/ip11pro.webp',
      },
    ],
    price: [
      {
        special: 12990000,
        base: 15790000,
      },
    ],
    tags: [],
  },
  {
    name: 'iPhone 11 series',
    modelName: 'iPhone 11 Pro Max',
    brandName: 'Apple',
    image: [
      {
        publicId: '5f9a7f5d9d8f6d7f5d8f6d7',
        url: '/phone-test/ip11pro.webp',
      },
    ],
    price: [
      {
        special: 17990000,
        base: 20790000,
      },
    ],
    tags: [],
  },
  {
    name: 'iPhone 14 series',
    modelName: 'iPhone 14',
    brandName: 'Apple',
    image: [
      {
        publicId: '5f9a7f5d9d8f6d7f5d8f6d7',
        url: '/phone-test/ip14.webp',
      },
    ],
    price: [
      {
        special: 17990000,
        base: 23990000,
      },
    ],
    tags: [],
  },
  {
    name: 'iPhone 14 series',
    modelName: 'iPhone 14 Plus',
    brandName: 'Apple',
    image: [
      {
        publicId: '5f9a7f5d9d8f6d7f5d8f6d7',
        url: '/phone-test/ip14Plus.webp',
      },
    ],
    price: [
      {
        special: 24990000,
        base: 32990000,
      },
    ],
    tags: [],
  },
  {
    name: 'iPhone 14 series',
    modelName: 'iPhone 14 Pro',
    brandName: 'Apple',
    image: [
      {
        publicId: '5f9a7f5d9d8f6d7f5d8f6d7',
        url: '/phone-test/ip14pro.webp',
      },
    ],
    price: [
      {
        special: 17390000,
        base: 33990000,
      },
    ],
    tags: [],
  },
  {
    name: 'iPhone 14 series',
    modelName: 'iPhone 14 Pro',
    brandName: 'Apple',
    image: [
      {
        publicId: '5f9a7f5d9d8f6d7f5d8f6d7',
        url: '/phone-test/ip14pro.webp',
      },
    ],
    price: [
      {
        special: 27390000,
        base: 37990000,
      },
    ],
    tags: [],
  },
];
