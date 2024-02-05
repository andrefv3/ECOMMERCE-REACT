import { useCartContext } from "@/contexts/CartContext";
import { useWishlistContext } from "@/contexts/WishlistContext";
import { ProductSingle } from "@/graphql/dto/product-single-dto";
import { PRODUCT_SINGLE } from "@/graphql/products/products.graphql";
import { useLazyQuery } from "@apollo/client";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const useDetailsProduct = () => {
    const [containerFixed, setContainerFixed] = useState(false);
    const [selectSize, setSelectSize] = useState<number | null>(null);
    const [hovered, setHovered] = useState(false);
    const infoCProductRef = useRef<HTMLDivElement | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);//THIS STATE SAVE IS LOADING INFORMATION IN BOOLEAN
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState<{ x: number, y: number }>({ x: 0, y: 0 });
    const [scrollOffset, setScrollOffset] = useState<{ x: number, y: number }>({ x: 0, y: 0 });
    const [zoomedIndex, setZoomedIndex] = useState<number | null>(null);

    const wishlistContext = useWishlistContext();
    const cartContext = useCartContext();

    const { id } = useParams<{ id: string }>();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const color = searchParams.get("color");
    const [colorIdFromParams, setColorIdFromParams] = useState('');
    const [product, setProduct] = useState<ProductSingle>();
    const navigate = useNavigate();

    //GRAPHQL QUERIES & MUTATIONS
    const [getProduct] = useLazyQuery(PRODUCT_SINGLE) //QUERY GRAPHQL INTANCE, GET PRODUCT INFO

    useEffect(() => {
        if (id && color) {
            const executeInitData = async () => {
                await getOneProduct(id, color);
            };
            executeInitData();
        }
    }, [id, color]);

    const getOneProduct = async (productId: string | undefined, colorId: string | undefined) => {
        const colorIdToUse = colorId ? colorId : colorIdFromParams;
    
        if (colorId) {
            setColorIdFromParams(colorId);
        }
       
        const { data, loading, error } = await getProduct({
            variables: { object: { productId, colorId: parseInt(colorIdToUse) } },
        });
    
        setIsLoading(loading);
    
        if (data) {
            const productSingle = data.getProductById;
            setProduct(productSingle);
        }
    
        if (error) {
            console.log("ERROR GRAPHQL => ", error);
        }
    };

    const handleSizeClick = (size: number) => {
        setSelectSize(size);
    };

    const handleColorClick = (color: number) => {
        const newColorId = color.toString();
        setColorIdFromParams(newColorId);
    
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set('color', newColorId);
    
        const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
        window.history.replaceState(null, '', newUrl);
    
        if(newUrl){
            getOneProduct(id, newColorId);
        }
    };

    const handleAddToCart = (productCode: number) => {
        const colorId = parseInt(new URLSearchParams(window.location.search).get('colorId') || '0');

        if (selectSize) {
            cartContext.handleCartClick(productCode, selectSize, colorId);
            setSelectSize(null);
        }
    };

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (zoomedIndex !== null) {
                const deltaX = e.clientX - dragStart.x;
                const deltaY = e.clientY - dragStart.y;
        
                setScrollOffset(prevOffset => ({
                    x: prevOffset.x + deltaX,
                    y: prevOffset.y + deltaY
                }));
        
                setDragStart({ x: e.clientX, y: e.clientY });
            }
        };
        
        const handleMouseUp = () => {
            setIsDragging(false);
        };
        
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, dragStart]);

    const handleMouseDown = (e: React.MouseEvent<HTMLImageElement>) => {
        setIsDragging(true);
        setDragStart({ x: e.clientX, y: e.clientY });
    };

    const toggleZoom = (index: number) => {
        if (zoomedIndex === index) {
            setZoomedIndex(null);
        } else {
            setZoomedIndex(index);
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

    useEffect(() => {
        if (product && product.images.length === 0) {
            navigate(`/not-found`);
            window.scrollTo(0, 0);
        }
    }, [product, navigate, isLoading]);

    return {
        infoCProductRef,
        product,
        selectSize,
        containerFixed,
        colorIdFromParams,
        zoomedIndex,
        handleSizeClick,
        handleAddToCart,
        handleMouseDown,
        handleColorClick,
        toggleZoom,
        scrollOffset,
        hovered,
        setHovered,
        wishlistContext
    };
};

export default useDetailsProduct;
