import "./CreateNewWorkstation.css"
import InputField from "../../components/InputField";
import Select from "../../components/Select";
import Button from "../../components/Button";
import {useForm} from "react-hook-form";
import axios from "axios";
import Textarea from "../../components/Textarea";
import {useState} from "react";

function CreateNewWorkstation() {

    const {register, handleSubmit, formState: {errors}, watch} = useForm()
    const [disable, setDisable] = useState(true)

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
            alert(`Werkplek ${data.name} aangemaakt`)
            e.target[0].value="";
            e.target[1].value="";
            e.target[2].value="";
        } catch (e) {
            if (data.location === "Selecteer een locatie"){
                alert("Selecteer een locatie!")
            }
            console.error("failed", e)
        }
    }

    function formChecker() {
        const validateLocation = watch("location")
        if (validateLocation !== "Selecteer een locatie"){
            setDisable(false)
        } else {
            setDisable(true)
        }
    }

    return(
        <form className={"create-new-workstation-form"} onSubmit={handleSubmit(createWorkstation)} onChange={formChecker}>
            <InputField
                id={"name-field"}
                register={register}
                type={"text"}
                name={"name"}
                placeholderText={"Naam"}
                errors={errors}
                validation={{required: "Naam is verplicht"}}
            />

            <Textarea
                id={"urgent-message-field"}
                register={register}
                name={"pushMessage"}
                rows={5}
                cols={70}
                placeholderText={"Ruimte voor een zeer hoog urgente melding"}
                errors={errors}
                validation={{maxLength: {
                        value: 200,
                        message: "maximaal 200 tekens"
                    }}}
            />

            <Textarea
                id={"normal-message-field"}
                register={register}
                name={"generalMessage"}
                rows={10}
                cols={70}
                placeholderText={"Ruimte voor een belangrijke melding"}
                errors={errors}
                validation={{maxLength: {
                        value: 400,
                        message: "maximaal 400 tekens"
                    }}}
            />

            <Select
                className={"select-location"}
                register={register}
                name={"location"}
                option={
                        <>
                          <option> Selecteer een locatie</option>
                          <option value={"UTRECHT"}>Utrecht</option>
                          <option value={"NIEUWEGEIN"}>Nieuwegein</option>
                          <option value={"WOERDEN"}>Woerden</option>
                        </>
                }
                errors={errors}
                validation={{required: "Selecteer een locatie"}}
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

export default CreateNewWorkstation

