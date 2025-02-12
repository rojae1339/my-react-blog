import {JsonKeys} from "../../const/consts.js";

const PostHead = ({frontmatter}) => {

    const title = frontmatter[JsonKeys.TITLE];
    const subTitle = frontmatter[JsonKeys.SUB_TITLE];
    const date = frontmatter[JsonKeys.DATE]

    return (
        <header>
            <h1>
                {title}
            </h1>
            <h2>
                {subTitle}
            </h2>
            <div>
                {date}
            </div>
        </header>
    )
}

export default PostHead