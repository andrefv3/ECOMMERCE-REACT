import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDataWishlist } from '@/reducers/wishlist/actions';

interface WishlistContextProps {
  selectedIdx: number[];
  animationKey: boolean;
  handleWishlistClick: (productCode: number) => void;
}

const WishlistContext = createContext<WishlistContextProps | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedIdx, setSelectedIdx] = useState<number[]>([]); // STATE FOR MANAGE ID SELECTED OF WISHLIST
  const [animationKey, setAnimationKey] = useState<boolean>(false);

  const dispatch = useDispatch();
  const wishlistData = useSelector(({ wishlistData }) => wishlistData); //CAPTURE DATA CURRENT OF STORAGE

  // FUNCTION FOR CLICK IN HEART 
  const handleWishlistClick = (productCode: number) => {
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
  
      // UPDATE STATUS WITH NEW LIST OF SELECTED INDEXES
      dispatch(setDataWishlist({ updatedSelectedIdx }));
      setAnimationKey(true);
      
      return updatedSelectedIdx;
    });
  };

  useEffect(() => {
    const hasWishlistItems = Array.isArray(wishlistData?.wishlist?.updatedSelectedIdx) && wishlistData.wishlist.updatedSelectedIdx.length > 0;
    setAnimationKey(hasWishlistItems);
  }, [wishlistData]);

  // USEEFFECT FOR UPDATE DATA IN LOCALSTORAGE
  useEffect(() => {
    const updateSelectedIdxFromWishlistData = () => {
      const { updatedSelectedIdx } = wishlistData?.wishlist || {};
      if (Array.isArray(updatedSelectedIdx)) {
        setSelectedIdx(updatedSelectedIdx);
      }
    };

    updateSelectedIdxFromWishlistData();
  }, [wishlistData]);

  return (
    <WishlistContext.Provider value={{selectedIdx, animationKey, handleWishlistClick }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlistContext = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlistContext debe ser utilizado dentro de un WishlistProvider');
  }
  return context;
};
