import {useParams, useSearchParams} from "react-router-dom";

const TagsSearchPage = () => {

    const {tag} = useParams();


    return (
        <div>
            tagsearchpage = {tag}
        </div>
    )
}

export default TagsSearchPage