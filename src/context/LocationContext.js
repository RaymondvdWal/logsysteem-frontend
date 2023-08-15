import {createContext, useState} from "react";

export const LocationContext = createContext(null);

function LocationContextProvider({children}) {

    const [location, setLocation] = useState({
        location: null,
    })

    function myLocation(e) {
        setLocation({
            ...location,
            location: e.target.value,
        })
    }

    const data = {
        myLocation: myLocation,
        location: location
    }

    return(
        <LocationContext.Provider value={data}>
            {children}
        </LocationContext.Provider>
    )
}

export default LocationContextProvider;