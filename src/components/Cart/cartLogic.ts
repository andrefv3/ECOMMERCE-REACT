import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { CartItem, useCartContext } from "@/contexts/CartContext";
import products from "@/productsData";

const useCart = () => {
    const cartData = useSelector(({ cartData }) => cartData);
    const cartItems = cartData.cart.items;
    const cartContext = useCartContext(); // Obtén el contexto del wishlist
    const cartBoxRef = useRef<HTMLDivElement | null>(null);
    const [filteredProducts, setFilteredProducts] = useState<CartItem[]>([]);
    const totalQuantity = cartItems.reduce((total: any, cartItem: { quantity: any; }) => total + cartItem.quantity, 0);

    const orderTotal = filteredProducts.reduce(
        (total, product) =>
          total + (products.find((item: any) => item.productCode === product.productCode)?.price || 0) * product.quantity,
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
        cartBoxRef,
        cartContext,
    }
}

export default useCart;