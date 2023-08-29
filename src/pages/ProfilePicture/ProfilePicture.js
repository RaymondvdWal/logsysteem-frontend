import "./ProfilePicture.css"
import axios from "axios";
import InputField from "../../components/InputField";
import {useForm} from "react-hook-form";
import Button from "../../components/Button";
import {useContext, useState} from "react";
import {AuthContext} from "../../context/AuthContext";

function ProfilePicture() {

    const {register,handleSubmit, formState: {errors}, watch} = useForm();
    const {auth, toggleAuth, auth:{user}} = useContext(AuthContext)
    const [disable, setDisable] = useState(true)

    async function assignPictureToUser(response, data) {
        try {
            const ASSIGN_URL = `http://localhost:8080/users/${user.username}/profilePicture/${response.data.id}`
            const succes = await axios.put(ASSIGN_URL, {
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }, responseType: "blob"
            })
            console.log(data.data)
            const img = URL.createObjectURL(data.data)
            toggleAuth({
                ...auth,
                isAuth: true,
                ...user,
                user: {
                    username: user.username,
                    password: user.password,
                    email: user.email,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    workStation: user.workStation,
                    profilePicture: img
                }
            })
            console.log(succes)
        } catch (e) {
            console.error("Er ging iets mis", e)
        }
    }

    async function getLoadProfilePicture(response) {
        try {
            const GET_URL = `http://localhost:8080/pic/${response.data.id}`
            const data = (await axios.get(GET_URL, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }, responseType: "blob"
            }))
            await assignPictureToUser(response, data)
            console.log(user)
            console.log(data)
        } catch (e) {
            console.error("Er ging iets mis", e)
        }
    }

    async function chooseProfilePicture(data) {
        try {
            const URL = "http://localhost:8080/pic/new"
            const response = await axios.post(URL, {
                pic: data.pic[0],
                filename: data.pic[0].name
            }, {
                headers: {
                    'Content-Type': "multipart/form-data",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
                })
            await getLoadProfilePicture(response)
            console.log(data)
            console.log(response)
        } catch (error) {
            console.error(error)
        }
    }

    function formatChecker() {
        const format = watch("pic")
        console.log(format[0].type)
        if (format[0].name.match(/\.(jpg|jpeg|png|gif)$/)) {
            setDisable(false)
        } else {
            setDisable(true)
        }
    }

    return(
    <section className={"picture-container"}>
        <form onSubmit={handleSubmit(chooseProfilePicture)} className={"upload-form"} onChange={formatChecker}>
            <InputField
                type={"file"}
                register={register}
                name={"pic"}
                errors={errors}
                validation={{required: "Selecteer een foto."}}
            />

            <Button
                buttonType={"submit"}
                disabled={disable}
            >
                Uploaden
            </Button>
        </form>

        {disable && <p>Kies een foto in jpeg, jpg of png formaat</p>}

        <div className={"show-picture"}>
            {<img src={user.profilePicture} alt={user.username}/>}
        </div>
    </section>
    )
}

export default ProfilePicture;