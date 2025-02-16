import {usePosts} from "../hooks/usePosts.js";
import {extractFirstImage} from "../../util/extractFirstImg.js";
import PostSimple from "./PostSimple.jsx";
import {dateMapper} from "../../util/dateMapper.js";
import {useSearch} from "../hooks/useSearch.js";
import {PostSimpleUsage} from "../../const/consts.js";

const PostList = () => {

    const objPosts = usePosts();
    const {searchInput} = useSearch();

    const filteredPosts = searchInput
        ? objPosts.filter(fmContent =>
            fmContent.frontmatter.title.toLowerCase().includes(searchInput.toLowerCase()) ||
            fmContent.frontmatter.subTitle.toLowerCase().includes(searchInput.toLowerCase()) ||
            fmContent.content.toLowerCase().includes(searchInput.toLowerCase())
        )
        : objPosts;

    const sortedPosts = [...filteredPosts].sort((a, b) =>
        new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
    );

    return (
        <div className="flex flex-col flex-grow overflow-y-auto h-full w-full">
            {sortedPosts.length > 0 ? (
                sortedPosts.map(fmContent => {
                    const picMD = extractFirstImage(fmContent.content);
                    const id = fmContent.frontmatter.id;
                    const title = fmContent.frontmatter.title;
                    const subTitle = fmContent.frontmatter.subTitle;
                    const tags = fmContent.frontmatter.tags;
                    const date = dateMapper(fmContent.frontmatter.date);

                    return (
                        <PostSimple
                            key={id}
                            picMD={picMD}
                            title={title}
                            subTitle={subTitle}
                            tags={tags}
                            date={date}
                            usage={PostSimpleUsage.Homepage}
                        />
                    );
                })
            ) : (
                <p className="text-center text-gray-500 mt-10">검색 결과가 없습니다.</p>
            )}
        </div>
    );
}

export default PostList
