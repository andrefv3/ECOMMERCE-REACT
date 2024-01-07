import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Product } from "./dto/wishlistDTO";
import { useWishlistContext } from "@/contexts/WishlistContext";

const useWishlist = () => {
    const wishlistData = useSelector(({wishlistData}: any) => wishlistData);
    const wishlistContext = useWishlistContext(); // Obtén el contexto del wishlist
    const wishlistBoxRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as HTMLElement;

            // Verifica si el clic fue fuera del wishlistBox
            if (wishlistBoxRef.current && !wishlistBoxRef.current.contains(target)) {
                wishlistContext.closeWishlist();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [wishlistContext]);

    console.log(wishlistData)
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

    useEffect(() => {
        const { updatedSelectedIdx } = wishlistData?.wishlist || {};
          
        if (Array.isArray(updatedSelectedIdx)) {
            const filtered = wishlistContext.products.filter((product) => updatedSelectedIdx.includes(product.productCode));
      
            setFilteredProducts(filtered);
        }
    }, [wishlistData, wishlistContext]);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    return {
        filteredProducts,
        wishlistBoxRef,
        wishlistContext,
    }
}

export default useWishlist;