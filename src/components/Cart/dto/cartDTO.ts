import { CartItem } from "@/contexts/CartContext";
import { Product } from "@/productsData";

export interface cartDTO {
    onClose: () => void;
    onSelectedIdxChange: (updatedSelectedIdx: number) => void;
    cartItems: CartItem[];
    products: Product[];
}
