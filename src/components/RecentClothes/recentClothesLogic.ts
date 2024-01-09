import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { useWishlistContext } from "@/contexts/WishlistContext";

const useRecentClothes = () => {
    const [selectedIdx, setSelectedIdx] = useState<number[]>([]);
    const wishlistData = useSelector(({wishlistData}) => wishlistData);
    const [showSizes, setShowSizes] = useState<{ [productCode: number]: boolean }>({});
    const navigate = useNavigate();

    const wishlistContext = useWishlistContext();

    useEffect(() => {
        // Función para actualizar selectedIdx a partir de wishlistData
        const updateSelectedIdxFromWishlistData = () => {
          const { updatedSelectedIdx } = wishlistData?.wishlist || {};
          
          // Verifica si updatedSelectedIdx es un array antes de actualizar selectedIdx
          if (Array.isArray(updatedSelectedIdx)) {
            setSelectedIdx(updatedSelectedIdx);
          }
        };
    
        // Llama a la función al cargar el componente para inicializar selectedIdx
        updateSelectedIdxFromWishlistData();
    }, [wishlistData]);

    const handleOpenDetails = (id: number) => {
        // Redireccionar a la ruta /id/p
        navigate(`/${id}/p`);
        window.scrollTo(0, 0);
    }

    const handleToggleSizes = (productCode: number, show: boolean) => {
      setShowSizes(prevState => ({ ...prevState, [productCode]: show }));
    };

    return {
        selectedIdx,
        wishlistContext,
        showSizes, 
        handleToggleSizes,
        handleOpenDetails,
    }
}

export default useRecentClothes;