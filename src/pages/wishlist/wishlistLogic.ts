import { useCartContext } from "@/contexts/CartContext";
import { useWishlistContext } from "@/contexts/WishlistContext";
import { Product } from "@/productsData";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const useWishlist = () => {
    const [selectedSizes, setSelectedSizes] = useState<{ [productCode: number]: number }>({});
    const [selectedColors, setSelectedColors] = useState<{ [productId: string]: string }>({});
    const [selectedIdx, setSelectedIdx] = useState<number[]>([]);
    const [showSizes, setShowSizes] = useState<{ [productCode: number]: boolean }>({});
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    
    const wishlistData = useSelector(({ wishlistData }: any) => wishlistData);
    const wishlistContext = useWishlistContext();
    const cartContext = useCartContext();
    const navigate = useNavigate();
    
    const handleSizeSelection = (productCode: number, size: number) => {
        setSelectedSizes((prevSelectedSizes) => ({
            ...prevSelectedSizes,
            [productCode]: size,
        }));
    };

    const handleToggleSizes = (productCode: number, show: boolean) => {
        setShowSizes(prevState => ({ ...prevState, [productCode]: show }));
    };

    const handleMoveToCart = (product: Product) => {
        const currentSelectedSize = selectedSizes[product.id];
        if (currentSelectedSize) {
            wishlistContext.removeFromWishlist(product.id);
            cartContext.handleCartClick(product.id, currentSelectedSize, 0);
        }
    };

    const handleOpenDetails = (id: number, colorId: string) => {
        navigate(`/${id}/p?color=${colorId}`);
        window.scrollTo(0, 0);
    }

    useEffect(() => {
        // Función para actualizar selectedIdx a partir de wishlistData
        const updateSelectedIdxFromWishlistData = () => {
          const { updatedSelectedIdx } = wishlistData?.wishlist || {};
          
          // Verifica si updatedSelectedIdx es un array antes de actualizar selectedIdx
          if (Array.isArray(updatedSelectedIdx)) {
            const parsedIdx = updatedSelectedIdx.map(item => parseInt(item, 10));
            setSelectedIdx(parsedIdx);
          }
        };
    
        // Llama a la función al cargar el componente para inicializar selectedIdx
        updateSelectedIdxFromWishlistData();
    }, [wishlistData]);

    useEffect(() => {
        const { updatedSelectedIdx } = wishlistData?.wishlist || {};
            if (Array.isArray(updatedSelectedIdx)) {
            const filtered = wishlistContext.products.filter((product) =>
                updatedSelectedIdx.includes(product.id)
            );

            setFilteredProducts(filtered);
        }
    }, [wishlistData, wishlistContext]);

    useEffect(() => {
        // Establecer el color por defecto para cada producto si no está definido
        const updatedSelectedColors = { ...selectedColors };
        filteredProducts.forEach(product => {
            const productIdString = product.id.toString();
            if (!(product.id in updatedSelectedColors) && product.colors && product.colors.length > 0) {
                updatedSelectedColors[productIdString] = product.colors[0].id.toString();
            }
        });
        setSelectedColors(updatedSelectedColors);
    }, [filteredProducts]);

    return {
        handleOpenDetails,
        handleToggleSizes,
        setSelectedSizes,
        handleSizeSelection,
        handleMoveToCart,
        selectedSizes,
        selectedColors,
        filteredProducts,
        showSizes,
        cartContext,
        wishlistContext,
        selectedIdx, 
    }
}

export default useWishlist;