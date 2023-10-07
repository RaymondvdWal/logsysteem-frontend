import "./WorkstationOverview.css"
import Button from "../../components/Button";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";


function WorkstationOverview() {
    const navigate = useNavigate();
    const {id} = useParams()
    const [workstation, setWorkstation] = useState([{
        id: null,
        name: null,
        generalMessage: null,
        pushMessage: null,
        location: null,
    }])

    async function getWorkstation() {
        try {
            const GET_URL = `http://localhost:8080/workstation/${id}`
            const response = await axios.get(GET_URL, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }, responseType: "json"
            })
            const workstationData = response.data

            setWorkstation(workstationData)

        } catch (e) {
            console.error("something went wrong", e)
        }
    }

    useEffect(() => {
        getWorkstation()
    },[])

    return (
        <>

            <form className={"workstation-menu"}>

                <h2>{workstation.name}</h2>

                <div className={"button-container-workstation-overview"}>
                <Button
                    buttonType={"button"}
                    buttonOnClick={() => navigate(`/operation-overview/${id}`)}
                >
                    Handelingen
                </Button>

                <Button
                    buttonType={"button"}
                    buttonOnClick={() => navigate(`/malfunction-overview/${id}`)}
                >
                    Storingen
                </Button>
                </div>

                <section>
                    {workstation.generalMessage}
                </section>
            </form>
        </>
    )
}

export default WorkstationOverview