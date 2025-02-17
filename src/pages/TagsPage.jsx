import HomeRightPanel from "../components/additionalPanel/HomeRightPanel.jsx";
import Button from "../components/Button.jsx";
import {useSortedPostsAndTags} from "../components/hooks/useSortedPostsAndTags.js";

const TagsPage = () => {

    const {tagWithCount} = useSortedPostsAndTags()


    return (
        <div className={"my-10"}>
            <div className={"text-xl font-bold pl-10  border-l-[1px] border-gray-300"}>
                Tags
            </div>

            <div className={"pl-10 flex flex-row flex-wrap gap-2 pt-7"}>
                {Object.entries(tagWithCount).map(twc => {

                    return (
                        <div key={`tag_${twc[0]}`}
                             className={"border-[1px] border-gray-200 rounded-4xl px-2 text-sm shadow-md"}
                        >
                            <Button url={`/tags/${twc[0]}`} content={twc[0]} count={twc[1]}/>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default TagsPage