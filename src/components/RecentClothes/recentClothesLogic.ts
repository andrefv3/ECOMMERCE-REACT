import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useWishlistContext } from "@/contexts/WishlistContext";
import { useCartContext } from "@/contexts/CartContext";
import { ProductSingle } from "@/graphql/dto/product-single-dto";
import { useLazyQuery } from "@apollo/client";
import { RECENT_PRODUCTS } from "@/graphql/products/products.graphql";

const useRecentClothes = () => {
  const [showSizes, setShowSizes] = useState<{ [productCode: number]: boolean }>({});
  const [selectedColors, setSelectedColors] = useState<{ [productId: string]: string }>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);//THIS STATE SAVE IS LOADING INFORMATION IN BOOLEAN
  const [products, setProducts] = useState<ProductSingle[]>([]);
  const navigate = useNavigate();

  //GRAPHQL QUERIES & MUTATIONS
  const [getALLRecentProducts] = useLazyQuery(RECENT_PRODUCTS) //QUERY GRAPHQL INTANCE, GET ALL PRODUCTS BY FILTER

  // CONTEXTS
  const wishlistContext = useWishlistContext();
  const cartContext = useCartContext();

  useEffect(() => {
    if (isLoading) {
      const executeInitData = async () => {
          await getRecentsProducts();
      };

      executeInitData();
    }
  }, [isLoading]);

  const getRecentsProducts = async () => {
    const { data, loading, error } = await getALLRecentProducts();

    setIsLoading(loading);

    if (data) {
      const RecentProducts = data.getRecentProducts;
      setProducts(RecentProducts);
    }

    if (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Establecer el color por defecto para cada producto si no está definido
    const updatedSelectedColors = { ...selectedColors };
    cartContext.products.forEach(product => {
      const productIdString = product.id.toString();
      if (!(product.id in updatedSelectedColors) && product.colors && product.colors.length > 0) {
          updatedSelectedColors[productIdString] = product.colors[0].id.toString();
      }
    });
    setSelectedColors(updatedSelectedColors);
  }, [cartContext.products]);

  // Manejar el cambio del color seleccionado
  const handleColorChange = (productId: string, colorId: string) => {
    setSelectedColors({ ...selectedColors, [productId]: colorId });
  };

  const handleOpenDetails = (id: number, colorId: string) => {
    navigate(`/${id}/p?color=${colorId}`);
    window.scrollTo(0, 0);
  }

  const handleToggleSizes = (productCode: number, show: boolean) => {
    setShowSizes(prevState => ({ ...prevState, [productCode]: show }));
  };

  return {
    wishlistContext,
    showSizes, 
    cartContext,
    selectedColors,
    products,
    handleColorChange,
    handleToggleSizes,
    handleOpenDetails,
  }
}

export default useRecentClothes;