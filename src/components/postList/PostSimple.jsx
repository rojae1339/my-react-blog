import {usePosts} from "../hooks/usePosts.js";
import ReactMarkdown from "react-markdown";
import {Link} from "react-router-dom";

const PostSimple = ({picMD, title, subTitle, tags, date}) => {

    return (
        <Link to={`/${title}`} className={"flex flex-row pt-4 pb-4 border-b-[1px] border-gray-300 w-full"}>
            <ReactMarkdown
                components={{
                    img: ({ src, alt }) => (
                        <img src={src} alt={alt} className="w-28 h-28 min-w-28 min-h-28 object-cover rounded-lg" />
                    ),
                }}
            >
                {picMD ? picMD : "![](src/posts/post_asset/null.png)"}
            </ReactMarkdown>
            <div className={"flex flex-col pl-5 h-full justify-between py-1"}>
                <p className={"text-xl font-extrabold"}>
                    {title}
                </p>
                <p className={"text-sm text-gray-600 font-light pt-3 pb-2"}>
                    {subTitle}
                </p>
                <span className={"text-[14px] font-bold text-gray-400"}>
                    {date}
                </span>
            </div>
        </Link>
    )
}

export default PostSimple