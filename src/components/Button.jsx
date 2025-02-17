import {usePosts} from "./hooks/usePosts.js";
import {Link} from "react-router-dom";

const Button = ({content, count, url}) => {

    return (
        <Link to={url}
              onClick={() => window.scrollTo({top: 0, behavior: "smooth"})}
        >
            <span className={count ? "text-blue-400" : ""}>{content}</span>
            {count ? <span className="text-gray-500 ">{` ${count}`}</span> : null}
        </Link>
    )
}

export default Button