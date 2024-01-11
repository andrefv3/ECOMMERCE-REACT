import { useEffect, useState } from "react";
import { headerDTO } from "./dto/headerDTO";
import { useWishlistContext } from "@/contexts/WishlistContext";
import { useCartContext } from "@/contexts/CartContext";

const useHeader = (props: headerDTO) => {
    const [scrolled, setScrolled] = useState(false);
    const { isOpen, openWishlist, closeWishlist, removeFromWishlist, selectedIdx } = useWishlistContext(); // CONTEXT FOR WISHLIST
    const { isOpenCart, addedProduct, openCart, closeCart, removeFromCart, cartItems } = useCartContext(); // CONTEXT FOR CART
    const productAdded = cartItems[cartItems.length - 1];

    if(props.type === "main"){
        useEffect(() => {
            const handleScroll = () => {
            const isScrolled = window.scrollY > 0;
            setScrolled(isScrolled);
            };
    
            window.addEventListener('scroll', handleScroll);
    
            return () => {
            window.removeEventListener('scroll', handleScroll);
            };
        }, []);
    }

    useEffect(() => {
        // Abre el wishlist automáticamente al cargar el componente Header
        props.toggleWishlist();
    }, []);

    return {
        scrolled,
        //WISHLIST
        isOpen, 
        selectedIdx,
        openWishlist, 
        closeWishlist, 
        removeFromWishlist, 
        //CART
        isOpenCart, 
        cartItems,
        addedProduct,
        productAdded,
        openCart, 
        closeCart,
        removeFromCart,
    }
}

export default useHeader;