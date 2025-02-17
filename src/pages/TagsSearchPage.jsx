import {useParams, useSearchParams} from "react-router-dom";
import PostList from "../components/postList/PostList.jsx";
import {usePosts} from "../components/hooks/usePosts.js";
import {useSortedPostsAndTags} from "../components/hooks/useSortedPostsAndTags.js";

const TagsSearchPage = () => {

    const {tag} = useParams();

    const {tagWithCount} = useSortedPostsAndTags();

    console.log(tagWithCount[tag]);

    return (
        <PostList tagTitle={tag} tagCount={tagWithCount[tag]}/>
    )
}

export default TagsSearchPage