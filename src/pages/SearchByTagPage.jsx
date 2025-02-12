import {useSearchParams} from "react-router-dom";

const SearchByTagPage = () => {
    const [param, setParam] = useSearchParams();

    return (
        <div>
            search by tag
        </div>
    )
}

export default SearchByTagPage