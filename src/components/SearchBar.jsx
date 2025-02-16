import {useLocation} from "react-router-dom";
import {FaSearch} from "react-icons/fa";
import {MdCancel} from "react-icons/md";
import {createContext, useContext, useEffect, useRef, useState} from "react";
import {SearchContext} from "../context/SearchContextProvider.jsx";
import {useSearch} from "./hooks/useSearch.js";

const SearchBar = ({isPostDetail}) => {
    const loc = useLocation()
    const pathString = loc.pathname.split("/")[1];

    const {searchInput, setSearchInput} = useSearch();
    const [scroll, setScroll] = useState(false);

    const handleScroll = () => {
        if (window.scrollY >= 60) {
            setScroll(true);
        } else {
            setScroll(false);
        }

    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll); //clean up
        };
    })

    return (
        <div
            className={`z-20 bg-[#fefbf5] fixed w-full border-b-[1px] border-gray-300 h-[60px] flex flex-row align-center items-center pr-[500px] pl-10 py-2 text-xs text-gray-600 transition-transform duration-700 ease-in-out ${scroll ? "-translate-y-full" : "translate-y-0"}`}>
            <div className={"font-bold text-nowrap min-w-32"}>
                {isPostDetail ? decodeURIComponent(pathString) : pathString ? "Home > " + pathString : "Home"}
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