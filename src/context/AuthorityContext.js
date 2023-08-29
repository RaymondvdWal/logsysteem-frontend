import {createContext, useState} from "react";

export const AuthorityContext = createContext(null);

function AuthorityContextProvider({children}) {

    const [authority, setAuthority] = useState(null)

    const data = {
        authority,
        setAuthority
    }

    return(
        <AuthorityContext.Provider value={data}>
            {children}
        </AuthorityContext.Provider>
    )
}

export default AuthorityContextProvider;