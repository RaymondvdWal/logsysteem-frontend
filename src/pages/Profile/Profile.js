import "./Profile.css"
import {AuthContext} from "../../context/AuthContext";
import {useContext} from "react";

function Profile() {

    const {auth: {user}} = useContext(AuthContext)

    return(
    <section className={"outer-container"}>
        <div className={"user-info"}>
            <p>{user.username}</p>
            <p>{user.email}</p>
            <p>{user.firstname}</p>
            <p>{user.lastname}</p>
        </div>

        <div className={"user-image"}>
            <img src={user.profilePicture} alt={user.username}/>
        </div>
    </section>
    )
}

export default Profile;