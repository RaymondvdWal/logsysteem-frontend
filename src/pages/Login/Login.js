import './Login.css'
import InputField from "../../components/InputField";
import {useForm} from "react-hook-form";
import Button from "../../components/Button";
function Login() {

    /*const {register} = useForm();*/

    return (
        <>
            <form className={"login-form"}>
                <InputField
                    id={"usernameField"}
                    // register={register}
                    name={"username"}
                    // validation={{required: true, message: 'Please enter your username'}}
                    type={"text"}
                    placeholderText={"Username"}
                />

                <InputField
                    id={"passwordField"}
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