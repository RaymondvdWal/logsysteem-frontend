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
import CreateNewWorkstation from "./pages/CreateNewWorkstation/CreateNewWorkstation";
import CreateNew from "./pages/CreateNew/CreateNew";
import CreateNewOperation from "./pages/CreateNewOperation/CreateNewOperation";
import Operation from "./pages/Operation/Operation";
import ManualUpdateOperation from "./pages/ManuelUpdateOperation/ManualUpdateOperation";
import CreateNewMalfunction from "./pages/CreateNewMalfunction/CreateNewMalfunction";
import Malfunction from "./pages/Malfunction/Malfunction";
import UpdateMalfunction from "./pages/UpdateMalfunction/UpdateMalfunction";

function App() {
  return (
    <>
        <Navigation/>
        <div className="App">
          <Routes>
            <Route path={"/"} element={<Login/>}/>
            <Route path={"/location"} element={<Location/>}/>
            <Route path={"/create"} element={<CreateNew/>}/>
            <Route path={"/choose-workstation"} element={<WorkstationSelection/>}/>
            <Route path={"new-workstation"} element={<CreateNewWorkstation/>}/>
            <Route path={"/choose-workstation/:id"} element={<WorkstationOverview/>}/>
            <Route path={"/operation-overview/:id"} element={<OperationOverview/>}/>
            <Route path={"/operation/:id"} element={<Operation/>}/>
            <Route path={"/new-operation"} element={<CreateNewOperation/>}/>
            <Route path={"/update-operation/:id"} element={<ManualUpdateOperation/>}/>
            <Route path={"/malfunction-overview/:id"} element={<MalfunctionOverview/>}/>
            <Route path={"/malfunction/:id"} element={<Malfunction/>}/>
            <Route path={"/update-malfunction/:id"} element={<UpdateMalfunction/>}/>
            <Route path={"/new-malfunction"} element={<CreateNewMalfunction/>}/>
            <Route path={"/create-new-account"} element={<CreateNewAccount/>}/>
            <Route path={"/profile"} element={<Profile/>}/>
            <Route path={"/profile-picture"} element={<ProfilePicture/>}/>
          </Routes>
        </div>
    </>
  );
}

export default App;
