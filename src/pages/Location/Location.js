import "./Location.css"
import Button from "../../components/Button";
import {useNavigate} from "react-router-dom";


function Location() {
    const navigate  = useNavigate();

    return (
        <>
            <form className={"location-selector"}>
                <h2>Welke Locatie?</h2>

                <div className={"button-container-location"}>
                    <Button
                        buttonType={"button"}
                        buttonOnClick={(() => navigate("/choose-workstation"))}
                    >
                        Utrecht
                    </Button>

                    <Button
                        buttonType={"button"}
                        buttonOnClick={(() => navigate("/choose-workstation"))}
                    >
                        Nieuwegein
                    </Button>

                    <Button
                        buttonType={"button"}
                        buttonOnClick={(() => navigate("/choose-workstation"))}
                    >
                        Woerden
                    </Button>
                </div>
           </form>
        </>
    )
}

export default Location;