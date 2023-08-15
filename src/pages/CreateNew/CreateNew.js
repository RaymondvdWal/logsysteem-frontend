import "./CreateNew.css"
import Button from "../../components/Button";
import {useNavigate} from "react-router-dom";

function CreateNew() {

    const navigate = useNavigate()

    return(
    <>
        <Button
            buttonType={"onClick"}
            buttonOnClick={(() => {navigate("/new-workstation")})}
        >
            Werkplek
        </Button>

        <Button
            buttonType={"onClick"}
            buttonOnClick={(() => {navigate("/create-new-account")})}
        >
            Account
        </Button>
    </>
    )
}

export default CreateNew