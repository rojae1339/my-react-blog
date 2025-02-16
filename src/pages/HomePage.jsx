import {frontmatterMapper} from "../util/frontmatterMapper.js";
import PostSimple from "../components/postList/PostSimple.jsx";
import Profile from "../components/profile/Profile.jsx";
import {usePosts} from "../components/hooks/usePosts.js";
import PostList from "../components/postList/PostList.jsx";
import SearchBar from "../components/SearchBar.jsx";
import HomeRightPanel from "../components/additionalPanel/HomeRightPanel.jsx";
import {useSearch} from "../components/hooks/useSearch.js";


const HomePage = () => {


    return (
        <PostList/>
    );
};

export default HomePage;