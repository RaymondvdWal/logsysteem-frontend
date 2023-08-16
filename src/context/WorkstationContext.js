import {createContext, useState} from "react";

export const WorkstationContext = createContext(null);

function WorkstationContextProvider({children}) {
    const [workstations, setWorkstation] = useState([{
        id: null,
        name: null,
        generalMessage: null,
        pushMessage: null,
        location: null,
        user: null,
    }])

    const data = {
        workstations,
        setWorkstation
    }

    return(
        <WorkstationContext.Provider value={data}>
            {children}
        </WorkstationContext.Provider>
    )
}

export default WorkstationContextProvider