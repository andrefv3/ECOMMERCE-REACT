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
        const replicatedProducts = cartItems.reduce((acc: any, item: any) => {
          // Buscamos el producto original en cartContext.products
          const originalProduct = cartContext.products.find((product) => product.productCode === item.productCode);
      
          // Replicamos el producto según su cantidad, manteniendo la información de talla
          for (let i = 0; i < item.quantity; i++) {
            acc.push({
              ...originalProduct,
              size: item.size,
              color: item.color,
            });
          }
          return acc;
        }, []);
      
        setFilteredProducts(replicatedProducts);
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