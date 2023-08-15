import axios from "axios";
import {createContext, useEffect, useState} from "react";
import jwt_decode from "jwt-decode";
import {useNavigate} from "react-router-dom";
import {checkTokenValidity} from "../pages/helper/checkTokenValidity";
import defaultProfilePicture from "../assets/Tijdelijke profielfoto.jpg"


export const AuthContext = createContext(null);

function AuthContextProvider({children}) {
    
    const [auth, toggleAuth] = useState({
        isAuth: false,
        user: null,
        status: "pending",
    })
    const navigate = useNavigate();
    
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        
        if (storedToken && checkTokenValidity(storedToken)) {
            void login(storedToken)
        } else {
            toggleAuth({
                ...auth,
                isAuth: false,
                user: null,
                status: "done",
            })
        }
    },[]);

    async function getLoadProfilePicture(username, email, firstname, lastname, password, profilePicture, workStation) {
        try {
            const GET_URL = `http://localhost:8080/pic/${profilePicture.id}`
            const data = (await axios.get(GET_URL, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }, responseType: "blob"
            }))
            const img = URL.createObjectURL(data.data)
            console.log(data)
            toggleAuth({
                ...auth,
                isAuth: true,
                user: {
                    username,
                    email,
                    firstname,
                    lastname,
                    password,
                    profilePicture: img,
                    workStation
                },
                status: "done"
            })
        } catch (e) {
            console.error("Er ging iets mis", e)
        }
    }

    async function login(jwt, redirect) {
        localStorage.setItem("token", jwt)
        const decodedToken = jwt_decode(jwt)
        const URL = `http://localhost:8080/users/${decodedToken.sub}`
        console.log(decodedToken)
        try {
            const {data:{username, email, firstname, lastname, password, profilePicture, workStation}} = await axios.get(URL,
                {headers: {
                "Content-Type" : "application/json",
                        Authorization: `Bearer ${jwt}`
            }})
            console.log(profilePicture)
           toggleAuth( {
               ...auth,
               isAuth: true,
               user: {
                   username,
                   password,
                   email,
                   firstname,
                   lastname,
                   profilePicture,
                   workStation,
               },
               status: "done"
           })
            if (profilePicture === null){
                toggleAuth({
                    ...auth,
                    isAuth: true,
                    user: {
                        username,
                        password,
                        email,
                        firstname,
                        lastname,
                        profilePicture: defaultProfilePicture,
                        workStation,
                    },
                    status: "done"
                })
            } else {
                await getLoadProfilePicture(username, email, firstname, lastname, password, profilePicture, workStation)

            }
            if (redirect) {
                navigate("/location")
            }
            
        } catch (error) {
            return alert("failure")
        }
    }

    function logout() {
        localStorage.clear()
        toggleAuth({
            ...auth,
            isAuth: false,
            user: null
        });
        navigate('/')
        console.log("logout")
    }

    const data = {
        login: login,
        logout: logout,
        auth: auth,
        toggleAuth: toggleAuth
    }

    return(
       <AuthContext.Provider value={data}>
           {auth.status === "done" ? children : <p> Loading... </p>}
       </AuthContext.Provider>
    )
}

export default AuthContextProvider;