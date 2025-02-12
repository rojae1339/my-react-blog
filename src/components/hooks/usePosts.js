import {useContext} from "react";
import {PostsContext} from "../../context/PostContextProvider.jsx";

export const usePosts = () => useContext(PostsContext);