import {useContext} from "react";
import {SearchContext} from "../../context/SearchContextProvider.jsx";

export const useSearch = () => {
    return useContext(SearchContext)
}