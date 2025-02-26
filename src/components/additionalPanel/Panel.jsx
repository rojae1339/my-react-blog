import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import PostSimple from "../postList/PostSimple.jsx";
import Button from "../Button.jsx";

const Panel = ({ panelTitle, posts, tag, headings }) => {
    const { postTitle } = useParams();
    const location = useLocation();

    const [headingKey, setHeadingKey] = useState(postTitle);
    const [storedTags, setStoredTags] = useState(tag);
    const [activeHeading, setActiveHeading] = useState(null); // 현재 보고 있는 헤딩 ID

    useEffect(() => {
        setHeadingKey(postTitle);
    }, [postTitle]);

    useEffect(() => {
        if (tag && tag.length > 0) {
            setStoredTags(tag);
        }
    }, [location.pathname]);

    useEffect(() => {
        if (!headings || headings.length === 0) return;

        const handleScroll = () => {
            let currentHeading = null;

            for (let i = 0; i < headings.length; i++) {
                const { id } = headings[i];
                const element = document.getElementById(id);

                if (element) {
                    const rect = element.getBoundingClientRect();

                    // 화면에서 완전히 벗어난 경우 active 해제
                    if (Math.trunc(rect.top) <= 0) {
                        currentHeading = id;
                    }

                }
            }

            setActiveHeading(currentHeading);
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll(); // 초기 실행

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [headings]);

    return (
        <div className="border-l-[1px] border-gray-200 pl-6 text-sm font-bold pr-4 animate-fade-in">
            {panelTitle}
            {posts !== undefined ? (
                <div className="flex flex-col gap-2 pt-4">
                    {posts.map((fmContent) => {
                        const id = fmContent.frontmatter.id;
                        const title = fmContent.frontmatter.title;

                        return <PostSimple key={id} title={title} />;
                    })}
                </div>
            ) : storedTags?.length > 0 ? (
                <div className="flex flex-row gap-2 flex-wrap pt-4">
                    {storedTags.map(([tag, count], index) => (
                        <div
                            key={`tag_${index}`}
                            className="text-xs text-gray-400 font-light border-[1px] border-gray-200 shadow-md rounded-4xl px-1 py-1"
                        >
                            <Button content={tag} url={`/tags/${tag}`} />
                        </div>
                    ))}
                </div>
            ) : headings.length > 0 ? (
                <ul key={headingKey} className="max-h-[calc(100vh-500px)] overflow-y-auto list-style-none pt-4 flex flex-col gap-2 animate-fade-in">
                    {headings.map(({ level, text, id }) => (
                        <li
                            key={id}
                            style={{
                                paddingLeft: activeHeading === id ? `${(level - 2) * 18}px` : `${(level - 2) * 20}px`,
                                transition: "padding-left 0.2s"
                            }}
                        >
                            <button
                                className={`text-xs text-left block w-full max-w-[198px] hover:underline
        ${activeHeading === id ? "text-black font-[400]" : "text-gray-500 font-[200]"}`}
                                onClick={() => {
                                    const target = document.getElementById(id);
                                    if (target) {
                                        target.scrollIntoView({behavior: "instant", block: "start"});
                                    }
                                }}
                            >
                                {text}
                            </button>
                        </li>
                    ))}
                </ul>
            ) : null}
        </div>
    );
};

export default Panel;
