import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import home from "./home.jsx";

function App() {

  return (
    <div>
        <button className={"bg-gray-500"} value={"asd"} >
            ang~
        </button>
        <BrowserRouter>
            <Routes>
                <Route path={"/home"} element={<home/>}/>
            </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App
