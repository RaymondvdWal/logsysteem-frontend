import './App.css';
import {Route, Routes} from "react-router-dom";
import Login from "./pages/Login/Login";
import Location from "./pages/Location/Location";
import WorkstationSelection from "./pages/WorkstationSelection/WorkstationSelection";
import WorkstationOverview from "./pages/WorkstationOverview/WorkstationOverview";
import Navigation from "./components/Navigation/Navigation";
import OperationOverview from "./pages/OperationOverview/OperationOverview";
import MalfunctionOverview from "./pages/MalfunctionOverview/MalfunctionOverview";
import CreateNewAccount from "./pages/CreateNewAccount/CreateNewAccount";
import Profile from "./pages/Profile/Profile";
import ProfilePicture from "./pages/ProfilePicture/ProfilePicture";

function App() {
  return (
    <>
        <Navigation/>
        <div className="App">
          <Routes>
            <Route path={"/"} element={<Login/>}/>
            <Route path={"/location"} element={<Location/>}/>
            <Route path={"/choose-workstation"} element={<WorkstationSelection/>}/>
            <Route path={"/choose-workstation/workstation-overview"} element={<WorkstationOverview/>}/>
            <Route path={"operation-overview"} element={<OperationOverview/>}/>
            <Route path={"malfunction-overview"} element={<MalfunctionOverview/>}/>
            <Route path={"/create-new-account"} element={<CreateNewAccount/>}/>
            <Route path={"/profile"} element={<Profile/>}/>
            <Route path={"/profile-picture"} element={<ProfilePicture/>}/>
          </Routes>
        </div>
    </>
  );
}

export default App;
