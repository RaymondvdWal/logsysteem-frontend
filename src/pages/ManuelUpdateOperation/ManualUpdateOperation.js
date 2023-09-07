import "./ManualUpdateOperation.css"
import Select from "../../components/Select";
import {useForm} from "react-hook-form";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {useContext, useEffect, useState} from "react";
import {OperationContext} from "../../context/OperationContext";
import {AuthContext} from "../../context/AuthContext";

function ManualUpdateOperation() {
    const {register, handleSubmit, watch, formState: {errors}} = useForm()
    const {id} = useParams()
    const {operation} = useContext(OperationContext)
    const {auth: {user}} = useContext(AuthContext)
    const [selectedStatus, setSelectedStatus] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        setSelectedStatus("ONGEDAAN")
    },[])

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
            navigate(`/operation/${id}`)
        } catch (e) {
            console.error("failed", e)
        }
    }

    function statusChecker() {
        const selectedStatus = watch("status", "default")
        console.log(selectedStatus)
        setSelectedStatus(selectedStatus)
    }

    return (
        <form onSubmit={handleSubmit(updateOperation)} className={"manual-update-operation"} onChange={statusChecker}>
            <Select
            register={register}
            name={"status"}
            defaultValue={"ONGEDAAN"}
            option={
                <>
                    <option value={"ONGEDAAN"}>Ongedaan</option>
                    <option value={"BEZIG"}>Bezig</option>
                    <option value={"KLAAR"}>Klaar</option>
                </>
            }
            errors={errors}
            />

            <InputField
                register={register}
                name={"operationPickedUp"}
                type={"datetime-local"}
                children={"starttijd:"}
                disable={selectedStatus === "ONGEDAAN"}
                errors={errors}
            />

            <InputField
                register={register}
                name={"operationDone"}
                type={"datetime-local"}
                children={"eindtijd:"}
                disable={(selectedStatus !== "KLAAR")}
                errors={errors}
            />

            <InputField
                register={register}
                name={"username"}
                type={"text"}
                value={user.username}
                editable={false}
                errors={errors}
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