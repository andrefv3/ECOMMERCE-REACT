export interface wishlistDTO {
    onClose: () => void;
    onSelectedIdxChange: (updatedSelectedIdx: number) => void;
    selectedIdx: number[];
    products: Product[];
}

export interface Product {
    productCode: number;
    name: string;
    price: string;
    imageUrl: string;
}