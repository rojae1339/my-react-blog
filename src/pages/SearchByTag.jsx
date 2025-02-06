import {useSearchParams} from "react-router-dom";

const SearchByTag = () => {
    const [param, setParam] = useSearchParams();

    return (
        <div>
            search by tag
        </div>
    )
}

export default SearchByTag