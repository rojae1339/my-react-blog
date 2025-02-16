import {createContext, useState} from "react";

export const SearchContext = createContext();

export const SearchContextProvider = ({children}) => {

    const [searchInput, setSearchInput] = useState()

    return (
        <SearchContext.Provider value={{searchInput, setSearchInput}}>
            {children}
        </SearchContext.Provider>
    )
}