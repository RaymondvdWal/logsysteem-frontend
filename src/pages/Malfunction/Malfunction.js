import "./Malfunction.css"
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {useContext, useEffect, useState} from "react";
import Button from "../../components/Button";
import {MalfunctionContext} from "../../context/MalfunctionContext";


function Malfunction() {

    const {id} = useParams()
    const [startTime, setStartTime] = useState()
    const [endTime, setEndTime] = useState()
    const {malfunction, setMalfunction} = useContext(MalfunctionContext)
    const dateTimeOptions ={
        weekday: "short",
        month: "long",
        day: "numeric",
        hour12: false,
        hour: "numeric",
        minute: "numeric",
    }
    const navigate = useNavigate();

    useEffect(() => {
        getMalfunction()
    },[])

    async function getMalfunction() {
        try {
            const GET_URL = `http://localhost:8080/malfunction/${id}`
            const response = await axios.get(GET_URL, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }, responseType: "json"
            })
            console.log(response)
            setMalfunction(response.data)
            if (response.data.createMalfunction != null) {
                const startTime = new Date(response.data.createMalfunction)
                const convertedstartTime = startTime.toLocaleTimeString("nl-NL", dateTimeOptions)
                console.log(startTime)
                console.log(convertedstartTime)
                setStartTime(convertedstartTime)

            }
            if (response.data.updateMalfunction != null) {
                const endTime = new Date(response.data.updateMalfunction)
                const convertedEndTime = endTime.toLocaleTimeString("nl-NL", dateTimeOptions)
                setEndTime(convertedEndTime)
            }
        } catch (e) {
            console.error("Failed", e)
        }
    }

    async function finishMalfunction(e) {
        try {
            const UPDATE_URL = `http://localhost:8080/malfunction/${id}`
            const response = await axios.put(UPDATE_URL, {
                ...malfunction,
                status: e.target.value
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }, responseType: "json"
            })
            setMalfunction(response.data)
            await getMalfunction()
            console.log(response)
        } catch (e) {
            console.error("failed", e)
        }
    }


    return(
        <section className={"table-section"}>

            <h2>{malfunction.title}</h2>

            <div className={"table-container"}>
                <table className={"table first-table"}>
                    <thead className={"inner-table"}>
                    <tr>
                        <th>Beschrijving</th>
                        <th>Acties</th>
                        <th>Oplossing</th>
                    </tr>
                    </thead>
                    <tbody className={"inner-table"}>
                    <tr>
                        <td>{malfunction.description}</td>
                        <td>{malfunction.action}</td>
                        <td>{malfunction.solution}</td>
                    </tr>
                    </tbody>
                </table>
                <table className={"table"}>
                    <thead>
                    <tr>
                        <th>Status:</th>
                        <th>Begin:</th>
                        <th>Eind:</th>
                    </tr>
                    </thead>

                    <tbody>
                    <tr>
                        <td>{malfunction.status}</td>
                        <td>{startTime}</td>
                        <td>{endTime}</td>
                    </tr>
                    </tbody>
                </table>
            </div>

            <div className={"button-container"}>
                <Button
                    className={"green-button new-malfunction-button"}
                    buttonType={"onClick"}
                    buttonOnClick={() => navigate("/new-malfunction")}
                >
                    Nieuwe Storing
                </Button>

                <Button
                    className={"orange-button"}
                    buttonType={"onClick"}
                    buttonOnClick={() => {navigate(`/update-malfunction/${id}`)}}
                >
                    Wijzigen
                </Button>

                <Button
                    className={"red-button malfunction-done-button"}
                    buttonType={"onClick"}
                    value={"KLAAR"}
                    buttonOnClick={finishMalfunction}
                >
                    Afronden
                </Button>
            </div>


        </section>
    )
}

export default Malfunction