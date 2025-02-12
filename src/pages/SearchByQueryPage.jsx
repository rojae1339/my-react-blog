import {useSearchParams} from "react-router-dom";

const SearchByQueryPage = () => {
    const [param, setParam] = useSearchParams();

    return (
        <div>
            search by query
        </div>
    )
}

export default SearchByQueryPage