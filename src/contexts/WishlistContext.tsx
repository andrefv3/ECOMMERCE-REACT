import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDataWishlist } from '@/reducers/wishlist/actions';

import products, { Product } from '@/productsData';

interface WishlistContextProps {
  products: Product[];
  isOpen: boolean;
  selectedIdx: number[];
  openWishlist: () => void;
  closeWishlist: () => void;
  toggleWishlist: () => void;
  removeFromWishlist: (productId: number) => void;
  handleWishlistClick: (productCode: number) => void;
}

const WishlistContext = createContext<WishlistContextProps | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false); // STATE FOR OPEN/CLOSE WISHLIST
  const [selectedIdx, setSelectedIdx] = useState<number[]>([]); // STATE FOR MANAGE ID SELECTED OF WISHLIST

  const dispatch = useDispatch();
  const wishlistData = useSelector(({ wishlistData }) => wishlistData); //CAPTURE DATA CURRENT OF STORAGE

  const openWishlist = () => setIsOpen(true);
  const closeWishlist = () => setIsOpen(false);
  const toggleWishlist = () => setIsOpen((prev) => !prev);

  // FUNCTION FOR DELETE PRODUCTS OF WISHLIST
  const removeFromWishlist = (productCode: number) => {
    const updatedSelectedIdx = wishlistData?.wishlist?.updatedSelectedIdx;
    const updatedWishlistData = Array.isArray(updatedSelectedIdx) ? updatedSelectedIdx.filter((id: number) => id !== productCode) : [];
    dispatch(setDataWishlist({ updatedSelectedIdx: updatedWishlistData }));
  };

  // FUNCTION FOR CLICK IN HEART 
  const handleWishlistClick = (productCode: number) => {
    setSelectedIdx((prevSelectedIdx) => {
      const updatedSelectedIdx = prevSelectedIdx.includes(productCode) ? prevSelectedIdx.filter((code) => code !== productCode) : [...prevSelectedIdx, productCode];
      dispatch(setDataWishlist({ updatedSelectedIdx }));
      return updatedSelectedIdx;
    });
  };

  // USEEFFECT FOR UPDATE DATA IN LOCALSTORAGE
  useEffect(() => {
    const { updatedSelectedIdx } = wishlistData?.wishlist || {};
    if (Array.isArray(updatedSelectedIdx)) {
      setSelectedIdx(updatedSelectedIdx);
    }
  }, [wishlistData]);

  return (
    <WishlistContext.Provider value={{ products, isOpen, selectedIdx, openWishlist, closeWishlist, toggleWishlist, removeFromWishlist, handleWishlistClick }}>
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
