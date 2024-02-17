import { ProductSingle } from "@/graphql/dto/product-single-dto";

export interface CartItem {
    productCode: number;
    size: string;
    quantity: number;
    color: number;
}
  
export interface CartContextProps {
    products: ProductSingle[];
    isOpenCart: boolean;
    cartItems: CartItem[];
    addedProduct: boolean;
    openCart: () => void;
    closeCart: () => void;
    toggleCart: () => void;
    cantCart: () => number;
    closeAddedProduct: () => void;
    removeFromCart: (productId: number) => void;
    handleCartClick: (productCode: number, size: number, color: number) => void;
}

export interface WishlistContextProps {
    selectedIdx: number[];
    animationKey: boolean;
    handleWishlistClick: (productCode: number) => void;
}

export interface SearchContextProps {
    isOpenSearch: boolean;
    openSearch: () => void;
    closeSearch: () => void;
}
  