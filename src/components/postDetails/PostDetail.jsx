import PostHead from "./PostHead.jsx";
import PostMain from "./PostMain.jsx";
import {useParams} from "react-router-dom";
import {usePosts} from "../hooks/usePosts.js";

const PostDetail = () => {

    const {postTitle} = useParams();
    const objPosts = usePosts();

    const post = objPosts.find(p => {
        const s = p.frontmatter.title;
        return s === postTitle
    });

    return (
        <>
            <PostHead frontmatter={post.frontmatter}/>
            <PostMain content={post.content}/>
        </>
    )
}

export default PostDetail