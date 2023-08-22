import "./MalfunctionOverview.css"
import {useState, useEffect} from "react";
import axios from "axios";
import {Link, useParams} from "react-router-dom";

function MalfunctionOverview() {
    const {id} = useParams()
    const [malfunctions, setMalfunctions] = useState([{
        solution: null,
        description: null,
        action: null,
        urgency: null,
        id: null,
        createMalfunction: null,
        updateMalfunction: null,
        creator: null,
        updatedBy: null,
        status: null,
        workstation: null,
        title: null,
    }])

    useEffect(() => {
        getMalfunctions()
    },[])

    async function getMalfunctions() {
        try{
            const URL = `http://localhost:8080/malfunction`
            const response = await axios.get(URL, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }, responseType: "json"
            })
            console.log(response)

            let uniqueData = [...new Map(response.data.map((item) => [item["id"], item])).values()]
            console.log(uniqueData)

            const assignedData = uniqueData.filter((malfunction) => {
                return malfunction.workStation
            })

            const malfunctionsAssignedToWorkstation = assignedData.filter((malfunction) => {
                return malfunction.workStation.id == id
            })

            console.log(malfunctionsAssignedToWorkstation)


            console.log(assignedData)
            setMalfunctions(malfunctionsAssignedToWorkstation)
            console.log(malfunctions)
        } catch (e) {
            console.error("failed", e)
        }
    }
    return (
        <>

            <div className={"table-container"}>
                <table className={"operation-table"}>
                    <thead>
                    <tr>
                        <th>Storingen</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {malfunctions.map((malfunction) => {
                        return <tr>
                            <td><Link to={`/malfunction/${malfunction.id}`}>{malfunction.title}</Link></td>
                            <td>{malfunction.status}</td>
                        </tr>
                    })
                    }
                    </tbody>
                </table>
            </div>

        </>

    )
}

export default MalfunctionOverview