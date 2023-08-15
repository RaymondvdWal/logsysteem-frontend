import "./Navigation.css"
import Button from "../Button";
import defaultProfilePicture from "../../assets/Tijdelijke profielfoto.jpg"
import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext";
import {LocationContext} from "../../context/LocationContext";

function Navigation() {
        const navigate = useNavigate();
        const {logout, auth: {user, isAuth}} = useContext(AuthContext);
        const {location} = useContext(LocationContext)


    return (
        <nav>
            <div className={"left-button-container"}>
                <Button
                    buttonType={"button"}
                    buttonOnClick={() => navigate("/location")}
                >
                    Locatie
                </Button>

                <Button
                    buttonType={"button"}
                    buttonOnClick={() => navigate("choose-workstation")}
                >
                    Werkplek
                </Button>

                <Button
                    buttonType={"button"}
                    buttonOnClick={() => navigate("operation-overview")}
                >
                    Handelingen
                </Button>

                <Button
                    buttonType={"button"}
                    buttonOnClick={() => navigate("malfunction-overview")}
                >
                    Storingen
                </Button>
            </div>

            <p>{location.location}</p>

            <div className={"right-button-container"}>
                <Button
                    className={"create-button"}
                    buttonType={"button"}
                    buttonOnClick={() => navigate("/create")}
                >
                    Aanmaken
                </Button>

                <Button
                    buttonType={"button"}
                    buttonOnClick={logout}
                >
                    Uitloggen
                </Button>

                <Button
                    className={"profile-button"}
                    buttonType={"button"}
                    buttonOnClick={() => navigate("profile")}
                >
                    Profiel
                </Button>

                <Button
                    buttonType={"button"}
                    buttonOnClick={() => navigate("profile-picture")}
                >
                    {isAuth? <img src={user.profilePicture} alt={user.username} height={70}/> : <img src={defaultProfilePicture} alt={"vervangende foto"} height={70}/>}
                </Button>


            </div>
        </nav>
    )
}

export default Navigation;