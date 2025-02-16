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
        <div className={"px-10 pt-4 pb-6"}>
            <PostHead frontmatter={post.frontmatter}/>
            <PostMain content={post.content}/>
        </div>
    )
}

export default PostDetail