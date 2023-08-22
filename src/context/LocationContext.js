import {createContext, useEffect, useState} from "react";

export const LocationContext = createContext(null);

function LocationContextProvider({children}) {

    const [location, setLocation] = useState([{
        location: null,
    }])

    useEffect(() => {
        setLocation({
            location: localStorage.getItem("location")
        })
    },[])

    function myLocation(e) {
        setLocation({
            ...location,
            location: e.target.value,
        })
        localStorage.setItem("location", e.target.value)
    }

    const data = {
        myLocation: myLocation,
        location: location,
        setLocation
    }

    return(
        <LocationContext.Provider value={data}>
            {children}
        </LocationContext.Provider>
    )
}

export default LocationContextProvider;