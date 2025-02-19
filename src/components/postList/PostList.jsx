import {usePosts} from "../hooks/usePosts.js";
import {extractFirstImage} from "../../util/extractFirstImg.js";
import PostSimple from "./PostSimple.jsx";
import {dateMapper} from "../../util/dateMapper.js";
import {useSearch} from "../hooks/useSearch.js";
import {PostSimpleUsage} from "../../const/consts.js";
import {useParams} from "react-router-dom";
import {NavItems} from "../../const/profileConsts.js";

const renderPostSimple = (posts) => {
    return posts.map(fmContent => {
        const picMD = extractFirstImage(fmContent.content);
        const id = fmContent.frontmatter.id;
        const title = fmContent.frontmatter.title;
        const subTitle = fmContent.frontmatter.subTitle;
        const tags = fmContent.frontmatter.tags;
        const date = dateMapper(fmContent.frontmatter.date);

        return (
            <PostSimple
                key={`postSimple_${id}`}
                picMD={picMD}
                title={title}
                subTitle={subTitle}
                tags={tags}
                date={date}
                usage={PostSimpleUsage.Homepage}
            />
        )
    });
};

const PostList = ({tagTitle, tagCount}) => {

    const objPosts = usePosts();
    const {tag} = useParams();
    const {searchInput} = useSearch();
    const tagIcon = NavItems.find(n => n.name === "TAGS")

    const searchFilteredPosts = searchInput
        ? objPosts.filter(fmContent =>
            fmContent.frontmatter.title.toLowerCase().includes(searchInput.toLowerCase()) ||
            fmContent.frontmatter.subTitle.toLowerCase().includes(searchInput.toLowerCase()) ||
            fmContent.content.toLowerCase().includes(searchInput.toLowerCase())
        )
        : objPosts;

    const sortedPosts = [...searchFilteredPosts].sort((a, b) =>
        new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
    );

    const tagFilteredPosts = objPosts.filter(fmcontent => fmcontent.frontmatter.tag?.some(t => t === tag))

    return (
        <div className="flex flex-col flex-grow overflow-y-auto h-full w-full px-4 sm:px-6 md:px-10 pt-4 ">
            {sortedPosts.length > 0 && tagFilteredPosts.length === 0 ? (
                renderPostSimple(sortedPosts)
            ) : tagFilteredPosts.length > 0 ? (
                <div className={"pt-7 text-[20px]"}>
                    <div className={"flex flex-row gap-7 items-center pb-6"}>
                        <div className={"mt-2"}>
                            <tagIcon.icon/>
                        </div>
                        <div className={"text-4xl items-center"}>
                            {tagTitle}
                        </div>
                        <div className={"mt-2 text-gray-400"}>
                            {tagCount}
                        </div>
                    </div>
                    {renderPostSimple(tagFilteredPosts)}
                </div>
            ) : (
                <p className="text-center text-gray-500 mt-10">검색 결과가 없습니다.</p>
            )}
        </div>
    );
}

export default PostList
