import { useCartContext } from "@/contexts/CartContext";
import { useWishlistContext } from "@/contexts/WishlistContext";
import { ProductSingle } from "@/graphql/dto/product-single-dto";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const useWishlist = () => {
    const [selectedSizes, setSelectedSizes] = useState<{ [productCode: number]: number }>({});
    const [selectedColors, setSelectedColors] = useState<{ [productId: string]: string }>({});
    const [showSizes, setShowSizes] = useState<{ [productCode: number]: boolean }>({});
    const [filteredProducts, setFilteredProducts] = useState<ProductSingle[]>([]);
    
    const wishlistContext = useWishlistContext();
    const cartContext = useCartContext();
    const navigate = useNavigate();
    
    const handleSizeSelection = (productCode: number, size: number) => {
        setSelectedSizes((prevSelectedSizes) => ({
            ...prevSelectedSizes,
            [productCode]: size,
        }));
    };

    const handleToggleSizes = (productCode: number, show: boolean) => {
        setShowSizes(prevState => ({ ...prevState, [productCode]: show }));
    };

    const handleMoveToCart = (product: ProductSingle) => {
        const currentSelectedSize = selectedSizes[product.id];
        if (currentSelectedSize) {
            wishlistContext.handleWishlistClick(product.id);
            cartContext.handleCartClick(product.id, currentSelectedSize, 0);
        }
    };

    const handleOpenDetails = (id: number, colorId: string) => {
        navigate(`/${id}/p?color=${colorId}`);
        window.scrollTo(0, 0);
    }

    useEffect(() => {
        if(wishlistContext.products){
            setFilteredProducts(wishlistContext.products);
        }
    }, [wishlistContext])

    useEffect(() => {
        // SET THE DEFAULT COLOR FOR EACH PRODUCT IF IT IS NOT DEFINED
        const updatedSelectedColors = { ...selectedColors };
        filteredProducts.forEach(product => {
            const productIdString = product.id.toString();
            if (!(product.id in updatedSelectedColors) && product.colors && product.colors.length > 0) {
                updatedSelectedColors[productIdString] = product.colors[0].id.toString();
            }
        });
        setSelectedColors(updatedSelectedColors);
    }, [filteredProducts]);

    return {
        handleOpenDetails,
        handleToggleSizes,
        setSelectedSizes,
        handleSizeSelection,
        handleMoveToCart,
        selectedSizes,
        selectedColors,
        filteredProducts,
        showSizes,
        cartContext,
        wishlistContext,
    }
}

export default useWishlist;