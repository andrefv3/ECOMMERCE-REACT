export interface ProductSingle {
    id: number;
    reference: string;
    name: string;
    price: number;
    images: Images[];
    sizes: Sizes[];
    colors: Colors[];
    category: Category[];
}

export interface Sizes {
    id: number;
    name: string;
    stockQuantity: number;
}

export interface Colors {
    id: number,
    name: string,
    codeHex: string,
    image?: string
}

export interface Category {
    id: number,
    name: string
}

export interface Images {
    name: string,
    url: string,
    seqNum: number,
    colorId: number
}