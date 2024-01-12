import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDataCart } from '@/reducers/cart/actions'; // Asegúrate de tener esta acción importada

import products, { Product } from '@/productsData';

export interface CartItem {
    productCode: number;
    size: string;
    quantity: number;
    color: number;
}

interface CartContextProps {
  products: Product[];
  isOpenCart: boolean;
  cartItems: CartItem[];
  addedProduct: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  cantCart: () => number;
  closeAddedProduct: () => void;
  removeFromCart: (productId: number) => void;
  handleCartClick: (productCode: number, size: string, color: number) => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpenCart, setIsOpenCart] = useState(false); // STATE FOR OPEN/CLOSE CART
  const [cartItems, setCartItems] = useState<CartItem[]>([]); // STATE FOR MANAGE ID SELECTED OF CART
  const [addedProduct, setAddedProduct] = useState<boolean>(false);
  const totalQuantity = cartItems.reduce((total: any, cartItem: { quantity: any; }) => total + cartItem.quantity, 0);

  const dispatch = useDispatch();
  const cartData = useSelector(({ cartData }) => cartData); // CAPTURE DATA CURRENT OF STORAGE

  const openCart = () => setIsOpenCart(true);
  const closeCart = () => setIsOpenCart(false);
  const toggleCart = () => setIsOpenCart((prev) => !prev);

  // FUNCTION FOR DELETE PRODUCTS OF CART
  const removeFromCart = (productCode: number) => {
    // Encuentra el índice del elemento a eliminar
    const indexToRemove = cartItems.findIndex((item) => item.productCode === productCode);

    if (indexToRemove !== -1) {
        // Crea una nueva array sin el elemento que quieres eliminar
        const updatedCartItems = [...cartItems.slice(0, indexToRemove), ...cartItems.slice(indexToRemove + 1)];
        
        // Actualiza el estado local
        setCartItems(updatedCartItems);

        // Actualiza el estado global (si es necesario)
        dispatch(setDataCart({ items: updatedCartItems }));
    }
  };

  // FUNCTION FOR CLICK IN ADD CART
  const handleCartClick = (productCode: number, size: string, color: number) => {
    const existingItem = cartItems.find(
      (item) => item.productCode === productCode && item.size === size
    );
  
    if (existingItem) {
      const updatedCartItems = cartItems.map((item) =>
        item === existingItem
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCartItems(updatedCartItems);
    } else {
      const newCartItem = { productCode, size, quantity: 1, color };
      setCartItems([...cartItems, newCartItem]);
      dispatch(setDataCart({ items: [...cartItems, newCartItem] }));
      setAddedProduct(true);
    }
  };

  const closeAddedProduct = () => {
    setAddedProduct(false);
  }

  const cantCart = () => {
    return totalQuantity;
  }

  useEffect(() => {
    const { updatedSelectedIdx } = cartData || {};
    if (Array.isArray(updatedSelectedIdx)) {
      setCartItems(updatedSelectedIdx);
    }
  }, [cartData]);
  
  return (
    <CartContext.Provider value={{ products, isOpenCart, cartItems, addedProduct, cantCart, closeAddedProduct, openCart, closeCart, toggleCart, removeFromCart, handleCartClick }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCartContext debe ser utilizado dentro de un CartProvider');
  }
  return context;
};
