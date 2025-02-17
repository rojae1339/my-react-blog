import {useLocation} from "react-router-dom";
import {FaSearch} from "react-icons/fa";
import {MdCancel} from "react-icons/md";
import {createContext, useContext, useEffect, useRef, useState} from "react";
import {SearchContext} from "../context/SearchContextProvider.jsx";
import {useSearch} from "./hooks/useSearch.js";
import {useSearchBar} from "../context/ScrollContextProvider.jsx";

const SearchBar = ({isPostDetail}) => {
    const loc = useLocation()
    const pathString = loc.pathname.split("/");

    const {searchInput, setSearchInput} = useSearch();
    const {isScrolled} = useSearchBar();

    return (
        <div
            className={`z-20 bg-[#fefbf5] fixed w-full border-b-[1px] border-gray-300 h-[60px] flex flex-row align-center items-center pr-[500px] pl-10 py-2 text-xs text-gray-600 transition-transform duration-700 ease-in-out ${isScrolled ? "-translate-y-full" : "translate-y-0"}`}>
            <div className={"font-bold text-nowrap min-w-32"}>
                {isPostDetail ? decodeURIComponent(pathString[1]) : pathString.length > 2 ? "Home > " + pathString[1] + " > " + pathString[2] : pathString[1] !== "" ? "Home > " + pathString[1] : "Home"}
            </div>
            {!isPostDetail ? (
                <div className={"pl-[750px]"}>
                    <form className={"bg-orange-100 rounded-4xl py-1 flex flex-row items-center px-4 gap-2 w-[300px] text-sm"}>
                        <FaSearch/>
                        <input
                            placeholder={"Search..."}
                            className={"flex-grow w-52 focus:outline-none"}
                            value={searchInput}
                            onChange={e => setSearchInput(e.currentTarget.value)}
                        />
                        {searchInput === "" || searchInput === undefined ? "" :
                            <MdCancel className={`w-fit transition-opacity duration-200 ${searchInput ? "opacity-100 visible" : "opacity-0 invisible"}`} onClick={() => {
                                setSearchInput("")
                            }}/>}
                    </form>
                </div>
            ) : null}
        </div>
    )
}

export default SearchBar