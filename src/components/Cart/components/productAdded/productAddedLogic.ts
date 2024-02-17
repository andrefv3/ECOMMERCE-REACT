import { useCartContext } from "@/contexts/CartContext";
import { useEffect, useRef, useState } from "react";
import { productAddedDTO } from "./dto/productAddedDTO";
import { ProductSingle } from "@/graphql/dto/product-single-dto";

const useProductAdded = (props: productAddedDTO) => {
    const [isVisible, setIsVisible] = useState(false);
    const isMouseOverRef = useRef(false);
    const cartContext = useCartContext();
    const addedProduct: ProductSingle | undefined = cartContext.products.find((product: ProductSingle) => Number(product.id) === props.productCode);
    const closeTimeoutId = useRef<number | null>(null);

    const viewCart = () => {
        cartContext.closeAddedProduct();
        cartContext.openCart();
    };

    const handleMouseEnter = () => {
        isMouseOverRef.current = true;
        setIsVisible(true);
        clearTimeout(closeTimeoutId.current!);
    };

    const handleMouseLeave = () => {
        isMouseOverRef.current = false;
        closeTimeoutId.current = window.setTimeout(() => {
            setIsVisible(false);
            cartContext.closeAddedProduct();
        }, isMouseOverRef.current ? 0 : 3000);
    };

    useEffect(() => {
        const timeoutId = window.setTimeout(() => {
            if (!isMouseOverRef.current) {
                setIsVisible(true);
            }
        }, 2000);
    
        const timeoutIdClose = window.setTimeout(() => {
            if (!isMouseOverRef.current) {
                setIsVisible(false);
                cartContext.closeAddedProduct();
            }
        }, 7000);
    
        closeTimeoutId.current = timeoutIdClose;
    
        return () => {
            clearTimeout(timeoutId);
            if (closeTimeoutId.current) {
                clearTimeout(closeTimeoutId.current);
            }
        };
    }, [isMouseOverRef.current, cartContext]);

    return {
        isVisible,
        addedProduct,
        cartContext,
        viewCart,
        handleMouseEnter,
        handleMouseLeave
    }
}

export default useProductAdded;