import {useParams} from "react-router-dom";
import PostDetail from "../components/postDetails/PostDetail.jsx";

const PostDetailPage = () => {
    const param = useParams();

    return (
        <PostDetail />
    )
}

export default PostDetailPage