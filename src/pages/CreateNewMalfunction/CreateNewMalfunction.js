import "./CreateNewMalfunction.css"
import InputField from "../../components/InputField";
import {useForm} from "react-hook-form";
import Textarea from "../../components/Textarea";
import Select from "../../components/Select";
import Button from "../../components/Button";
import axios from "axios";
import {useContext} from "react";
import {WorkstationContext} from "../../context/WorkstationContext";

function CreateNewMalfunction() {

    const {register, handleSubmit} = useForm()
    const {workstations, setWorkstation} = useContext(WorkstationContext)



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

    async function createMalfunction(data) {
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
        } catch (e) {
            console.error("failed", e)
        }

    }

    return(
        <form className={"create-new-malfunction"} onSubmit={handleSubmit(createMalfunction)}>
            <InputField
                register={register}
                name={"title"}
                type={"text"}
                placeholderText={"Titel"}
            />

            <Textarea
                register={register}
                name={"description"}
                placeholderText={"Beschrijf de storing"}
                rows={10}
                cols={70}
            />

            <Textarea
                register={register}
                name={"action"}
                placeholderText={"Welke acties zijn genomen?"}
                rows={5}
                cols={70}
            />

            <Textarea
                register={register}
                name={"solution"}
                placeholderText={"Beschrijf hier de oplossing"}
                rows={5}
                cols={70}
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
                    </>}
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
                    </>}
            />

            <Select
                className={"workstation-selection"}
                register={register}
                name={"workstation"}
                option={workstations.map((workstation) => {
                    return <option value={workstation.id}>{workstation.name}</option>
                })}
            />

            <Button
            buttonType={"submit"}
            >
                Versturen
            </Button>
        </form>

    )
}

export default CreateNewMalfunction