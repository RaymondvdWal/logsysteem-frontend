import "./Operation.css"
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {useContext, useEffect, useState} from "react";
import Button from "../../components/Button";
import {OperationContext} from "../../context/OperationContext";

function Operation() {
    const {id} = useParams()
    const {operation, setOperation} = useContext(OperationContext)
    const [startTime, setStartTime] = useState()
    const [endTime, setEndTime] = useState()
    const UPDATE_URL = `http://localhost:8080/operation/${id}`
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
        getOperation()
    },[])

    async function getOperation() {
        try {
            const GET_URL = `http://localhost:8080/operation/${id}`
            const response = await axios.get(GET_URL, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }, responseType: "json"
            })
            console.log(response)
            setOperation(response.data)
            if (response.data.operationPickedUp != null) {
                const startTime = new Date(response.data.operationPickedUp)
                const convertedStartTime = startTime.toLocaleTimeString("nl-NL", dateTimeOptions)
                console.log(startTime)
                console.log(convertedStartTime)
                setStartTime(convertedStartTime)

            }
            if (response.data.operationDone != null) {
                const endTime = new Date(response.data.operationDone)
                const convertedEndTime = endTime.toLocaleTimeString("nl-NL", dateTimeOptions)
                setEndTime(convertedEndTime)
            }
        } catch (e) {
            console.error("Failed", e)
        }
    }

    async function startStopOperation(e) {
        try {
            const response = await axios.put(UPDATE_URL, {
                ...operation,
                status: e.target.value
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }, responseType: "json"
            })
            setOperation(response.data)
            await getOperation()
            console.log(response)
        } catch (e) {
            console.error("failed", e)
        }
    }


    return(
        <section className={"table-section"}>

            <h2>{operation.name}</h2>

            <div className={"table-container"}>
                <table className={"table first-table"}>
                    <thead className={"inner-table"}>
                    <tr>
                        <th>Beschrijving</th>
                    </tr>
                    </thead>
                    <tbody className={"inner-table"}>
                    <tr>
                        <td>{operation.instruction}</td>
                    </tr>
                    </tbody>
                </table>
                <table className={"table"}>
                    <thead>
                    <tr>
                        <th>Status:</th>
                        <th>Wie:</th>
                        <th>Begintijd:</th>
                        <th>Eindtijd:</th>
                    </tr>
                    </thead>

                    <tbody>
                    <tr>
                        <td>{operation.status}</td>
                        <td>{operation.finishedBy === null ? operation.pickedUpBy : operation.finishedBy}</td>
                        <td>{startTime}</td>
                        <td>{endTime}</td>
                    </tr>
                    </tbody>
                </table>
            </div>

            <div className={"button-container"}>
                <Button
                    className={"green-button"}
                    buttonType={"onClick"}
                    value={"BEZIG"}
                    buttonOnClick={startStopOperation}
                >
                    Start
                </Button>

                <Button
                    className={"orange-button"}
                    buttonType={"onClick"}
                    buttonOnClick={() => {navigate(`/update-operation/${id}`)}}
                >
                    Wijzigen
                </Button>

                <Button
                    className={"red-button"}
                    buttonType={"onClick"}
                    value={"KLAAR"}
                    buttonOnClick={startStopOperation}
                >
                    Stop
                </Button>
            </div>


        </section>
    )
}

export default Operation