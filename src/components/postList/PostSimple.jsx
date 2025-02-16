import {usePosts} from "../hooks/usePosts.js";
import ReactMarkdown from "react-markdown";
import {Link, useLocation, useParams} from "react-router-dom";
import {PostSimpleUsage} from "../../const/consts.js";
import {useEffect, useState} from "react";

const PostSimple = ({picMD, title, subTitle, date, usage}) => {

    const {postTitle} = useParams();
    const isSameTitle = postTitle === title

    return usage === PostSimpleUsage.Homepage ?
    (
        <Link to={`/${title}`} className={"flex flex-row pt-4 pb-4 border-b-[1px] border-gray-300 w-full"}>
            <ReactMarkdown
                components={{
                    img: ({ src, alt }) => {
                        console.log(src);
                        return (<img src={`/${src}`} alt={alt} className="w-28 h-28 min-w-28 min-h-28 object-cover rounded-lg"/>)
                    },
                }}
            >
                {picMD ? picMD : "![](src/posts/post_asset/null.png)"}
            </ReactMarkdown>
            <div className={"flex flex-col pl-5 h-full justify-between py-1"}>
                <p className={"text-xl font-extrabold text-wrap break-keep"}>
                    {title}
                </p>
                <p className={"text-sm text-gray-600 font-light pt-3 pb-2 text-wrap break-keep"}>
                    {subTitle}
                </p>
                <span className={"text-[14px] font-bold text-gray-400"}>
                    {date}
                </span>
            </div>
        </Link>
    ) : (
            <Link to={`/${title}`}
                  className={`border-gray-300  ${isSameTitle ? "pointer-events-none opacity-50" : "opacity-100"}`}
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
                <span className={`text-xs font-light truncate block max-w-full`}>
                    {`${isSameTitle ? "-" : ""} ${title}`}
                </span>
            </Link>
        )
}

export default PostSimple