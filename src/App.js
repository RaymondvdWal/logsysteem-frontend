import './App.css';
import {Navigate, Route, Routes} from "react-router-dom";
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
import {useContext} from "react";
import {AuthContext} from "./context/AuthContext";
import {AuthorityContext} from "./context/AuthorityContext";

function App() {
      const {auth:{isAuth}} = useContext(AuthContext)
      const {authority} = useContext(AuthorityContext)

  return (
    <>
      {isAuth && <Navigation/>}
        <div className="App">
          <Routes>
            <Route path={"/"} element={<Login/>}/>
            <Route path={"/location"} element={authority !== "ADMIN" ? <Location/> : <Navigate to={"/"}/>}/>
            <Route path={"/create"} element={<CreateNew/>}/>
            <Route path={"/choose-workstation"} element={authority !== "ADMIN" ? <WorkstationSelection/> : <Navigate to={"/"}/>}/>
            <Route path={"new-workstation"} element={authority === "MODERATOR" ? <CreateNewWorkstation/> : <Navigate to={"/"}/>}/>
            <Route path={"/choose-workstation/:id"} element={authority !== "ADMIN" ? <WorkstationOverview/> : <Navigate to={"/"}/>}/>
            <Route path={"/operation-overview/:id"} element={authority !== "ADMIN" ? <OperationOverview/> : <Navigate to={"/"}/>}/>
            <Route path={"/operation/:id"} element={authority !== "ADMIN" ? <Operation/> : <Navigate to={"/"}/>}/>
            <Route path={"/new-operation"} element={authority === "MODERATOR" ? <CreateNewOperation/> : <Navigate to={"/"}/>}/>
            <Route path={"/update-operation/:id"} element={authority !== "ADMIN" ? <ManualUpdateOperation/> : <Navigate to={"/"}/>}/>
            <Route path={"/malfunction-overview/:id"} element={authority !== "ADMIN" ? <MalfunctionOverview/> : <Navigate to={"/"}/>}/>
            <Route path={"/malfunction/:id"} element={ authority !== "ADMIN" ? <Malfunction/> : <Navigate to={"/"}/>}/>
            <Route path={"/update-malfunction/:id"} element={ authority !== "ADMIN" ? <UpdateMalfunction/> : <Navigate to={"/"}/>}/>
            <Route path={"/new-malfunction"} element={authority !== "ADMIN" ? <CreateNewMalfunction/> : <Navigate to={"/"}/>}/>
            <Route path={"/create-new-account"} element={authority === "ADMIN" ? <CreateNewAccount/> : <Navigate to={"/"}/>}/>
            <Route path={"/profile"} element={<Profile/>}/>
            <Route path={"/profile-picture"} element={<ProfilePicture/>}/>
          </Routes>
        </div>
    </>
  );
}

export default App;
