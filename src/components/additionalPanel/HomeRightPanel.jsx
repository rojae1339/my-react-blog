import Panel from "./Panel.jsx";
import {usePosts} from "../hooks/usePosts.js";
import {useLocation, useParams} from "react-router-dom";

const HomeRightPanel = () => {

    const objPosts = usePosts();
    const {postTitle} = useParams();

    if (!objPosts || objPosts.length === 0) return null;

    const dateFilteredPosts = objPosts
        .sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date)) // 최신 날짜 기준 정렬
        .slice(0, 7);

    const tagsWithCount = {}

    objPosts.forEach(fmContent => {
        const tags = fmContent.frontmatter.tag; // 태그 배열 가져오기
        if (!Array.isArray(tags)) return; // 태그가 배열이 아닐 경우 예외 처리

        tags.forEach(tag => {
            tagsWithCount[tag] = (tagsWithCount[tag] || 0) + 1;
        });
    });

    return (
        <div className={"flex flex-col gap-10"}>
            <Panel panelTitle={"Recently Post"} dateFilteredPost={dateFilteredPosts}/>
            <Panel panelTitle={"Trending tags"} isTag={true} tags={Object.entries(tagsWithCount)}/>
            {postTitle ? <Panel /> : null}
        </div>
    )
}

export default HomeRightPanel