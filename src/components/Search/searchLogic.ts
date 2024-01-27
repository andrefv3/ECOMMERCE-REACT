import { useCartContext } from "@/contexts/CartContext";
import { useSearchContext } from "@/contexts/SearchContext";
import { useWishlistContext } from "@/contexts/WishlistContext";
import { ProductFilter } from "@/graphql/dto/filter-product-dto";
import { SEARCH_PRODUCTS } from "@/graphql/products/products.graphql";
import { useLazyQuery } from "@apollo/client";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const useSearch = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);//THIS STATE SAVE IS LOADING INFORMATION IN BOOLEAN

    const [search, setSearch] = useState<string>('');
    const [searched, setSearched] = useState<boolean>(false);
    const [scrollTop, setScrollTop] = useState(0);   
    const [suggestions, setSuggestions] = useState<ProductFilter[]>([]);
    const [selectedColors, setSelectedColors] = useState<{ [productId: string]: string }>({});

    const [filteredProducts, setFilteredProducts] = useState<ProductFilter[]>([]);
    const [count, setCount] = useState<number>();
    const [showSizes, setShowSizes] = useState<{ [productCode: number]: boolean }>({});
    const [page] = useState<number>(1);
    const [maxCount] = useState<number>(10);

    //GRAPHQL QUERIES & MUTATIONS
    const [getAllProductsFilter] = useLazyQuery(SEARCH_PRODUCTS) //QUERY GRAPHQL INTANCE, GET ALL PRODUCTS BY FILTER
  
    const BoxSearchRef = useRef<HTMLDivElement>(null);
    const [boxSearchHeight, setBoxSearchHeight] = useState(0);
    const { isOpenSearch } = useSearchContext();
    const wishlistContext = useWishlistContext();
    const cartContext = useCartContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoading && searched && search) {
            const executeInitData = async () => {
                await getAllProductsByWord(search, page, maxCount);
            };

            executeInitData();
        }
    }, [isLoading, searched, search, page, maxCount]);

    useEffect(() => {
        if (searched && search.length === 0) {
            setSuggestions([]);
            setSearched(false);
            setFilteredProducts([]);
        }
    }, [search]);

    useEffect(() => {
        // Establecer el color por defecto para cada producto si no está definido
        const updatedSelectedColors = { ...selectedColors };
        filteredProducts.forEach(product => {
            const productIdString = product.id.toString();
            if (!(product.id in updatedSelectedColors) && product.colors && product.colors.length > 0) {
                updatedSelectedColors[productIdString] = product.colors[0].id.toString();
            }
        });
        setSelectedColors(updatedSelectedColors);
    }, [filteredProducts]);

    // Manejar el cambio del color seleccionado
    const handleColorChange = (productId: string, colorId: string) => {
        setSelectedColors({ ...selectedColors, [productId]: colorId });
    };

    const getAllProductsByWord = async (name: string, page: number, maxCount: number) => {
        const { data, loading, error } = await getAllProductsFilter({
            variables: { object: { name, page, maxCount } },
        });

        setIsLoading(loading);

        if (data) {
            const filterProducts = data.getProductsByFilter.listObject;
            const count = data.getProductsByFilter.count;
            setFilteredProducts(filterProducts);
            setCount(count);
            console.log(filteredProducts);
        }

        if (error) {
            console.log(error);
        }

        // setSuggestions(data.getProductsByFilter.listObject);
    };

    useEffect(() => {
        const handleOverflow = () => {
          if (isOpenSearch || search) {
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
          } else {
            document.body.style.overflow = 'auto';
            document.documentElement.style.overflow = 'auto';
          }
        };
    
        handleOverflow();
    
        return () => {
          document.body.style.overflow = 'auto';
          document.documentElement.style.overflow = 'auto';
        };
    }, [isOpenSearch, search]);

    useEffect(() => {
        const handleScroll = () => {
          setScrollTop(window.scrollY);
        };
    
        // Suscripción al evento de scroll
        window.addEventListener('scroll', handleScroll);
    
        // Limpieza del evento al desmontar el componente
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        if (BoxSearchRef.current) {
          const height = BoxSearchRef.current.getBoundingClientRect().height;
          setBoxSearchHeight(height);
        }
    }, [BoxSearchRef]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = event.target.value.toLowerCase();
        setSearch(searchTerm);
    
        if (searchTerm.length < 2) {
            setSuggestions([]);
            return;
        }
    };

    const handleEnterKeyPress = async (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            setSuggestions([]);
            setSearched(true);
            await getAllProductsByWord(search, page, maxCount);
        }
    };
    
    const handleSuggestionClick = (suggestion: ProductFilter) => {
        setSearch(suggestion.name);
        setSuggestions([]); 
        setSearched(true);
        setBoxSearchHeight(0);
    };

    const handleClearSearch = () => {
        setSearch('');
        setSuggestions([]);
        setSearched(false);
        setFilteredProducts([]);
    };

    const handleOpenDetails = (id: number, colorId: string) => {
        const color = parseInt(colorId)
        navigate(`/${id}/p?colorId=${color}`);
        window.scrollTo(0, 0);
        const SearchContext = useSearchContext();
        SearchContext.closeSearch();
    }

    const handleToggleSizes = (productCode: number, show: boolean) => {
      setShowSizes(prevState => ({ ...prevState, [productCode]: show }));
    };

    return {
        search,
        searched,
        filteredProducts,
        scrollTop,
        boxSearchHeight,
        BoxSearchRef,
        suggestions,
        showSizes,
        wishlistContext ,
        cartContext,
        count,
        selectedColors,
        handleColorChange,
        handleInputChange,
        handleEnterKeyPress,
        handleSuggestionClick,
        handleClearSearch,
        handleOpenDetails,
        handleToggleSizes
    }
}

export default useSearch;