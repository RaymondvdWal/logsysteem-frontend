import "./WorkstationSelection.css"
import Button from "../../components/Button";
import {useNavigate} from "react-router-dom";

function WorkstationSelection() {
    const navigate = useNavigate();

    return (
        <>
            <form className={"workstation-selector"}>
                <Button
                    buttonType={"button"}
                    buttonOnClick={() => navigate("workstation-overview")}
                >
                    Workstation
                </Button>

                <Button
                    buttonType={"button"}
                    buttonOnClick={() => navigate("workstation-overview")}
                >
                    Workstation
                </Button>

                <Button
                    buttonType={"button"}
                    buttonOnClick={() => navigate("workstation-overview")}
                >
                    Workstation
                </Button>

                <Button
                    buttonType={"button"}
                    buttonOnClick={() => navigate("workstation-overview")}
                >
                    Workstation
                </Button>
            </form>
        </>
    )
}

export default WorkstationSelection;