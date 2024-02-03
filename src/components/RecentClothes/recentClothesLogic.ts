import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { useWishlistContext } from "@/contexts/WishlistContext";
import { useCartContext } from "@/contexts/CartContext";
import products from "@/productsData";

const useRecentClothes = () => {
    const [selectedIdx, setSelectedIdx] = useState<number[]>([]);
    const wishlistData = useSelector(({wishlistData}) => wishlistData);
    const [showSizes, setShowSizes] = useState<{ [productCode: number]: boolean }>({});
    const [selectedColors, setSelectedColors] = useState<{ [productId: string]: string }>({});
    const navigate = useNavigate();

    const wishlistContext = useWishlistContext();
    const cartContext = useCartContext();

    useEffect(() => {
      // Establecer el color por defecto para cada producto si no está definido
      const updatedSelectedColors = { ...selectedColors };
      products.forEach(product => {
          const productIdString = product.id.toString();
          if (!(product.id in updatedSelectedColors) && product.colors && product.colors.length > 0) {
              updatedSelectedColors[productIdString] = product.colors[0].id.toString();
          }
      });
      setSelectedColors(updatedSelectedColors);
    }, [products]);

    // Manejar el cambio del color seleccionado
    const handleColorChange = (productId: string, colorId: string) => {
      setSelectedColors({ ...selectedColors, [productId]: colorId });
    };

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

    const handleOpenDetails = (id: number, colorId: string) => {
      navigate(`/${id}/p?color=${colorId}`);
      window.scrollTo(0, 0);
    }

    const handleToggleSizes = (productCode: number, show: boolean) => {
      setShowSizes(prevState => ({ ...prevState, [productCode]: show }));
    };

    return {
        selectedIdx,
        wishlistContext,
        showSizes, 
        cartContext,
        selectedColors,
        handleColorChange,
        handleToggleSizes,
        handleOpenDetails,
    }
}

export default useRecentClothes;