import {usePosts} from "../hooks/usePosts.js";
import {extractFirstImage} from "../../util/extractFirstImg.js";
import PostSimple from "./PostSimple.jsx";

const PostList = () => {
    const objPosts = usePosts();

    return (
        <div className="flex flex-col"> {/* 부모 div 추가 */}
            {objPosts.map(fmContent => {
                const picMD = extractFirstImage(fmContent.content);
                const id = fmContent.frontmatter.id;
                const title = fmContent.frontmatter.title;
                const subTitle = fmContent.frontmatter.subTitle;
                const tags = fmContent.frontmatter.tags;
                const date = fmContent.frontmatter.date;

                return (
                    <PostSimple
                        key={id}
                        picMD={picMD}
                        title={title}
                        subTitle={subTitle}
                        tags={tags}
                        date={date}
                    />
                );
            })}
        </div>
    );
}

export default PostList
