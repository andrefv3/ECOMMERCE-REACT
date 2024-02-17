import { CartItem } from "@/contexts/dto/context.dto";

export interface cartDTO {
    onClose: () => void;
    onSelectedIdxChange: (updatedSelectedIdx: number) => void;
    cartItems: CartItem[];
}
