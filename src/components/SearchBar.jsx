import {useLocation} from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import {createContext, useEffect, useRef, useState} from "react";

const SearchBar = () => {
    const loc = useLocation()

    const pathString = loc.pathname.split("/")[1];
    const [input, setInput] = useState();
    const [scroll, setScroll] = useState(false);

    const handleScroll = () => {
        // 스크롤이 Top에서 50px 이상 내려오면 true값을 useState에 넣어줌
        if(window.scrollY >= 20){
            setScroll(true);
            console.log(scroll)
        }else{
            // 스크롤이 50px 미만일경우 false를 넣어줌
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
        <div className={"border-b-[1px] border-gray-300 h-fit flex flex-row align-center items-center justify-between pr-44 pl-10 py-2 text-xs text-gray-600"}>
            <div>
                {pathString ? pathString : "Home"}
            </div>
            <form className={"bg-orange-100 rounded-4xl py-1 flex flex-row items-center px-2 gap-2 w-[300px] text-sm"}>
                <FaSearch />
                <input
                    placeholder={"Search..."}
                    className={"w-52 focus:outline-none"}
                    onChange={e => setInput(e.currentTarget.value)}
                />
                {input === "" ? "" : <MdCancel />}
            </form>
        </div>
    )
}

export default SearchBar