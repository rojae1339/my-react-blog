import {frontmatterMapper} from "../util/frontmatterMapper.js";
import PostSimple from "../components/postSimple/PostSimple.jsx";
import Profile from "../components/profile/Profile.jsx";
import {usePosts} from "../components/hooks/usePosts.js";
import PostList from "../components/postSimple/PostList.jsx";

const HomePage = () => {

    return (
        <div className={"flex flex-row"}>
            <Profile />
            <PostList />
        </div>
    )
}

export default HomePage