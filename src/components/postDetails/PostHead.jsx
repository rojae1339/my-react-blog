import {JsonKeys} from "../../const/consts.js";

const PostHead = ({frontmatter}) => {

    const title = frontmatter[JsonKeys.TITLE];
    const subTitle = frontmatter[JsonKeys.SUB_TITLE];
    const date = frontmatter[JsonKeys.DATE]

    return (
        <header className={"border-b-[1px] pb-6 border-gray-300 flex flex-col gap-1"}>
            <h1 className={"text-[35px] font-bold text-gray-900 text-wrap break-keep"}>
                {title}
            </h1>
            <span className={"text-[18px] font-bold text-gray-700"}>
                {subTitle}
            </span>
            <div className={"text-[10px]"}>
                {date}
            </div>
        </header>
    )
}

export default PostHead