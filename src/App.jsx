import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./Home.jsx";

function App() {

  return (
    <div>
        <button className={"bg-gray-500"} value={"asd"} >
            fixfix
        </button>
        <BrowserRouter basename={"/rojae1339.github.io"}>
            <Routes>
                <Route path={"/home"} element={<Home/>}/>
            </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App
