import { useCartContext } from "@/contexts/CartContext";
import { useWishlistContext } from "@/contexts/WishlistContext";
import { ProductSingle } from "@/graphql/dto/product-single-dto";
import { PRODUCT_SINGLE } from "@/graphql/products/products.graphql";
import { useLazyQuery } from "@apollo/client";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

const useDetailsProduct = () => {
    const [containerFixed, setContainerFixed] = useState(false);
    const [selectSize, setSelectSize] = useState<number | null>(null);
    const [hovered, setHovered] = useState(false);
    const infoCProductRef = useRef<HTMLDivElement | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);//THIS STATE SAVE IS LOADING INFORMATION IN BOOLEAN

    const wishlistContext = useWishlistContext();
    const cartContext = useCartContext();

    const { id } = useParams<{ id: string }>();
    const { colorId } = useParams<{ colorId: string }>();
    const [product, setProduct] = useState<ProductSingle>();

    //GRAPHQL QUERIES & MUTATIONS
    const [getProduct] = useLazyQuery(PRODUCT_SINGLE) //QUERY GRAPHQL INTANCE, GET PRODUCT INFO

    useEffect(() => {
        if (isLoading && id && colorId) {
            const executeInitData = async () => {
                await getOneProduct(id, colorId);
            };

            executeInitData();
        }
    }, [isLoading]);

    const getOneProduct = async (productId: string, colorId: string) => {
        const color = parseInt(colorId);
        const { data, loading, error } = await getProduct({
            variables: { object: { productId, colorId: color } },
        });

        setIsLoading(loading);

        if (data) {
            const productSingle = data.getProductById;
            setProduct(productSingle);
        }

        if (error) {
            console.log(error);
        }
    };

    const handleSizeClick = (size: number) => {
        setSelectSize(size);
    };

    const handleAddToCart = (productCode: number) => {
        const colorId = parseInt(new URLSearchParams(window.location.search).get('colorId') || '0');

        if (selectSize) {
            cartContext.handleCartClick(productCode, selectSize, colorId);
            setSelectSize(null);
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            if (infoCProductRef.current) {
                const infoCProductRect = infoCProductRef.current.getBoundingClientRect();

                setContainerFixed(infoCProductRect.top <= 0);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return {
        infoCProductRef,
        product,
        selectSize,
        containerFixed,
        handleSizeClick,
        handleAddToCart,
        hovered,
        setHovered,
        wishlistContext
    };
};

export default useDetailsProduct;
