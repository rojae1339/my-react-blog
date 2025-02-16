import {usePosts} from "./hooks/usePosts.js";
import {Link} from "react-router-dom";

const Button = ({content, count, url}) => {

    return (
        <Link to={url}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            {content}
            {count ? count : ""}
        </Link>
    )
}

export default Button