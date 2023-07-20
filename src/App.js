import './App.css';
import {Route, Routes} from "react-router-dom";
import Login from "./pages/Login/Login";
import Location from "./pages/Location/Location";
import WorkstationSelection from "./pages/WorkstationSelection/WorkstationSelection";
import WorkstationOverview from "./pages/WorkstationOverview/WorkstationOverview";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={"/login"} element={<Login/>}/>
        <Route path={"/location"} element={<Location/>}/>
        <Route path={"/choose-workstation"} element={<WorkstationSelection/>}/>
        <Route path={"/"} element={<WorkstationOverview/>}/>
      </Routes>
    </div>
  );
}

export default App;
