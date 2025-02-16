import PostSimple from "../postList/PostSimple.jsx";
import {PostSimpleUsage} from "../../const/consts.js";
import {extractFirstImage} from "../../util/extractFirstImg.js";
import {dateMapper} from "../../util/dateMapper.js";
import Button from "../Button.jsx";
import {usePosts} from "../hooks/usePosts.js";
import {useParams} from "react-router-dom";
import {findCurrentPost} from "../../const/findCurrentPost.js";
import {extractHeadings} from "../../const/extractHeadings.js";

const Panel = ({panelTitle, dateFilteredPost, isTag, tags}) => {

    const {postTitle} = useParams();
    const posts = usePosts();

    const currentPost = findCurrentPost(postTitle, posts);
    const headings = currentPost ? extractHeadings(currentPost.content) : [];

    console.log(headings);

    return (
        <div className={`border-l-[1px] border-gray-200 pl-6 text-sm font-bold pr-4`}>
            {panelTitle}
            {
                dateFilteredPost !== undefined ? (
                    <div className={"flex flex-col gap-1 pt-4"}>
                        {
                            dateFilteredPost.map(fmContent => {
                                const id = fmContent.frontmatter.id;
                                const title = fmContent.frontmatter.title;

                                return (
                                    <PostSimple
                                        key={id}
                                        title={title}
                                    />
                                );
                            })
                        }
                    </div>
                ) : isTag ? (
                    <div className={"flex flex-row gap-2 flex-wrap pt-4"}>
                        {tags.map(([tag, count], index) => {

                            return (
                                <div key={`tag_${index}`} className={"text-xs font-light border-[1px] border-gray-400 rounded-4xl px-1 py-1"}>
                                    <Button content={tag} url={`/tags/${tag}`}/>
                                </div>
                            )
                        })}
                    </div>
                ) : (
                    headings.length > 0 ? (
                        <div className="mt-4">
                            <p className="font-semibold">본문 목차</p>
                            <ul className="list-style-none pt-4 flex flex-col gap-2">
                                {headings.map(({ level, text, id }) => (
                                    <li key={id} style={{paddingLeft: `${(level - 2) * 16}px`}}>
                                        <button
                                            className="text-xs font-light text-gray-500 hover:underline truncate block max-w-full w-fit"
                                            onClick={() => {
                                                const target = document.getElementById(id);
                                                console.log(target);
                                                if (target) {
                                                    target.scrollIntoView({behavior: "smooth", block: "start"});
                                                }
                                            }}
                                        >
                                            - {text}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : null
                )

            }
        </div>
    );
}

export default Panel