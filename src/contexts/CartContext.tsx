import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDataCart } from '@/reducers/cart/actions';
import { useLazyQuery } from '@apollo/client';
import { ALL_PRODUCTS } from '@/graphql/products/products.graphql';
import { ProductSingle } from '@/graphql/dto/product-single-dto';
import { CartContextProps, CartItem } from './dto/context.dto';

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpenCart, setIsOpenCart] = useState(false); // STATE FOR OPEN/CLOSE CART
  const [isLoadingAllProducts, setIsLoadingAllProducts] = useState(false); //STATE FOR SET DATA PRODUCTS
  const [cartItems, setCartItems] = useState<CartItem[]>([]); // STATE FOR MANAGE ID SELECTED OF CART
  const [addedProduct, setAddedProduct] = useState<boolean>(false);
  const totalQuantity = cartItems.reduce((total: any, cartItem: { quantity: any; }) => total + cartItem.quantity, 0);
  const [products, setProducts] = useState<ProductSingle[]>([]);

  //GRAPHQL QUERIES & MUTATIONS
  const [getAllProducts] = useLazyQuery(ALL_PRODUCTS) //QUERY GRAPHQL INTANCE, GET ALL PRODUCTS BY FILTER

  const getProductsGQL = async () => {
    const { data, loading, error } = await getAllProducts();
    
    setIsLoadingAllProducts(loading);

    if (data) {
      const productsTemp = data.getAllProducts;
      setProducts(productsTemp);
    }

    if (error) {
      console.log(error);
    }
  };

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
    const code = typeof productCode === 'string' ? parseInt(productCode, 10) : productCode;
    const product = products.find(product => product.id === productCode);

    if (product && Array.isArray(product.sizes)) {
      const sizeName = product.sizes.find(sizeP => sizeP.id === size)?.name || 'Unknown Size';

      const existingItemIndex = cartItems.findIndex(
        (item) => item.productCode === code && item.size === sizeName && item.color === color
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
        const newCartItem = { productCode: code, size: sizeName, quantity: 1, color };
        setCartItems((prevCartItems) => {
          const updatedCartItems = [...prevCartItems, newCartItem];
          dispatch(setDataCart({ items: updatedCartItems }));
          return updatedCartItems;
        });
        setAddedProduct(true);
      }
    } else {
      console.error("Error: No se pudo encontrar el producto o el tamaño del producto no es un array.");
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

  useEffect(() => {
    const executeInitData = async () => {
      await getProductsGQL();
    };

    executeInitData();
  }, [isLoadingAllProducts]);
  
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
