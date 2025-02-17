import Panel from "./Panel.jsx";
import {usePosts} from "../hooks/usePosts.js";
import {useLocation, useParams} from "react-router-dom";
import {findCurrentPost} from "../../const/findCurrentPost.js";
import {extractHeadings} from "../../const/extractHeadings.js";
import {useSortedPostsAndTags} from "../hooks/useSortedPostsAndTags.js";
import {useSearchBar} from "../../context/ScrollContextProvider.jsx";

const maxTrendingTagCount = 4;
const maxRecentlyPostCount = 7;

const HomeRightPanel = () => {

    const objPosts = usePosts();
    const {sortedPosts, tagWithCount} = useSortedPostsAndTags();
    const {postTitle} = useParams();
    const {isScrolled} = useSearchBar();

    if (!objPosts || objPosts.length === 0) return null;

    const dateFilteredPosts = sortedPosts.slice(0, maxRecentlyPostCount);

    const topTags = Object.entries(tagWithCount)?.sort((a, b) => b[1] - a[1]).slice(0, maxTrendingTagCount);

    const currentPost = findCurrentPost(postTitle, objPosts);
    const headings = currentPost ? extractHeadings(currentPost.content) : [];

    return (
        <div className={`flex flex-col gap-10 transition-transform duration-700 ease-in-out ${isScrolled ? "-translate-y-[60px]" : "translate-y-0"}`}>
            <Panel panelTitle={"Recently Post"} posts={dateFilteredPosts}/>
            <Panel panelTitle={"Trending tags"} tag={topTags}/>
            {postTitle ? <Panel panelTitle={"Content"} headings={headings}/> : null}
        </div>
    )
}

export default HomeRightPanel