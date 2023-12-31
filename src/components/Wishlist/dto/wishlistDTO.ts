import { Product } from "@/productsData";

export interface wishlistDTO {
    onClose: () => void;
    onSelectedIdxChange: (updatedSelectedIdx: number) => void;
    selectedIdx: number[];
    products: Product[];
}