import "./WorkstationSelection.css"
import {Link} from "react-router-dom";
import axios from "axios";
import {useContext, useEffect, useState} from "react";
import {LocationContext} from "../../context/LocationContext";
import {WorkstationContext} from "../../context/WorkstationContext";

function WorkstationSelection() {
    const {location:{location}} = useContext(LocationContext)
    const {workstations, setWorkstation} = useContext(WorkstationContext)
    const [myWorkstations, setMyWorkstation] = useState([{
        id: null,
        name: null,
        generalMessage: null,
        pushMessage: null,
        location: null,
    }])

    useEffect(() => {
        getWorkstations()
    },[location])

    async function getWorkstations() {
        try {
           const GET_ALL_URL = "http://localhost:8080/workstation"
           const response = await axios.get(GET_ALL_URL, {
               headers: {
                   Authorization: `Bearer ${localStorage.getItem("token")}`,
               }, responseType: "json"
           })
            const data = response.data.map((data) => {
                return {
                    name: data.name, id:data.id, location: data.location,
                    generalMessage: data.generalMessage, pushMessage: data.pushMessage,
                    user: data.user
                }
            })
            console.log(data)
            console.log(response)
            let uniqueData = [...new Map(data.map((item) => [item["id"], item])).values()]
            console.log(uniqueData)
            console.log(location)
            setWorkstation(uniqueData)

            if (uniqueData.length > 0 && location != null){
                const locationData = uniqueData.filter((workstation) => {
                    return workstation.location === location.toUpperCase()
                })
                setMyWorkstation(locationData)
                console.log(myWorkstations)
                console.log(workstations)
                console.log(locationData)
            }

        } catch (e) {
            console.error("er ging iets mis", e)
        }
    }



    return (
        <>
            <form className={"workstation-selector"}>

                    <ul className={"workstation-tile"}>
                        {myWorkstations.map((workstation) => {
                            return <li><Link className={"workstation-link"} to={`/choose-workstation/${workstation.id}`} onClick={() => {localStorage.setItem("workstationId", workstation.id)}}>{workstation.name}</Link></li>
                        })}
                    </ul>

            </form>
        </>
    )
}

export default WorkstationSelection;