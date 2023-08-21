import "./ManualUpdateOperation.css"
import Select from "../../components/Select";
import {useForm} from "react-hook-form";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import {useParams} from "react-router-dom";
import axios from "axios";
import {useContext} from "react";
import {OperationContext} from "../../context/OperationContext";
import {AuthContext} from "../../context/AuthContext";

function ManualUpdateOperation() {
    const {register, handleSubmit} = useForm()
    const {id} = useParams()
    const {operation, setOperation} = useContext(OperationContext)
    const {auth: {user}} = useContext(AuthContext)

    async function updateOperation(data) {
        try {
            const UPDATE_URL = `http://localhost:8080/operation/${id}`
            const response = await axios.put(UPDATE_URL, {
                ...operation,
                status: data.status,
                operationPickedUp: data.operationPickedUp,
                operationDone: data.operationDone,
                pickedUpBy: data.username,
                finishedBy: data.username,
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }, responseType: "json"
            })
            console.log(response)
        } catch (e) {
            console.error("failed", e)
        }

    }

    return (
        <form onSubmit={handleSubmit(updateOperation)} className={"manual-update-operation"}>
            <Select
            register={register}
            name={"status"}
            option={
                <>
                    <option value={"ONGEDAAN"}>Ongedaan</option>
                    <option value={"BEZIG"}>Bezig</option>
                    <option value={"KLAAR"}>Klaar</option>
                </>}
            />

            <InputField

                register={register}
                name={"operationPickedUp"}
                type={"datetime-local"}
                children={"starttijd:"}
            />

            <InputField
                register={register}
                name={"operationDone"}
                type={"datetime-local"}
                children={"eindtijd:"}
            />

            <InputField
                register={register}
                name={"username"}
                type={"text"}
                value={user.username}
                editable={false}
            />

            <Button
                buttonType={"submit"}
            >
                Verzenden
            </Button>
        </form>

    )
}

export default ManualUpdateOperation