import "./CreateNewAccount.css"
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import Select from "../../components/Select";
import {useForm} from "react-hook-form";
import axios, {options} from "axios";
import {getValue} from "@testing-library/user-event/dist/utils";
import {useNavigate} from "react-router-dom";
import login from "../Login/Login";
import {useContext, useState} from "react";
import {AuthContext} from "../../context/AuthContext";

function CreateNewAccount() {
    const {register, formState: {errors}, handleSubmit,watch} = useForm();
    const navigate = useNavigate();
    const {login, auth} = useContext(AuthContext)
    const [disable, setDisable] = useState(true)

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
            e.target[5].value="Selecteer een rol";
        }catch (error) {
            console.error("er is iets mis gegaan", error)
            console.log(data)
            console.log()
        }
    }

    function formChecker() {
        const checkAuthoruty = watch("authority")
        if (checkAuthoruty !== "Selecteer een rol") {
            setDisable(false)
        } else {
            setDisable(true)
        }
    }


    return (
        <form className={"create-new-account-form"} onSubmit={handleSubmit(submit)} onChange={formChecker}>
            <InputField
            id={"username-field"}
            register={register}
            type={"text"}
            name={"username"}
            placeholderText={"Gebruikersnaam"}
            errors={errors}
            validation={{required: "Gebruikersnaam is verplicht"}}
            />

            <InputField
            id={"password-field"}
            register={register}
            type={"password"}
            name={"password"}
            placeholderText={"Wachtwoord"}
            errors={errors}
            validation={{required: "Wachtwoord is verplicht", minLength: {
                value: 10,
                message: "Minimaal 10 tekens"
                }}}
            />

            <InputField
            id={"firstname-field"}
            register={register}
            type={"text"}
            name={"firstname"}
            placeholderText={"Voornaam"}
            errors={errors}
            validation={{required: "Voornaam is verplicht", maxLength: {
                    value: 20,
                    message: "Maximaal 20 tekens"
                }}}
            />

            <InputField
            id={"lastname-field"}
            register={register}
            type={"text"}
            name={"lastname"}
            placeholderText={"Achternaam"}
            errors={errors}
            validation={{required: "Achternaam is verplicht", maxLength: {
                    value: 25,
                    message: "Maximaal 25 tekens"
                }}}
            />

            <InputField
            id={"email-field"}
            register={register}
            type={"email"}
            name={"email"}
            placeholderText={"Email"}
            errors={errors}
            validation={{required: "Email is verplicht"}}
            />

            <Select
                className={"authority-selector"}
                register={register}
                name="authority"
                option={
                        <>
                         <option> Selecteer een rol</option>
                         <option value={"user"}>Medewerker</option>
                         <option value={"moderator"}>Specialist</option>
                         <option value={"admin"}>Admin</option>
                        </>
                }
                errors={errors}
            />

            <Button
                buttonType={"submit"}
                disabled={disable}
            >
                Verzenden
            </Button>
        </form>
    )
}

export default CreateNewAccount;