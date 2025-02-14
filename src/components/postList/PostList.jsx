import {usePosts} from "../hooks/usePosts.js";
import {extractFirstImage} from "../../util/extractFirstImg.js";
import PostSimple from "./PostSimple.jsx";
import {dateMapper} from "../../util/dateMapper.js";

const PostList = () => {
    const objPosts = usePosts();

    return (
        <div className="flex flex-col flex-grow overflow-y-auto h-full w-full pr-10 pl-10 pt-4">
            {objPosts.map(fmContent => {
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
                    />
                );
            })}
        </div>
    );
}

export default PostList
