import { ReactNode, createContext, useContext, useState } from "react";

interface SearchContextProps {
    isOpenSearch: boolean;
    openSearch: () => void;
    closeSearch: () => void;
}

const SearchContext = createContext<SearchContextProps | undefined>(undefined);

export const SearchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isOpenSearch, setIsOpenSearch] = useState(false); // STATE FOR OPEN/CLOSE SEARCH
    const openSearch = () => setIsOpenSearch(true);
    const closeSearch = () => setIsOpenSearch(false);

    return (
        <SearchContext.Provider value={{ isOpenSearch, openSearch, closeSearch }}>
          {children}
        </SearchContext.Provider>
    );
}

export const useSearchContext = () => {
    const context = useContext(SearchContext);
    if (!context) {
      throw new Error('useSearchContext debe ser utilizado dentro de un SearchProvider');
    }
    return context;
};