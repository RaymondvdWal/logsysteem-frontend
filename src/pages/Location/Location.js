import "./Location.css"
import Button from "../../components/Button";


function Location() {

    return (
        <>
            <form className={"location-selector"}>
                <h2>Welke Locatie?</h2>

                <div className={"button-container-location"}>
                    <Button
                        buttonType={"button"}
                    >
                        Utrecht
                    </Button>

                    <Button
                        buttonType={"button"}
                    >
                        Nieuwegein
                    </Button>

                    <Button
                        buttonType={"button"}
                    >
                        Woerden
                    </Button>
                </div>
           </form>
        </>
    )
}

export default Location;