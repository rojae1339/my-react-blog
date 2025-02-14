import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import PostDetailPage from "./pages/PostDetailPage.jsx";
import {frontmatterMapper} from "./util/frontmatterMapper.js";
import {PostsProvider} from "./context/PostContextProvider.jsx";
import TagsPage from "./pages/TagsPage.jsx";
import ArchivesPage from "./pages/ArchivesPage.jsx";
import AboutmePage from "./pages/AboutmePage.jsx";

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
                <Route path={"/tags"} element={<TagsPage/>}/>
                <Route path={"/archives"} element={<ArchivesPage/>}/>
                <Route path={"about-me"} element={<AboutmePage/>}/>
            </Routes>
        </BrowserRouter>
    </PostsProvider>
  )
}

export default App
