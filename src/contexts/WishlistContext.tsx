// En el archivo WishlistContext.tsx
import { setDataWishlist } from '@/reducers/wishlist/actions';
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Importa tus datos de productos aquí
import products, { Product } from '@/productsData';

interface WishlistContextProps {
  products: Product[]; // Asegúrate de tener una interfaz para Product según tus datos reales
  isOpen: boolean;
  selectedIdx: number[];
  openWishlist: () => void;
  closeWishlist: () => void;
  toggleWishlist: () => void;
  removeFromWishlist: (productId: number) => void;
  handleWishlistClick: (productCode: number) => void; // Nueva función para manejar clics en wishlist
}

const WishlistContext = createContext<WishlistContextProps | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState<number[]>([]);

  const dispatch = useDispatch(); //REDUX STORAGE CALL
  const wishlistData = useSelector(({wishlistData}: any) => wishlistData);

  const openWishlist = () => setIsOpen(true);
  const closeWishlist = () => setIsOpen(false);
  const toggleWishlist = () => setIsOpen((prev) => !prev);

  const removeFromWishlist = (productCode: number) => {
    const updatedSelectedIdx = wishlistData?.wishlist?.updatedSelectedIdx;
    
    if (Array.isArray(updatedSelectedIdx)) {
      // Filtra los productos que tienen IDs presentes en updatedSelectedIdx
      const updatedWishlistData = updatedSelectedIdx.filter((id: number) => id !== productCode);
  
      // Dispatch a la acción para actualizar el estado
      dispatch(setDataWishlist({updatedSelectedIdx: updatedWishlistData}));
    }
  };

  // Nueva función para manejar clics en wishlist
  const handleWishlistClick = (productCode: number) => {
    setSelectedIdx((prevSelectedIdx) => {
      const updatedSelectedIdx = prevSelectedIdx.includes(productCode)
        ? prevSelectedIdx.filter((code) => code !== productCode)
        : [...prevSelectedIdx, productCode];

      // Usar el callback de setSelectedIdx para asegurarse de obtener el valor actualizado
      dispatch(setDataWishlist({ updatedSelectedIdx }));
      return updatedSelectedIdx;
    });
  };

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
