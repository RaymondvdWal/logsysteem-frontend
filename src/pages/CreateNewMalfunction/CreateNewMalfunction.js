import "./CreateNewMalfunction.css"
import InputField from "../../components/InputField";
import {useForm} from "react-hook-form";
import Textarea from "../../components/Textarea";
import Select from "../../components/Select";
import Button from "../../components/Button";
import axios from "axios";
import {useContext, useState} from "react";
import {WorkstationContext} from "../../context/WorkstationContext";

function CreateNewMalfunction() {

    const {register, handleSubmit, formState: {errors}, watch} = useForm()
    const {workstations} = useContext(WorkstationContext)
    const [disable, setDisable] = useState(true)

    async function assignMalfunctionToWorkstation(response, data) {
        try{
            const ASSIGN_URL = `http://localhost:8080/malfunction/${response.data.id}/workstation/${data.workstation}`
            const assignResponse = await axios.put(ASSIGN_URL, {
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            console.log(assignResponse)
        } catch (e) {
            console.error("failed", e)
        }
    }

    async function createMalfunction(data, e) {
        try{
            const CREATE_URL = "http://localhost:8080/malfunction/new"
            const response = await axios.post(CREATE_URL, {
                title: data.title,
                description: data.description,
                action: data.action,
                solution: data.solution,
                status: data.status,
                urgency: data.urgency,
            }, {
                headers: {
                    'Content-Type': "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            console.log(response)
            await assignMalfunctionToWorkstation(response, data)
            e.target[0].value = ""
            e.target[1].value = ""
            e.target[2].value = ""
            e.target[3].value = ""
            e.target[4].value = "--- Wat is de status? ---"
            e.target[5].value = "--- Wat is de prioriteit? ---"
        } catch (e) {
            if (data.status === "--- Wat is de status? ---") {
                alert("Selecteer de status!")
            }
            if (data.urgency === "--- Wat is de prioriteit? ---") {
                alert("Selecteer de prioriteit!")
            }
            console.error("failed", e)
        }
    }

    function formChecker() {
        const validateStatus =watch("status")
        const validateUrgency = watch("urgency")
        const validateWorkstation = watch("workstation")
        if (validateStatus !== "--- Wat is de status? ---" &&
            validateUrgency !== "--- Wat is de prioriteit? ---" &&
            validateWorkstation !== "Selecteer een werkplek") {
            setDisable(false)
        } else {
            setDisable(true)
        }
    }

    return(
        <form className={"create-new-malfunction"} onSubmit={handleSubmit(createMalfunction)} onChange={formChecker}>
            <InputField
                register={register}
                name={"title"}
                type={"text"}
                placeholderText={"Titel"}
                errors={errors}
                validation={{required: "Titel is verplicht", maxLength: {
                    value: 25,
                    message: "Maximaal 25 tekens"
                    }}}
            />

            <Textarea
                register={register}
                name={"description"}
                placeholderText={"Beschrijf de storing"}
                rows={10}
                cols={70}
                errors={errors}
                validation={{required: "Beschrijving is verplicht", maxLength: {
                        value: 500,
                        message: "Maximaal 500 tekens"
                    }}}
            />

            <Textarea
                register={register}
                name={"action"}
                placeholderText={"Welke acties zijn genomen?"}
                rows={5}
                cols={70}
                errors={errors}
                validation={{required: "Actie is verplicht", maxLength: {
                        value: 250,
                        message: "Maximaal 250 tekens"
                    }}}
            />

            <Textarea
                register={register}
                name={"solution"}
                placeholderText={"Beschrijf hier de oplossing"}
                rows={5}
                cols={70}
                errors={errors}
                validation={{maxLength: {
                        value: 250,
                        message: "Maximaal 250 tekens"
                    }}}
            />

            <Select
                className={"status-selection"}
                register={register}
                name={"status"}
                option={
                    <>
                        <option > --- Wat is de status? --- </option>
                        <option value={"ONGEDAAN"}>Ongedaan</option>
                        <option value={"BEZIG"}>Bezig</option>
                        <option value={"KLAAR"}>Klaar</option>
                    </>
                }
                errors={errors}
                validation={{required: "Status is verplicht."}}
            />

            <Select
                className={"status-selection"}
                register={register}
                name={"urgency"}
                option={
                    <>
                        <option > --- Wat is de prioriteit? --- </option>
                        <option value={"LAAG"}>Laag</option>
                        <option value={"MIDDEL"}>Middel</option>
                        <option value={"HOOG"}>Hoog</option>
                    </>
                }
                errors={errors}
                validation={{required: "Prioriteit is verplicht."}}
            />

            <Select
                className={"workstation-selection"}
                register={register}
                name={"workstation"}
                option={
                <>
                    <option>Selecteer een werkplek</option>
                    {workstations.map((workstation) => {
                        return <option value={workstation.id}>{workstation.name}{`(${workstation.location.toLowerCase()})`}</option>
                    })}
                </>}


                errors={errors}
            />

            <Button
            buttonType={"submit"}
            disabled={disable}
            >
                Versturen
            </Button>
        </form>

    )
}

export default CreateNewMalfunction