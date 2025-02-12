import {usePosts} from "../hooks/usePosts.js";
import ReactMarkdown from "react-markdown";
import {Link} from "react-router-dom";

const PostSimple = ({picMD, title, subTitle, tags, date}) => {

    return (
        <Link to={`/${title}`} className={"flex flex-row"}>
            <ReactMarkdown>{picMD ? picMD : "![](src/posts/post_asset/null.png)"}</ReactMarkdown>
            <div className={"flex flex-col"}>
                <p>
                    {title}
                </p>
                <p>
                    {subTitle}
                </p>
                <span>
                    {date}
                </span>
            </div>
        </Link>
    )
}

export default PostSimple