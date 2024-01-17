import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { XCircleIcon } from "@heroicons/react/24/solid";
import './search.css';
import { useEffect, useState } from "react";
import { useSearchContext } from "@/contexts/SearchContext";

export const SearchComponent: React.FC<any> = () => {
    const [search, setSearch] = useState<string>('');
    const { isOpenSearch } = useSearchContext();

    useEffect(() => {
        if (isOpenSearch) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpenSearch]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    const handleClearSearch = () => {
        setSearch('');
    };

    return (
        <section id="Search-wrapper">
            <div className="content--wrapper">
                <div className="controls">
                    <div className="search_bar">
                        <MagnifyingGlassIcon className="colorIcon"/>
                        <input 
                            type="search" 
                            id="search" 
                            value={search}
                            onChange={handleInputChange}
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

                <section className="grid__area">
                    <div className="recommended">
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
                    </div>
                </section>

            </div>
        </section>
    );
}