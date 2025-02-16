import Profile from "../components/profile/Profile.jsx";
import SearchBar from "../components/SearchBar.jsx";
import {Outlet, useLocation, useParams} from "react-router-dom";
import HomeRightPanel from "../components/additionalPanel/HomeRightPanel.jsx";

const MainPageLayout = () => {

    const {postTitle} = useParams();

    return (
        <div className="flex flex-row min-h-screen w-full">
            {/* 좌측 프로필 (고정) */}
            <div className="fixed">
                <Profile />
            </div>

            {/* 메인 컨텐츠 영역 (변경되는 부분) */}
            <div className="flex flex-col flex-grow max-w-screen ml-[364px]">
                {postTitle ? <SearchBar isPostDetail={true}/> : <SearchBar isPostDetail={false}/>}
                <div className="flex flex-row w-full">
                    {/* 여기가 페이지별로 변경될 부분 */}
                    <div className="flex-grow max-w-[1000px] pt-12 px-10">
                        <Outlet />  {/* ✅ 페이지별 콘텐츠가 렌더링될 곳 */}
                    </div>

                    {/* 오른쪽 패널 (고정) */}
                    <div className="w-72 sticky top-0 h-screen pt-16">
                        <HomeRightPanel />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainPageLayout