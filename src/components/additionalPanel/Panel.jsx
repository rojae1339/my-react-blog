import PostSimple from "../postList/PostSimple.jsx";
import Button from "../Button.jsx";
import {useEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";

const Panel = ({panelTitle, posts, tag, headings}) => {

    const {postTitle} = useParams();
    const location = useLocation()

    const [headingKey, setHeadingKeyKey] = useState(postTitle);
    const [storedTags, setStoredTags] = useState(tag);

    // headings이 변경될 때마다 key를 업데이트하여 애니메이션 다시 적용
    useEffect(() => {
        setHeadingKeyKey(postTitle);
    }, [postTitle]);

    useEffect(() => {
        if (tag && tag.length > 0) {
            setStoredTags(tag);
        }
    }, [location.pathname]);

    return (
        <div className={`border-l-[1px] border-gray-200 pl-6 text-sm font-bold pr-4 animate-fade-in`}>
            {panelTitle}
            {
                posts !== undefined ? (
                    <div className={"flex flex-col gap-2 pt-4"}>
                        {
                            posts.map(fmContent => {
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
                ) : storedTags?.length > 0 ? (
                    <div className={"flex flex-row gap-2 flex-wrap pt-4"}>
                        {storedTags.map(([tag, count], index) => {

                            return (
                                <div key={`tag_${index}`} className={"text-xs text-gray-400 font-light border-[1px] border-gray-200 shadow-md rounded-4xl px-1 py-1"}>
                                    <Button content={tag} url={`/tags/${tag}`}/>
                                </div>
                            )
                        })}
                    </div>
                ) : (
                    headings.length > 0 ? (
                        <ul key={headingKey} className="list-style-none pt-4 flex flex-col gap-2 animate-fade-in">
                            {headings.map(({level, text, id}) => (
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
                    ) : null
                )

            }
        </div>
    );
}

export default Panel