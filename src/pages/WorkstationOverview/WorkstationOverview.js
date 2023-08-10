import "./WorkstationOverview.css"
import Button from "../../components/Button";
import {useNavigate} from "react-router-dom";

function WorkstationOverview() {
    const navigate = useNavigate();

    return (
        <>

            <form className={"workstation-menu"}>

                <h2>Workstation</h2>

                <div className={"button-container-workstation-overview"}>
                <Button
                    buttonType={"button"}
                    buttonOnClick={() => navigate("/operation-overview")}
                >
                    Handelingen
                </Button>

                <Button
                    buttonType={"button"}
                    buttonOnClick={() => navigate("/malfunction-overview")}
                >
                    Storingen
                </Button>
                </div>
            </form>
        </>
    )
}

export default WorkstationOverview