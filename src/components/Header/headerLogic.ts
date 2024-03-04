import { useEffect, useState } from "react";
import { headerDTO } from "./dto/headerDTO";
import { useWishlistContext } from "@/contexts/WishlistContext";
import { useCartContext } from "@/contexts/CartContext";
import { useSearchContext } from "@/contexts/SearchContext";

const useHeader = (props: headerDTO) => {
    const [scrolled, setScrolled] = useState(false);
    const [isWhiteColor, setIsWhiteColor] = useState(true);
    const { animationKey } = useWishlistContext(); // CONTEXT FOR WISHLIST
    const { isOpenCart, addedProduct, openCart, closeCart, removeFromCart, cartItems } = useCartContext(); // CONTEXT FOR CART
    const { isOpenSearch, openSearch, closeSearch } = useSearchContext();
    const productAdded = cartItems[cartItems.length - 1];

    const getColorHeader = () => {
        if (!isWhiteColor) {
            return '#000';
        } else {
            return (!isOpenSearch && !scrolled && props.type === 'main') ? "#fff" : "#000";
        }
    };

    const getClassColor = () => {
        if (!isWhiteColor) {
            return 'text-gray-900';
        } else {
            return (!isOpenSearch && !scrolled && props.type === 'main') ? "c-white" : "text-gray-900";
        }
    }

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
        if(props.isWhite === 'false'){
            setIsWhiteColor(false);
        }else {
            setIsWhiteColor(true);
        }
    }, [props.isWhite])

    return {
        scrolled,
        isWhiteColor,
        getClassColor,
        getColorHeader,
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