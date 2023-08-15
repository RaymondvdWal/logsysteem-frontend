import "./WorkstationSelection.css"
import Button from "../../components/Button";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {useEffect} from "react";

function WorkstationSelection() {
    const navigate = useNavigate();

    async function getWorkstations() {
        try {
           const GET_ALL_URL = "http://localhost:8080/workstation"
           const data = await axios.get(GET_ALL_URL, {
               Authorization: `Bearer ${localStorage.getItem("token")}`
           })
        } catch (e) {
            console.error("er ging iets mis", e)
        }
    }




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