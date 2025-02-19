import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import {NavItems} from "../../const/profileConsts.js";
import {useMenuTogle} from "../../context/MobileProfileTogleContextProvider.jsx";

const ProfileNavs = () => {
    const [hoveredNav, setHoveredNav] = useState(null);  // 현재 호버된 아이템
    const location = useLocation();
    const{isMenuOpen, setIsMenuOpen} = useMenuTogle()

    return (
        <ul className="list-style-none pt-14 w-full">
            {NavItems.map((item, index) => {
                const isActive = location.pathname === item.path;
                const isHovered = hoveredNav === item.path;

                return (
                    <li key={`nav_${index}`} className="relative">
                        <Link
                            to={item.path}
                            className={`pl-2 flex flex-row gap-5 w-full h-10 items-center text-sm cursor-pointer
                                ${isHovered ? "border-r-4 text-amber-700" : ""}
                                ${!hoveredNav && isActive ? "bg-[#f9ece1] border-r-4 text-amber-700 font-extrabold" : ""}
                                transition-all duration-75 ease-linear
                            `}
                            onMouseEnter={() => setHoveredNav(item.path)}
                            onMouseLeave={() => setHoveredNav(null)}
                            onClick={() => {
                                setIsMenuOpen(false)
                                window.scrollTo({top: 0, behavior: "smooth"})
                            }}
                        >
                            <item.icon />
                            <span>{item.name}</span>
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
};

export default ProfileNavs;
