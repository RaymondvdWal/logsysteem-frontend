import "./CreateNewOperation.css"
import InputField from "../../components/InputField";
import {useForm} from "react-hook-form";
import Select from "../../components/Select";

function CreateNewOperation() {

    const {register} = useForm()

    return(
    <>

        <InputField
            type={"date"}
            name={"time-indication"}
            placeholderText={"voer een datum in"}
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
            register={register}
            name={"status"}
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


        <p>test</p>
    </>
    )
}

export default CreateNewOperation