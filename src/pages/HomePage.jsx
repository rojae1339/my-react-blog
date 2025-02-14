import {frontmatterMapper} from "../util/frontmatterMapper.js";
import PostSimple from "../components/postList/PostSimple.jsx";
import Profile from "../components/profile/Profile.jsx";
import {usePosts} from "../components/hooks/usePosts.js";
import PostList from "../components/postList/PostList.jsx";
import SearchBar from "../components/SearchBar.jsx";
import HomeRightPanel from "../components/additionalPanel/HomeRightPanel.jsx";


const HomePage = () => {
    return (
        <div className="flex flex-row min-h-screen w-full">
            {/* 좌측 프로필 */}
            <Profile />

            {/* 메인 컨텐츠 (SearchBar + PostList + HomeRightPanel) */}
            <div className="flex flex-col flex-grow max-w-screen">
                <SearchBar />
                <div className="flex flex-row w-full">
                    {/* 포스트 리스트 */}
                    <div className="flex-grow max-w-[1300px]">
                        <PostList />
                    </div>

                    {/* 오른쪽 패널 (스크롤 고정) */}
                    <div className="w-72 sticky top-0 h-screen">
                        <HomeRightPanel />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;