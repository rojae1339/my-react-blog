import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import PostDetailPage from "./pages/PostDetailPage.jsx";
import SearchByTagPage from "./pages/SearchByTagPage.jsx";
import SearchByQueryPage from "./pages/SearchByQueryPage.jsx";
import {frontmatterMapper} from "./util/frontmatterMapper.js";
import {PostsProvider} from "./context/PostContextProvider.jsx";

function App() {
    const posts = import.meta.glob("/src/posts/*.md", { eager: true, as: "raw" });
    const fmMappedPosts = [];

    Object.entries(posts).forEach(([path, content]) => {
        fmMappedPosts.push(frontmatterMapper(content));
    });


  return (
    <PostsProvider posts={fmMappedPosts}>
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<HomePage/>}/>
                <Route path={"/:postTitle"} element={<PostDetailPage />}/>
                <Route path={"/"} element={<SearchByTagPage/>}/>
                <Route path={"/"} element={<SearchByQueryPage/>}/>
            </Routes>
        </BrowserRouter>
    </PostsProvider>
  )
}

export default App
