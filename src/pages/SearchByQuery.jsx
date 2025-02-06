import {useSearchParams} from "react-router-dom";

const SearchByQuery = () => {
    const [param, setParam] = useSearchParams();

    return (
        <div>
            search by query
        </div>
    )
}

export default SearchByQuery