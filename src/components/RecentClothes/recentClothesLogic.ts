import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RecentClothesDTO } from "./dto/recentClothesDTO";
import { setDataWishlist } from "../../reducers/wishlist/actions";

const useRecentClothes = (props: RecentClothesDTO) => {
    const [selectedIdx, setSelectedIdx] = useState<number[]>([]);
    const dispatch = useDispatch(); //REDUX STORAGE CALL
    const wishlistData = useSelector(({wishlistData}) => wishlistData);

    useEffect(() => {
        // Función para actualizar selectedIdx a partir de wishlistData
        const updateSelectedIdxFromWishlistData = () => {
          const { updatedSelectedIdx } = wishlistData?.wishlist || {};
          
          // Verifica si updatedSelectedIdx es un array antes de actualizar selectedIdx
          if (Array.isArray(updatedSelectedIdx)) {
            setSelectedIdx(updatedSelectedIdx);
          }
        };
    
        // Llama a la función al cargar el componente para inicializar selectedIdx
        updateSelectedIdxFromWishlistData();
    }, [wishlistData]);

    const handleWishlistClick = (productCode: number) => {
        setSelectedIdx((prevSelectedIdx) => {
            const updatedSelectedIdx = prevSelectedIdx.includes(productCode)
                ? prevSelectedIdx.filter((code) => code !== productCode)
                : [...prevSelectedIdx, productCode];

            // Usar el callback de setSelectedIdx para asegurarse de obtener el valor actualizado
            props.onSelectedIdxChange(updatedSelectedIdx);
            dispatch(setDataWishlist({ updatedSelectedIdx }));

            return updatedSelectedIdx;
        });
    };

    return {
        selectedIdx,
        handleWishlistClick
    }
}

export default useRecentClothes;