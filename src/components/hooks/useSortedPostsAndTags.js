import { usePosts } from "../hooks/usePosts.js";

export const useSortedPostsAndTags = () => {
    const objPosts = usePosts();

    if (!objPosts || objPosts.length === 0) return { sortedPosts: [], tagWithCount: {} };

    // 📌 최신 날짜순 정렬
    const sortedPosts = [...objPosts].sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date));

    // 📌 태그 카운트 계산
    const tagWithCount = {};
    sortedPosts.forEach(fmContent => {
        const tags = fmContent.frontmatter.tag;
        if (!Array.isArray(tags)) return;

        tags.forEach(tag => {
            tagWithCount[tag] = (tagWithCount[tag] || 0) + 1;
        });
    });

    console.log("objPost: ", objPosts);
    console.log("sorted: ", sortedPosts);

    return { sortedPosts, tagWithCount };
};
