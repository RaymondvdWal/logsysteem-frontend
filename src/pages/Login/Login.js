import './Login.css'
import InputField from "../../components/InputField";
import {useForm} from "react-hook-form";
import Button from "../../components/Button";
import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext";
import axios from "axios";
function Login() {
    const {login, auth} = useContext(AuthContext);
    const {register, formState: {errors}, handleSubmit} = useForm();

    async function submit(data, e) {
        try {
            const URL = "http://localhost:8080/authenticate";
            const response = await axios.post(URL, {
                username: data.username,
                password: data.password,
            })
            console.log(response)
            console.log(response.data.jwt)
            login(response.data.jwt, "/location")
            e.target[0].value = "";
            e.target[1].value = "";
        } catch (error) {
            console.error("Onjuist username of wachtwoord", error)
        }
        console.log(data)
        console.log(data.username)
        console.log(data.password)
    }

    return (
        <>
            <form className={"login-form"} onSubmit={handleSubmit(submit)}>
                <InputField
                    id={"usernameField"}
                    register={register}
                    name={"username"}
                    // validation={{required: true, message: 'Please enter your username'}}
                    type={"text"}
                    placeholderText={"Username"}
                />

                <InputField
                    id={"passwordField"}
                    register={register}
                    name={"password"}
                    type={"password"}
                    placeholderText={"Wachtwoord"}
                />

                <div className={"button-container-login"}>
                    <Button
                        buttonType={"submit"}
                    >
                        Inloggen
                    </Button>

                    <Button
                        buttonType={"onclick"}
                    >
                        Vergeten
                    </Button>
                </div>
            </form>
        </>
    )
}

export default Login