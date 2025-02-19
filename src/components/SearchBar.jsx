import {useLocation} from "react-router-dom";
import {FaSearch} from "react-icons/fa";
import {MdCancel} from "react-icons/md";
import {useSearch} from "./hooks/useSearch.js";
import {useSearchBar} from "../context/ScrollContextProvider.jsx";
import {useMenuTogle} from "../context/MobileProfileTogleContextProvider.jsx";

const SearchBar = ({isPostDetail}) => {
    const loc = useLocation();
    const pathString = loc.pathname.split("/");
    const {searchInput, setSearchInput} = useSearch();
    const {isScrolled} = useSearchBar();

    return (
        <div
            className={`
                z-20 bg-[#fefbf5] fixed w-full border-b-[1px] md:-ml-[15px] border-gray-300 h-[60px] 
                flex flex-row justify-between items-center pr-8 sm:pr-10 md:pr-[400px] pl-10 py-2 
                text-xs text-gray-600 
                md:transition-transform md:duration-700 md:ease-in-out
                ${isScrolled ? "md:-translate-y-full" : "translate-y-0"}
            `}
        >

            {/* 📌 현재 페이지 경로 표시 */}
            <div className="font-bold text-nowrap min-w-fit truncate">
                {isPostDetail
                    ? decodeURIComponent(pathString[1])
                    : pathString.length > 2
                        ? "Home > " + pathString[1] + " > " + pathString[2]
                        : pathString[1] !== ""
                            ? "Home > " + pathString[1]
                            : "Home"
                }
            </div>

            {/* 📌 검색바 (홈 화면에서만 표시) */}
            {pathString[1] === "" && (
                <div>
                    <form className="bg-orange-100 rounded-4xl py-1 flex items-center px-4 gap-2
                        w-[180px] sm:w-[220px] md:w-[250px] lg:w-[280px] xl:w-[300px] text-sm">

                        {/* 🔍 돋보기 아이콘 */}
                        <FaSearch className="flex-shrink-0" />

                        {/* 🔤 입력 필드 */}
                        <input
                            placeholder="Search..."
                            className="flex-grow min-w-0 focus:outline-none bg-transparent"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.currentTarget.value)}
                        />

                        {/* ❌ X 아이콘 (검색어 있을 때만 보임) */}
                        {searchInput && (
                            <MdCancel
                                className="flex-shrink-0 cursor-pointer"
                                onClick={() => setSearchInput("")}
                            />
                        )}
                    </form>
                </div>
            )}
        </div>
    );
};

export default SearchBar;
