import {createContext, useState} from "react";

export const MalfunctionContext = createContext(null);

function MalfunctionContextProvider({children}) {

    const [malfunction, setMalfunction] = useState({
        id: null,
        solution: null,
        description: null,
        action: null,
        status: null,
        urgency: null,
        createMalfunction: null,
        updateMalfunction: null,
        creator: null,
        updatedBy: null,
        title: null,
        workstation: null,
    })

    const data = {
        malfunction,
        setMalfunction
    }

    return(
        <MalfunctionContext.Provider value={data}>
            {children}
        </MalfunctionContext.Provider>
    )
}

export default MalfunctionContextProvider;