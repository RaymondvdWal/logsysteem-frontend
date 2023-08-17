import "./CreateNewWorkstation.css"
import InputField from "../../components/InputField";
import Select from "../../components/Select";
import Button from "../../components/Button";
import {useForm} from "react-hook-form";
import axios from "axios";
import Textarea from "../../components/Textarea";
import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext";

function CreateNewWorkstation() {

    const {register, handleSubmit} = useForm()

    async function createWorkstation(data, e) {
        try {
            const POST_URL = "http://localhost:8080/workstation/new"
            const response = await axios.post(POST_URL, {
                name: data.name,
                pushMessage: data.pushMessage,
                generalMessage: data.generalMessage,
                location: data.location,
            }, {
                headers: {
                    'Content-Type': "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            console.log(response)
            alert(`user ${data.name} aangemaakt`)
            e.target[0].value="";
            e.target[1].value="";
            e.target[2].value="";
        } catch (e) {
            console.log(data)
            console.error("oepsiee", e)
        }
    }

    return(
        <form className={"create-new-workstation-form"} onSubmit={handleSubmit(createWorkstation)}>
            <InputField
                id={"name-field"}
                register={register}
                type={"text"}
                name={"name"}
                placeholderText={"Naam"}
            />

            <Textarea
                id={"urgent-message-field"}
                register={register}
                name={"pushMessage"}
                rows={5}
                cols={70}
                placeholderText={"Ruimte voor een zeer hoog urgente melding"}
            />

            <Textarea
                id={"normal-message-field"}
                register={register}
                name={"generalMessage"}
                rows={10}
                cols={70}
                placeholderText={"Ruimte voor een belangrijke melding"}
            />

            <Select
                className={"select-location"}
                children={"Selecteer de locatie"}
                register={register}
                name={"location"}
                option={
                        <>
                          <option value={"UTRECHT"}>Utrecht</option>
                          <option value={"NIEUWEGEIN"}>Nieuwegein</option>
                          <option value={"WOERDEN"}>Woerden</option>
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

export default CreateNewWorkstation

