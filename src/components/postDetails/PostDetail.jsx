import PostHead from "./PostHead.jsx";
import PostMain from "./PostMain.jsx";
import {useParams} from "react-router-dom";
import {usePosts} from "../hooks/usePosts.js";
import Profile from "../profile/Profile.jsx";
import HomeRightPanel from "../additionalPanel/HomeRightPanel.jsx";
import {findCurrentPost} from "../../const/findCurrentPost.js";

const PostDetail = () => {
    const {postTitle} = useParams();
    const objPosts = usePosts();
    const post = findCurrentPost(postTitle, objPosts);

    return (
        <div
            className="
                flex flex-col flex-grow w-full
                px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16
                pt-4 pb-6
            "
        >
            <PostHead frontmatter={post.frontmatter} content={post.content}/>
            <PostMain content={post.content}/>
        </div>
    );
};

export default PostDetail;


