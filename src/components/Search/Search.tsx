import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { useEffect, useRef, useState } from "react";
import { useSearchContext } from "@/contexts/SearchContext";
import './search.css';
import products, { Product } from "@/productsData";

export const SearchComponent: React.FC<any> = () => {
    const [search, setSearch] = useState<string>('');
    const [scrollTop, setScrollTop] = useState(0);
    const [boxSearchHeight, setBoxSearchHeight] = useState(0);
    const [suggestions, setSuggestions] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [searched, setSearched] = useState<boolean>(false);
    const BoxSearchRef = useRef<HTMLDivElement>(null);
    const { isOpenSearch } = useSearchContext();

    useEffect(() => {
        // Filtrar productos que coincidan con el término de búsqueda
        const matchingProducts = products.filter(product =>
          product.name.toLowerCase().includes(search.toLowerCase())
        );
    
        setFilteredProducts(matchingProducts);
    }, [search]);

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
    
        // Filtrar productos que coincidan con el término de búsqueda
        const matchingProducts = products.filter(product =>
          product.name.toLowerCase().includes(searchTerm)
        );
    
        setSuggestions(matchingProducts);
    };

    const handleEnterKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
          setSuggestions([]);
          setSearched(true);
        }
    };
    
    const handleSuggestionClick = (suggestion: Product) => {
        setSearch(suggestion.name);
        setSuggestions([]); 
        setSearched(true);
    };

    const handleClearSearch = () => {
        setSearch('');
        setSuggestions([]);
        setSearched(false);
    };

    return (
        <section id="Search-wrapper" className={search ? 'no-overflow' : ''}>
            {search && !searched && (
                <div className="contain-pop" style={{ top: `${scrollTop}px` }}></div>
            )}
            <div className="containHeader" ref={BoxSearchRef}>
                <div className="controls">
                    <div className="search_bar">
                        <MagnifyingGlassIcon className="colorIcon"/>
                        <input 
                            type="search" 
                            id="search" 
                            value={search}
                            onChange={handleInputChange}
                            onKeyDown={handleEnterKeyPress}
                            enterKeyHint="search" 
                            autoComplete="off" 
                            className="is-capitalized" 
                            placeholder="¿QUÉ ESTÁS BUSCANDO?"
                        />
                        {search && (
                            <button className="btnDeleteWords" onClick={handleClearSearch}>
                                <XCircleIcon className="colorIcon" />
                            </button>
                        )}
                    </div>
                </div>

                {suggestions.length > 0 && (
                    <div className="suggestions">
                        <ul className="suggestions__list">
                            {suggestions.map((product) => (
                            <li 
                                className="suggestion__item" 
                                key={product.productCode}
                                onClick={() => handleSuggestionClick(product)}
                            >
                                <MagnifyingGlassIcon className="icon--suggestion" />
                                <a className="suggestion__link">
                                    <span className="highlight">{product.name}</span>
                                </a>
                            </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            <div className="content--wrapper" style={{ marginTop: `${boxSearchHeight + 80}px` }}>
                <section className="grid__area">
                    <div className="recommended">
                        {!searched && (
                            <>
                                <h1>RECOMENDADO PARA TI</h1>
                                <div className="scroll_products">
                                    <div className="grid-container">
                                        {Array.from({ length: 15 }, (_, index) => (
                                        <div className="grid-product" key={index}>
                                            <div className="example"></div>
                                        </div>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}

                        {searched && filteredProducts.length > 0 && (
                            <div className="filtered-products">
                                <ul>
                                {filteredProducts.map((product) => (
                                    <li key={product.productCode}>{product.name}</li>
                                ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </section>
    );
}