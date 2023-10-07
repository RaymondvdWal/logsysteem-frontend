import "./UpdateMlafunction.css"
import {useNavigate, useParams} from "react-router-dom";
import {useForm} from "react-hook-form";
import axios from "axios";
import InputField from "../../components/InputField";
import Textarea from "../../components/Textarea";
import Select from "../../components/Select";
import Button from "../../components/Button";
import {useContext} from "react";
import {MalfunctionContext} from "../../context/MalfunctionContext";

function UpdateMalfunction() {
    const {id} = useParams()
    const {register, handleSubmit, formState: {errors}} = useForm()
    const {malfunction} = useContext(MalfunctionContext)
    const navigate = useNavigate()

    async function updateMalfunction(data) {
        try {
            const UPDATE_URL = `http://localhost:8080/malfunction/${id}`
            const response = await axios.put(UPDATE_URL, {
                title: data.title,
                description: data.description,
                action: data.action,
                solution: data.solution,
                status: data.status,
                urgency: data.urgency,
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }, responseType: "json"
            })

            navigate(`/malfunction/${id}`)
        } catch (e) {
            console.error("failed", e)
        }

    }

    return(
        <form className={"create-new-malfunction"} onSubmit={handleSubmit(updateMalfunction)}>
            <InputField
                register={register}
                name={"title"}
                type={"text"}
                placeholderText={"Titel"}
                defaultValue={malfunction.title}
                errors={errors}
            />

            <Textarea
                register={register}
                name={"description"}
                placeholderText={"Beschrijf de storing"}
                rows={10}
                cols={70}
                defaultValue={malfunction.description}
                errors={errors}
            />

            <Textarea
                register={register}
                name={"action"}
                placeholderText={"Welke acties zijn genomen?"}
                rows={5}
                cols={70}
                defaultValue={malfunction.action}
                errors={errors}
            />

            <Textarea
                register={register}
                name={"solution"}
                placeholderText={"Beschrijf hier de oplossing"}
                rows={5}
                cols={70}
                defaultValue={malfunction.solution}
                errors={errors}
            />

            <Select
                className={"status-selection"}
                register={register}
                name={"status"}
                defaultValue={malfunction.status}
                option={
                    <>
                        <option > --- Wat is de status? --- </option>
                        <option value={"ONGEDAAN"}>Ongedaan</option>
                        <option value={"BEZIG"}>Bezig</option>
                        <option value={"KLAAR"}>Klaar</option>
                    </>
                }
                errors={errors}
            />

            <Select
                className={"status-selection"}
                register={register}
                name={"urgency"}
                defaultValue={malfunction.urgency}
                option={
                    <>
                        <option > --- Wat is de prioriteit? --- </option>
                        <option value={"LAAG"}>Laag</option>
                        <option value={"MIDDEL"}>Middel</option>
                        <option value={"HOOG"}>Hoog</option>
                    </>
                }
                errors={errors}
            />

            <Button
                buttonType={"submit"}
            >
                Versturen
            </Button>
        </form>
    )
}

export default UpdateMalfunction