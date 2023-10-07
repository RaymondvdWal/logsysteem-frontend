import "./CreateNewOperation.css"
import InputField from "../../components/InputField";
import {useForm} from "react-hook-form";
import Select from "../../components/Select";
import axios from "axios";
import Button from "../../components/Button";
import {useContext, useState} from "react";
import {WorkstationContext} from "../../context/WorkstationContext";
import Textarea from "../../components/Textarea";

function CreateNewOperation() {

    const {register, handleSubmit, formState: {errors}, watch} = useForm()
    const {workstations} = useContext(WorkstationContext)
    const [disable, setDisable] = useState(true)
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

    async function createOperation(data, e) {
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
            e.target[0].value = ""
            e.target[1].value = ""
            e.target[2].value = ""
            e.target[3].value = ""
            e.target[4].value = ""
            e.target[5].value = ""
            e.target[6].value = ""
            e.target[7].value = ""
        } catch (e) {
            console.error("failed", e)
        }
    }

    function formChecker() {
        const validateAuthority = watch("workstation")
        if (validateAuthority !== "Selecteer een werkplek") {
            setDisable(false)
        } else {
            setDisable(true)
        }

    }

    return(
    <>
        <form className={"create-new-operation-form"} onSubmit={handleSubmit(createOperation)} onChange={formChecker}>
        <InputField
            type={"date"}
            name={"dateIndication"}
            register={register}
            errors={errors}
        />

        <InputField
            type={"time"}
            name={"timeIndication"}
            register={register}
            errors={errors}
        />

        <Textarea
        placeholderText={"Schrijf hier de instructie"}
        register={register}
        name={"instruction"}
        errors={errors}
        validation={{required: "Instructie is verplicht."}}
        rows={5}
        cols={50}
        />

        <Textarea
            placeholderText={"Schrijf hier een opmerking"}
            register={register}
            name={"comment"}
            errors={errors}
            validation={{maxLength: {
                    value: 250,
                    message: "Maximaal 250 tekens"
                }}}
            rows={5}
            cols={50}
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
            errors={errors}
            validation={{required: "Status is verplicht."}}
        >
            Initiële status
        </Select>

        <InputField
            type={"text"}
            name={"name"}
            placeholderText={"Titel"}
            register={register}
            errors={errors}
            validation={{required: "Een titel is verplicht.", maxLength: {
                value: 25,
                message: "Maximaal 25 tekens"
                }}}
        />

        <InputField
            type={"text"}
            name={"device"}
            placeholderText={"Apparaat"}
            register={register}
            errors={errors}
            validation={{required: "Een apparaat is verplicht", maxLength: {
                value: 25,
                message: "Maximaal 25 tekens"
                }}}
        />

        <Select
            className={"workstation-selection"}
            register={register}
            name={"workstation"}
            option={
            <>
                <option>Selecteer een werkplek</option>
                {workstations.map((workstation) => {
                    return <option value={workstation.id}>{workstation.name}({workstation.location.toLowerCase()})</option>
                })}
            </>
            }

            errors={errors}
        />

        <Button
            buttonType={"submit"}
            disabled={disable}
        >
            Versturen
        </Button>
    </form>


    </>
    )
}

export default CreateNewOperation