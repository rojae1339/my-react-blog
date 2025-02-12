import {createContext, useContext} from "react";

export const PostsContext = createContext([]);

// Provider 컴포넌트
export const PostsProvider = ({ children, posts }) => {
    return (
        <PostsContext.Provider value={posts}>
            {children}
        </PostsContext.Provider>
    );
};