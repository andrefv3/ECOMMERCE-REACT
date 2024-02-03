import { useEffect, useState } from "react";
import { headerDTO } from "./dto/headerDTO";
import { useWishlistContext } from "@/contexts/WishlistContext";
import { useCartContext } from "@/contexts/CartContext";
import { useSearchContext } from "@/contexts/SearchContext";

const useHeader = (props: headerDTO) => {
    const [scrolled, setScrolled] = useState(false);
    const { animationKey } = useWishlistContext(); // CONTEXT FOR WISHLIST
    const { isOpenCart, addedProduct, openCart, closeCart, removeFromCart, cartItems } = useCartContext(); // CONTEXT FOR CART
    const { isOpenSearch, openSearch, closeSearch } = useSearchContext();
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

    return {
        scrolled,
        //WISHLIST
        animationKey,
        //CART
        isOpenCart, 
        cartItems,
        addedProduct,
        productAdded,
        openCart, 
        closeCart,
        removeFromCart,
        //SEARCH
        isOpenSearch, 
        openSearch, 
        closeSearch
    }
}

export default useHeader;