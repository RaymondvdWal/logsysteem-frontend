import "./OperationOverview.css"
import {useState, useEffect} from "react";
import axios from "axios";
import {Link, useParams} from "react-router-dom";

function OperationOverview() {
    const {id} = useParams()
    const [operations, setOperations] = useState([{
        comment: null,
        dateIndication: null,
        device: null,
        finishedBy: null,
        id: null,
        instruction: null,
        name: null,
        operationDone: null,
        operationPickedUp: null,
        pickedUpBy: null,
        status: null,
        timeIndication: null,
        workstation: null,
    }])

    useEffect(() => {
        getOperations()
    },[])
    async function getOperations() {
        try{
            const URL = `http://localhost:8080/operation`
            const response = await axios.get(URL, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }, responseType: "json"
            })

            let uniqueData = [...new Map(response.data.map((item) => [item["id"], item])).values()]

            const assignedData = uniqueData.filter((operation) => {
                return operation.workStation
            })

            const operationsAssignedToWorkstation = assignedData.filter((operations) => {
                return operations.workStation.id == id
                })

            setOperations(operationsAssignedToWorkstation)

        } catch (e) {
            console.error("failed", e)
        }
    }
    return (
        <>

            <div className={"table-container"}>
               <table className={"table"}>
                   <thead>
                        <tr>
                            <th>Handelingen</th>
                            <th>Status</th>
                            <th>Wie</th>
                        </tr>
                   </thead>
                   <tbody>
                        {operations.map((operation) => {
                            return <tr>
                                    <td><Link to={`/operation/${operation.id}`}>{operation.name}</Link></td>
                                    <td>{operation.status}</td>
                                    <td>{operation.finishedBy === null ? operation.pickedUpBy : operation.finishedBy}</td>
                                    </tr>
                            })
                        }
                   </tbody>
               </table>
            </div>

        </>

    )
}

export default OperationOverview