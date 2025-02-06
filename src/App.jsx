import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./Home.jsx";

function App() {

  return (
    <div>
        <button className={"bg-gray-500"} value={"asd"} >
            ang~
        </button>
        <BrowserRouter>
            <Routes>
                <Route path={"/home"} element={<Home/>}/>
            </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App
