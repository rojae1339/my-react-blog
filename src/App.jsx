import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import PostDetailPage from "./pages/PostDetailPage.jsx";
import {frontmatterMapper} from "./util/frontmatterMapper.js";
import {PostsProvider} from "./context/PostContextProvider.jsx";
import TagsPage from "./pages/TagsPage.jsx";
import ArchivesPage from "./pages/ArchivesPage.jsx";
import AboutmePage from "./pages/AboutmePage.jsx";
import {SearchContextProvider} from "./context/SearchContextProvider.jsx";
import TagsSearchPage from "./pages/TagsSearchPage.jsx";
import MainPageLayout from "./pages/MainPageLayout.jsx";

function App() {
    const posts = import.meta.glob("/src/posts/*.md", {eager: true, as: "raw"});
    const fmMappedPosts = [];

    Object.entries(posts).forEach(([path, content]) => {
        fmMappedPosts.push(frontmatterMapper(content));
    });


    return (
        <PostsProvider posts={fmMappedPosts}>
            <SearchContextProvider>
                <BrowserRouter>
                    <Routes>
                        <Route element={<MainPageLayout/>}>
                            <Route path={"/"} element={<HomePage/>}/>
                            <Route path={"/:postTitle"} element={<PostDetailPage/>}/>
                            <Route path={"/tags"} element={<TagsPage/>}/>
                            <Route path={"/tags/:tag"} element={<TagsSearchPage/>}/>
                            <Route path={"/archives"} element={<ArchivesPage/>}/>
                            <Route path={"about-me"} element={<AboutmePage/>}/>
                        </Route>
                    </Routes>
                </BrowserRouter>
            </SearchContextProvider>
        </PostsProvider>
    )
}

export default App
