import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Product } from "@/productsData";
import { useCartContext } from "@/contexts/CartContext";

const useCart = () => {
    const cartData = useSelector(({ cartData }) => cartData);
    const cartItems = cartData.cart.items;
    const cartContext = useCartContext(); // Obtén el contexto del wishlist
    const cartBoxRef = useRef<HTMLDivElement | null>(null);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const totalQuantity = cartItems.reduce((total: any, cartItem: { quantity: any; }) => total + cartItem.quantity, 0);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as HTMLElement;

            // Verifica si el clic fue fuera del wishlistBox
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
        const cartProducts = cartItems.map((item: any) => {
            const originalProduct = cartContext.products.find((product) => product.productCode === item.productCode);
            return {
                ...originalProduct,
                size: item.size,
                color: item.color,
                quantity: item.quantity,
            };
        });
    
        setFilteredProducts(cartProducts);
    }, [cartItems, cartContext.products]);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    return {
        cartItems,
        totalQuantity,
        filteredProducts,
        cartBoxRef,
        cartContext,
    }
}

export default useCart;