import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDataWishlist } from '@/reducers/wishlist/actions';
import { useLazyQuery, useMutation } from '@apollo/client';
import { ADD_PRODUCT_WISHLIST, GET_ITEMS_WISHLIST } from '@/graphql/wishlist/wishlist.graphql';
import { ProductSingle } from '@/graphql/dto/product-single-dto';
import { WishlistContextProps } from './dto/context.dto';
import Cookies from 'js-cookie';

// Crear el contexto del Wishlist
const WishlistContext = createContext<WishlistContextProps | undefined>(undefined);

// Proveedor del Wishlist
export const WishlistProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedIdx, setSelectedIdx] = useState<number[]>([]); // Estado para gestionar los IDs seleccionados del Wishlist
  const [animationKey, setAnimationKey] = useState<boolean>(false);
  const [products, setProducts] = useState<ProductSingle[]>([]); // Estado para gestionar los productos del Wishlist
  const wishlistData = useSelector(({ wishlistData }) => wishlistData); // Captura los datos actuales del almacenamiento
  const wishlistID = Cookies.get('dt_wsl');
  const dispatch = useDispatch();

  //GRAPHQL QUERIES & MUTATIONS
  const [mutationAddRemoveProduct] = useMutation(ADD_PRODUCT_WISHLIST);
  const [queryGetItemsWishlist] = useLazyQuery(GET_ITEMS_WISHLIST);

  // Función para manejar el clic en el corazón
  const handleWishlistClick = (productCode: number) => {
    if(wishlistID){
      setSelectedIdx((prevSelectedIdx) => {
        // CHECK IF THE PRODUCTCODE IS ALREADY IN PREVSELECTEDIDX
        const isProductSelected = prevSelectedIdx.includes(parseInt(productCode.toString()));
        let updatedSelectedIdx: number[];
    
        if (isProductSelected) {
          // IF THE PRODUCTCODE IS ALREADY IN PREVSELECTEDIDX, REMOVE IT FROM THE LIST
          updatedSelectedIdx = prevSelectedIdx.filter((code) => code !==  parseInt(productCode.toString()));
        } else {
          // IF THE PRODUCTCODE IS NOT IN PREVSELECTEDIDX, ADD IT TO THE LIST
          updatedSelectedIdx = [...prevSelectedIdx, parseInt(productCode.toString())];
        }
  
        // Ejecutar la mutación para agregar o quitar el producto del wishlist
        mutationAddRemoveProduct({
          variables: {
            object: {
              wishlistId: wishlistID,
              productId: productCode.toString()
            }
          }
        });

        // Actualizar el estado con la nueva lista de índices seleccionados
        dispatch(setDataWishlist({ updatedSelectedIdx }));
        setAnimationKey(true);
  
        return updatedSelectedIdx;
      });
    }
  };

  useEffect(() => {
    const hasWishlistItems = Array.isArray(wishlistData?.wishlist?.updatedSelectedIdx) && wishlistData.wishlist.updatedSelectedIdx.length > 0;
    setAnimationKey(hasWishlistItems);
  }, [wishlistData]);

  // useEffect para actualizar datos en el almacenamiento local
  useEffect(() => {
    const updateSelectedIdxFromWishlistData = () => {
      const { updatedSelectedIdx } = wishlistData?.wishlist || {};
      if (Array.isArray(updatedSelectedIdx)) {
        setSelectedIdx(updatedSelectedIdx);
      }
    };

    updateSelectedIdxFromWishlistData();
  }, [wishlistData]);

  useEffect(() => {
    if (wishlistID) {
      const getDataWishlist = async (wslID: string) => {
        try {
          const { data } = await queryGetItemsWishlist({
            variables: { wishlistId: wslID },
          });
    
          if (data) {
            const productsData = data.getItemsWishlist;
    
            // Extraer los IDs de los productos
            const updatedSelectedIdx: number[] = productsData.map((product: ProductSingle) => Number(product.id));
    
            // Guardar los IDs en el estado
            dispatch(setDataWishlist({ updatedSelectedIdx }));
            setProducts(productsData);
          }
        } catch (error) {
          console.error('Error fetching wishlist items:', error);
        }
      };

      getDataWishlist(wishlistID);
    }
  }, [wishlistID]);

  return (
    <WishlistContext.Provider value={{products, selectedIdx, animationKey, handleWishlistClick }}>
      {children}
    </WishlistContext.Provider>
  );
};

// Hook personalizado para acceder al contexto del Wishlist
export const useWishlistContext = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlistContext debe ser utilizado dentro de un WishlistProvider');
  }
  return context;
};
