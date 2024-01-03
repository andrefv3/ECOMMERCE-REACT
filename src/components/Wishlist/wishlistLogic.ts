import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Product, wishlistDTO } from "./dto/wishlistDTO";
import { setDataWishlist } from "../../reducers/wishlist/actions";

const useWishlist = (props: wishlistDTO) => {
    const dispatch = useDispatch(); //REDUX STORAGE CALL
    const wishlistData = useSelector(({wishlistData}: any) => wishlistData);
    const wishlistBoxRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as HTMLElement;

            // Verifica si el clic fue fuera del wishlistBox
            if (wishlistBoxRef.current && !wishlistBoxRef.current.contains(target)) {
                props.onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [props.onClose]);

    console.log(wishlistData)
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

    useEffect(() => {
        const { updatedSelectedIdx } = wishlistData?.wishlist || {};
          
        // Verifica si updatedSelectedIdx es un array antes de actualizar selectedIdx
        if (Array.isArray(updatedSelectedIdx)) {
            // Filtra los productos que tienen IDs presentes en wishlistData.updatedSelectedIdx
            const filtered = props.products.filter((product) => updatedSelectedIdx.includes(product.productCode));
      
            // Actualiza el estado con los productos filtrados
            setFilteredProducts(filtered);
        }
    }, [wishlistData]);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    const handleRemoveFromWishlist = (productCode: number) => {
        const updatedSelectedIdx = wishlistData?.wishlist?.updatedSelectedIdx;
    
        if (Array.isArray(updatedSelectedIdx)) {
            // Filtra los productos que tienen IDs presentes en updatedSelectedIdx
            const updatedWishlistData = updatedSelectedIdx.filter((id: number) => id !== productCode);
    
            // Dispatch a la acción para actualizar el estado
            dispatch(setDataWishlist({updatedSelectedIdx: updatedWishlistData}));
    
            // Llama a la función proporcionada para actualizar cualquier otro estado necesario
            props.onSelectedIdxChange(productCode);
        }
    };

    return {
        filteredProducts,
        wishlistBoxRef,
        handleRemoveFromWishlist
    }
}

export default useWishlist;