import "./WorkstationOverview.css"
import Button from "../../components/Button";

function WorkstationOverview() {

    return (
        <>

            <form className={"workstation-menu"}>

                <h2>Workstation</h2>

                <div className={"button-container-workstation-overview"}>
                <Button
                    buttonType={"button"}
                >
                    Handelingen
                </Button>

                <Button
                    buttonType={"button"}
                >
                    Storingen
                </Button>
                </div>
            </form>
        </>
    )
}

export default WorkstationOverview