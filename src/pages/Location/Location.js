import "./Location.css"
import Button from "../../components/Button";
import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import {LocationContext} from "../../context/LocationContext";

function Location() {
    const {myLocation} = useContext(LocationContext)
    const navigate  = useNavigate();

    function setLocation(e) {
        myLocation(e);
        navigate("/choose-workstation")
    }

    return (
        <>
            <form className={"location-selector"}>
                <div className={"location-outer-container"}>
                    <h2>Welke Locatie?</h2>

                    <div className={"button-container-location"}>
                        <Button
                            buttonType={"button"}
                            buttonOnClick={setLocation}
                            value={"Utrecht"}
                        >
                            Utrecht
                        </Button>

                        <Button
                            buttonType={"button"}
                            buttonOnClick={setLocation}
                            value={"Nieuwegein"}
                        >
                            Nieuwegein
                        </Button>

                        <Button
                            buttonType={"button"}
                            buttonOnClick={(setLocation)}
                            value={"Woerden"}
                        >
                            Woerden
                        </Button>
                    </div>
                </div>

           </form>
        </>
    )
}

export default Location;