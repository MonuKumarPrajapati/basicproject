import "./App.css";
import Create from "./components/Create";
import Navbar from "./components/Navbar";
import Read from "./components/Read";
import Update from "./components/Update";
import {BrowserRouter, Routes, Route} from "react-router-dom"

function App() {
  return (
    <>
      <div className="App " style={{width:'100%'}}> 
        <BrowserRouter>
        <Navbar />
          <Routes>
            <Route exact path="/" element = {<Create/>}/>
            <Route exact path="/all" element = {<Read/>}/>
            <Route exact path="/update" element = {<Update/>}/>
            {/* <Route exact path="/" elements = {<Create/>}/> */}
           </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
