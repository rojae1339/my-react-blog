import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home.jsx";
import PostDetail from "./pages/PostDetail.jsx";
import SearchByTag from "./pages/SearchByTag.jsx";
import SearchByQuery from "./pages/SearchByQuery.jsx";

function App() {

  return (
    <div>
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<Home/>}/>
                <Route path={"/:id"} element={<PostDetail />}/>
                <Route path={"/"} element={<SearchByTag/>}/>
                <Route path={"/"} element={<SearchByQuery/>}/>
            </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App
