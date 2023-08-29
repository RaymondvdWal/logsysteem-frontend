import "./Navigation.css"
import Button from "../Button";
import defaultProfilePicture from "../../assets/Tijdelijke profielfoto.jpg"
import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext";
import {AuthorityContext} from "../../context/AuthorityContext";

function Navigation() {
        const navigate = useNavigate();
        const {logout, auth: {user, isAuth}} = useContext(AuthContext);
        const {authority} = useContext(AuthorityContext)

    function buttonCheck() {
            if (localStorage.getItem("location") !== null) {
                return true
            }
            if (localStorage.getItem("authority") === "ADMIN") {
                return true
            }
    }

    return (
        <nav>

            { authority !== "ADMIN" &&
            <div className={"left-button-container"}>
                <Button
                    buttonType={"button"}
                    buttonOnClick={() => navigate("/location")}
                >
                    Locatie
                </Button>
                {
                    localStorage.getItem("location") &&
                <Button
                    buttonType={"button"}
                    buttonOnClick={() => navigate("choose-workstation")}
                >
                    Werkplek
                </Button>
                }
                { localStorage.getItem("workstationId") &&
                <Button
                    buttonType={"button"}
                    buttonOnClick={() => navigate(`operation-overview/${localStorage.getItem("workstationId")}`)}
                >
                    Handelingen
                </Button>
                }
                { localStorage.getItem("workstationId") &&
                <Button
                    buttonType={"button"}
                    buttonOnClick={() => navigate(`malfunction-overview/${localStorage.getItem("workstationId")}`)}
                >
                    Storingen
                </Button>
                }
            </div>}


            {isAuth && <p>{localStorage.getItem("location")}</p>}

        { isAuth &&

        <div className={"right-button-container"}>
            {    buttonCheck()
                 &&
                <Button
                    className={"create-button"}
                    buttonType={"button"}
                    buttonOnClick={() => navigate("/create")}
                >
                    Aanmaken
                </Button>
            }


            <Button
                buttonType={"button"}
                buttonOnClick={logout}
                className={"logout-button"}
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
                {isAuth? <img className={"profile-picture"} src={user.profilePicture} alt={user.username}/> : <img src={defaultProfilePicture} alt={"vervangende foto"}/>}
            </Button>
        </div>
        }

        </nav>
    )
}

export default Navigation;