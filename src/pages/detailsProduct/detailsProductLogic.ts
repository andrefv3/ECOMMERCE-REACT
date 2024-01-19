import { useCartContext } from "@/contexts/CartContext";
import { useWishlistContext } from "@/contexts/WishlistContext";
import products, { Product } from "@/productsData";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

const useDetailsProduct = () => {
    const [containerFixed, setContainerFixed] = useState(false);
    const [selectSize, setSelectSize] = useState<string | null>(null);
    const [hovered, setHovered] = useState(false);
    const infoCProductRef = useRef<HTMLDivElement | null>(null);

    const wishlistContext = useWishlistContext();
    const cartContext = useCartContext();

    const { id } = useParams<{ id?: string }>();
    const productId = id ? parseInt(id, 10) : 0;
    const product: Product | undefined = productId ? products.find((p) => p.id === productId) : undefined;

    const handleSizeClick = (size: string) => {
        setSelectSize(size);
    };

    const handleAddToCart = (productCode: number) => {
        const colorId = parseInt(new URLSearchParams(window.location.search).get('colorId') || '0');

        if (selectSize) {
            cartContext.handleCartClick(productCode, selectSize, colorId);
            setSelectSize(null);
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            if (infoCProductRef.current) {
                const infoCProductRect = infoCProductRef.current.getBoundingClientRect();

                setContainerFixed(infoCProductRect.top <= 0);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return {
        infoCProductRef,
        product,
        selectSize,
        containerFixed,
        handleSizeClick,
        handleAddToCart,
        hovered,
        setHovered,
        wishlistContext
    };
};

export default useDetailsProduct;
