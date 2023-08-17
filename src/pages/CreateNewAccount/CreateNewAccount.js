import "./CreateNewAccount.css"
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import Select from "../../components/Select";
import {useForm} from "react-hook-form";
import axios, {options} from "axios";
import {getValue} from "@testing-library/user-event/dist/utils";
import {useNavigate} from "react-router-dom";
import login from "../Login/Login";
import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext";

function CreateNewAccount() {
    const {register, formState: {errors}, handleSubmit,control} = useForm();
    const navigate = useNavigate();
    const {login, auth} = useContext(AuthContext)
    async function submit(data, e) {
        console.log(data)
        try{
            const URL = `http://localhost:8080/users/${data.authority}`
            const response = await axios.post(URL, {
                username: data.username,
                password: data.password,
                firstname: data.firstname,
                lastname: data.lastname,
                email: data.email,
                enabled: true,
                apikey: "12345",
            }, {
                headers: {
                    'Content-Type': "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            console.log(response)
            alert(`user ${data.username} aangemaakt`)
            e.target[0].value="";
            e.target[1].value="";
            e.target[2].value="";
            e.target[3].value="";
            e.target[4].value="";
            e.target[5].value="";
        }catch (error) {
            console.error("er is iets mis gegaan", error)
            console.log(data)
            console.log()
        }
    }


    return (
        <form className={"create-new-account-form"} onSubmit={handleSubmit(submit)}>
            <InputField
            id={"username-field"}
            register={register}
            type={"text"}
            name={"username"}
            placeholderText={"Gebruikersnaam"}
            />

            <InputField
            id={"password-field"}
            register={register}
            type={"password"}
            name={"password"}
            placeholderText={"Wachtwoord"}
            />

            <InputField
            id={"firstname-field"}
            register={register}
            type={"text"}
            name={"firstname"}
            placeholderText={"Voornaam"}
            />

            <InputField
            id={"lastname-field"}
            register={register}
            type={"text"}
            name={"lastname"}
            placeholderText={"Achternaam"}
            />

            <InputField
            id={"email-field"}
            register={register}
            type={"email"}
            name={"email"}
            placeholderText={"Email"}
            />

            <Select
                className={"authority-selector"}
                children={"Rol: "}
                register={register}
                name="authority"
                option={
                        <>
                         <option value={"user"}>Medewerker</option>
                         <option value={"moderator"}>Specialist</option>
                         <option value={"admin"}>Admin</option>
                        </>
                }
            />

            <Button
                buttonType={"submit"}
            >
                Verzenden
            </Button>
        </form>
    )
}

export default CreateNewAccount;