import "./WorkstationSelection.css"
import Button from "../../components/Button";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {useContext, useState} from "react";
import {LocationContext} from "../../context/LocationContext";
import {clear} from "@testing-library/user-event/dist/clear";

function WorkstationSelection() {
    const navigate = useNavigate();
    const {location:{location}} = useContext(LocationContext)
    const [workstations, setWorkstations] = useState([])

    async function getWorkstations() {
        try {
           const GET_ALL_URL = "http://localhost:8080/workstation"
           const response = await axios.get(GET_ALL_URL, {
              headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
              }, responseType: "json"
           })

            console.log(response)
           const workstationId = [...new Set(response.data.map((data) => {
                return data.id
            }))]

          const workstationName = [...new Set(response.data.map((data) => {
                return data.name
            }))]

          const workstationLocation = [...new Set(response.data.map((data) => {
                return data.location
            }))]

            setWorkstations([{
                workstationId, workstationName, workstationLocation
            }])

            console.log(workstations)
        } catch (e) {
            console.error("er ging iets mis", e)
        }
    }

    return (
        <>
            <form className={"workstation-selector"}>
                <Button
                    buttonType={"button"}
                    buttonOnClick={getWorkstations}
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