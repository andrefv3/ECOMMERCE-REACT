import { Product } from "../../Wishlist/dto/wishlistDTO";

export interface RecentClothesDTO {
    products: Product[];
    onSelectedIdxChange: (selectedIdx: number[]) => void;
}