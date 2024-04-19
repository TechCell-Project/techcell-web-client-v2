import ipbase from "@/public/phone-test/15-base.jpg";
import ippro from "@/public/phone-test/15-pro.jpg";
import ippromax from "@/public/phone-test/15-promax.jpg";
import flipbase from "@/public/phone-test/flip5-base.jpg";
import flipplus from "@/public/phone-test/flip5-plus.jpg";
import flipultra from "@/public/phone-test/flip5-ultra.jpg";


export type PhoneProps = {
    name: string;
    description: string;
    spuId?: string;
    spuModelSlug?: string;
    price: PriceChildren[];
    image: ImgChildren[];
    status: string;
    attributes: AttributesChildren[];
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

export type AttributesChildren = {
    name: string;
    k: string;
    v: string;
    u?: string;
};

export const PHONE_TEST: PhoneProps[] = [
    {
        name: "iPhone 15 128GB 8GB RAM",
        description: "This is iPhone 15 128GB 8GB RAM",
        spuId: "",
        spuModelSlug: "base",
        price: [
            {
                base: 20000000,
                special: 19000000
            }
        ],
        image: [
            {
                publicId: "5f9a7f5d9d8f6d7f5d8f6d7",
                url: ipbase.src
            }
        ],
        status: "selling",
        attributes: [
            {
                name: "RAM",
                k: "ram",
                v: "8",
                u: "GB",
            },
            {
                name: "Bộ nhớ trong",
                k: "ram",
                v: "128",
                u: "GB",
            }
        ],
        tags: [
            "5f9a7f5d9d8f6d7f5d8f6d7"
        ]
    },
    {
        name: "iPhone 15 Pro 256GB 12GB RAM",
        description: "This is iPhone 15 Pro 256GB 12GB RAM",
        spuId: "",
        spuModelSlug: "pro",
        price: [
            {
                base: 23000000,
                special: 20000000
            }
        ],
        image: [
            {
                publicId: "5f9a7f5d9d8f6d7f5d8f6d7",
                url: ippro.src
            }
        ],
        status: "selling",
        attributes: [
            {
                name: "RAM",
                k: "ram",
                v: "12",
                u: "GB",
            },
            {
                name: "Bộ nhớ trong",
                k: "ram",
                v: "256",
                u: "GB",
            }
        ],
        tags: [
            "5f9a7f5d9d8f6d7f5d8f6d7"
        ]
    },
    {
        name: "iPhone 15 Pro Max 512GB 16GB RAM",
        description: "This is iPhone 15 Pro Max 512GB 16GB RAM",
        spuId: "",
        spuModelSlug: "pro",
        price: [
            {
                base: 25000000,
                special: 22000000
            }
        ],
        image: [
            {
                publicId: "5f9a7f5d9d8f6d7f5d8f6d7",
                url: ippromax.src
            }
        ],
        status: "selling",
        attributes: [
            {
                name: "RAM",
                k: "ram",
                v: "16",
                u: "GB",
            },
            {
                name: "Bộ nhớ trong",
                k: "ram",
                v: "512",
                u: "GB",
            }
        ],
        tags: [
            "5f9a7f5d9d8f6d7f5d8f6d7"
        ]
    },
    {
        name: "Samsung Galaxy Z Flip5 128GB 8GB RAM",
        description: "This is Samsung Galaxy Z Flip5 128GB 8GB RAM",
        spuId: "",
        spuModelSlug: "base",
        price: [
            {
                base: 22000000,
                special: 20000000
            }
        ],
        image: [
            {
                publicId: "5f9a7f5d9d8f6d7f5d8f6d7",
                url: flipbase.src
            }
        ],
        status: "selling",
        attributes: [
            {
                name: "RAM",
                k: "ram",
                v: "8",
                u: "GB",
            },
            {
                name: "Bộ nhớ trong",
                k: "ram",
                v: "128",
                u: "GB",
            }
        ],
        tags: [
            "5f9a7f5d9d8f6d7f5d8f6d7"
        ]
    },
    {
        name: "Samsung Galaxy Z Flip5+ 256GB 12GB RAM",
        description: "This is Samsung Galaxy Z Flip5+ 256GB 12GB RAM",
        spuId: "",
        spuModelSlug: "plus",
        price: [
            {
                base: 25000000,
                special: 23000000
            }
        ],
        image: [
            {
                publicId: "5f9a7f5d9d8f6d7f5d8f6d7",
                url: flipplus.src
            }
        ],
        status: "selling",
        attributes: [
            {
                name: "RAM",
                k: "ram",
                v: "12",
                u: "GB",
            },
            {
                name: "Bộ nhớ trong",
                k: "ram",
                v: "256",
                u: "GB",
            }
        ],
        tags: [
            "5f9a7f5d9d8f6d7f5d8f6d7"
        ]
    },
    {
        name: "Samsung Galaxy Z Flip5 Ultra 512GB 16GB RAM",
        description: "This is Samsung Galaxy Z Flip5 Ultra 512GB 16GB RAM",
        spuId: "",
        spuModelSlug: "ultra",
        price: [
            {
                base: 29000000,
                special: 28000000
            }
        ],
        image: [
            {
                publicId: "5f9a7f5d9d8f6d7f5d8f6d7",
                url: flipultra.src
            }
        ],
        status: "selling",
        attributes: [
            {
                name: "RAM",
                k: "ram",
                v: "16",
                u: "GB",
            },
            {
                name: "Bộ nhớ trong",
                k: "ram",
                v: "512",
                u: "GB",
            }
        ],
        tags: [
            "5f9a7f5d9d8f6d7f5d8f6d7"
        ]
    }
];