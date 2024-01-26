import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDataCart } from '@/reducers/cart/actions'; // Asegúrate de tener esta acción importada

import products, { Product } from '@/productsData';

export interface CartItem {
    productCode: number;
    size: number;
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
  handleCartClick: (productCode: number, size: number, color: number) => void;
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

  const removeFromCart = (productCode: number) => {
    const indexToRemove = cartItems.findIndex((item: CartItem) => item.productCode === productCode);
  
    if (indexToRemove !== -1) {
      const updatedCartItems = [
        ...cartItems.slice(0, indexToRemove),
        ...cartItems.slice(indexToRemove + 1)
      ];
  
      setCartItems(updatedCartItems);
      dispatch(setDataCart({ items: updatedCartItems }));
    }
  };

  // FUNCTION FOR CLICK IN ADD CART
  const handleCartClick = (productCode: number, size: number, color: number) => {
    const existingItemIndex = cartItems.findIndex(
      (item) => item.productCode === productCode && item.size === size
    );
  
    if (existingItemIndex !== -1) {
      setCartItems((prevCartItems) => {
        const updatedCartItems = [...prevCartItems];
        updatedCartItems[existingItemIndex] = {
          ...updatedCartItems[existingItemIndex],
          quantity: updatedCartItems[existingItemIndex].quantity + 1
        };
  
        dispatch(setDataCart({ items: updatedCartItems }));
        return updatedCartItems;
      });
    } else {
      const newCartItem = { productCode, size, quantity: 1, color };
      setCartItems((prevCartItems) => {
        const updatedCartItems = [...prevCartItems, newCartItem];
        dispatch(setDataCart({ items: updatedCartItems }));
        return updatedCartItems;
      });
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
    const { cart } = cartData || {};
    if (cart && Array.isArray(cart.items)) {
      setCartItems(cart.items);
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
