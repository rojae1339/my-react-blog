import {usePosts} from "../components/hooks/usePosts.js";

export const findCurrentPost = (targetValue, posts) => {

    return posts.find(p => {
        const s = p.frontmatter.title;
        return s === targetValue
    });
}