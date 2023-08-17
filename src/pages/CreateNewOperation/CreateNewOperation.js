import "./CreateNewOperation.css"
import InputField from "../../components/InputField";
import {useForm} from "react-hook-form";
import Select from "../../components/Select";
import axios from "axios";
import Button from "../../components/Button";
import {useContext} from "react";
import {WorkstationContext} from "../../context/WorkstationContext";

function CreateNewOperation() {

    const {register, handleSubmit} = useForm()
    const {workstations, setWorkstation} = useContext(WorkstationContext)
    async function assignOperationToWorkstation(response, data) {
        try{
            const ASSIGN_URL = `http://localhost:8080/operation/${response.data.id}/workstation/${data.workstation}`
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

    const options = [
        {ONGEDAAN: "Ongedaan"},
        {BEZIG: "Bezig"},
        {KLAAR: "klaar"},
    ]
    async function createOperation(data) {
        try {
            console.log(data)
            const POST_URL = `http://localhost:8080/operation/new`;
            const response = await axios.post(POST_URL, {
                dateIndication: data.dateIndication,
                timeIndication: data.timeIndication,
                instruction: data.instruction,
                comment: data.comment,
                status: data.status,
                name: data.name,
                device: data.device,
            }, {
                headers: {
                    'Content-Type': "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            await assignOperationToWorkstation(response, data)
            console.log(response)
        } catch (e) {
            console.error("failed", e)
        }

    }

    return(
    <>
        <form className={"create-new-operation-form"} onSubmit={handleSubmit(createOperation)}>
        <InputField
            type={"date"}
            name={"dateIndication"}
            register={register}
        />

        <InputField
            type={"time"}
            name={"timeIndication"}
            register={register}
        />

        <InputField
            type={"text"}
            name={"instruction"}
            placeholderText={"Instructie"}
            register={register}
        />

        <InputField
            type={"text"}
            name={"comment"}
            placeholderText={"Commentaar"}
            register={register}
        />

        <Select
            className={"status-selection"}
            register={register}
            name={"status"}
            option={
            <>
                <option value={"ONGEDAAN"}>Ongedaan</option>
                <option value={"BEZIG"}>Bezig</option>
                <option value={"KLAAR"}>Klaar</option>
            </>}
            value1={"ONGEDAAN"}
            option1={"Ongedaan"}
            value2={"BEZIG"}
            option2={"Bezig"}
            value3={"KLAAR"}
            option3={"Klaar"}
        >
            Initiële status
        </Select>

        <InputField
            type={"text"}
            name={"name"}
            placeholderText={"Titel"}
            register={register}
        />

        <InputField
            type={"text"}
            name={"device"}
            placeholderText={"Apparaat"}
            register={register}
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


    </>
    )
}

export default CreateNewOperation