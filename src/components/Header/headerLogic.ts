import { useEffect, useState } from "react";
import { headerDTO } from "./dto/headerDTO";
import { useWishlistContext } from "@/contexts/WishlistContext";

const useHeader = (props: headerDTO) => {
    const [scrolled, setScrolled] = useState(false);
    const { isOpen, openWishlist, closeWishlist, removeFromWishlist, selectedIdx } = useWishlistContext(); // Usa el contexto del Wishlist

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
    }
}

export default useHeader;