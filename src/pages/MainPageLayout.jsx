import Profile from "../components/profile/Profile.jsx";
import SearchBar from "../components/SearchBar.jsx";
import {Outlet, useLocation, useParams} from "react-router-dom";
import HomeRightPanel from "../components/additionalPanel/HomeRightPanel.jsx";
import {useState} from "react";
import {useMenuTogle} from "../context/MobileProfileTogleContextProvider.jsx";

const MainPageLayout = () => {

    const {postTitle} = useParams();
    const {isMenuOpen, setIsMenuOpen} = useMenuTogle();

    return (
        <div className="flex flex-row min-h-screen w-full">
            {isMenuOpen && (
                <div
                    className="fixed inset-0 bg-gray-500 opacity-50 z-30 md:hidden"
                    onClick={() => setIsMenuOpen(false)}
                ></div>
            )}

            {/* 햄버거 메뉴 버튼 (모바일) */}
            <button
                className="mobile-menu-btn absolute top-4 left-4 z-50 md:hidden"
                onClick={() => {
                    setIsMenuOpen(!isMenuOpen)
                }}
            >
                ☰
            </button>

            {/* 좌측 프로필 (고정) */}
            <div className={`profile-container fixed z-40 bg-white h-full transition-transform ${isMenuOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>
                <Profile/>
            </div>

            {/* 메인 컨텐츠 영역 (변경되는 부분) */}
            <div className="flex flex-col flex-grow max-w-screen md:ml-[364px]">
                {postTitle ? <SearchBar isPostDetail={true}/> : <SearchBar isPostDetail={false}/>}
                <div className="flex flex-row w-full">
                    {/* 여기가 페이지별로 변경될 부분 */}
                    <div className="flex-grow max-w-[1000px] pt-12 overflow-hidden">
                        <Outlet/> {/* ✅ 페이지별 콘텐츠가 렌더링될 곳 */}
                    </div>

                    {/* 오른쪽 패널 (고정) */}
                    <div className="right-panel w-72 sticky top-0 h-screen pt-16 hidden md:block">
                        <HomeRightPanel/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainPageLayout