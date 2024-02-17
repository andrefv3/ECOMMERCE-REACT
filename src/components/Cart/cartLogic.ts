import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useCartContext } from "@/contexts/CartContext";
import { useWishlistContext } from "@/contexts/WishlistContext";
import { CartItem } from "@/contexts/dto/context.dto";

const useCart = () => {
    const cartData = useSelector(({ cartData }) => cartData);
    const cartItems = cartData.cart.items;
    const cartContext = useCartContext();
    const wishlistContext = useWishlistContext(); // Obtén el contexto del wishlist
    const cartBoxRef = useRef<HTMLDivElement | null>(null);
    const [filteredProducts, setFilteredProducts] = useState<CartItem[]>([]);
    const totalQuantity = cartItems.reduce((total: any, cartItem: { quantity: any; }) => total + cartItem.quantity, 0);
    const products = cartContext.products;

    const orderTotal = filteredProducts.reduce(
        (total, product) =>
          total + (cartContext.products.find((item: any) => Number(item.id) === product.productCode)?.price || 0) * product.quantity,
        0
    );

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as HTMLElement;

            if (cartBoxRef.current && !cartBoxRef.current.contains(target)) {
                cartContext.closeCart();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [cartContext]);

    useEffect(() => {    
        const cartProducts = cartItems.map((item: CartItem) => ({
          productCode: item.productCode,
          size: item.size,
          quantity: item.quantity,
          color: item.color,
        }));
      
        setFilteredProducts(cartProducts);
    }, [cartData]);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    return {
        orderTotal,
        cartItems,
        totalQuantity,
        filteredProducts,
        products,
        cartBoxRef,
        cartContext,
        wishlistContext,
    }
}

export default useCart;