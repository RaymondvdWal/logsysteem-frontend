import {createContext, useState} from "react";

export const OperationContext = createContext(null);

function OperationContextProvider({children}) {

    const [operation, setOperation] = useState({
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
    })

    const data = {
        operation,
        setOperation
    }

    return(
        <OperationContext.Provider value={data}>
            {children}
        </OperationContext.Provider>
    )
}

export default OperationContextProvider;