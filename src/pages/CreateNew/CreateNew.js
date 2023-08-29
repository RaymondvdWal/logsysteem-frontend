import "./CreateNew.css"
import Button from "../../components/Button";
import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import {AuthorityContext} from "../../context/AuthorityContext";

function CreateNew() {

    const navigate = useNavigate()
    const {authority} = useContext(AuthorityContext)

    return(
    <>
        <div className={"button-container-create"}>
            {   authority === "MODERATOR"
                 &&
                <Button
                    buttonType={"onClick"}
                    buttonOnClick={(() => {navigate("/new-workstation")})}
                >
                    Werkplek
                </Button>
            }

            {   authority === "ADMIN"
                 &&
                <Button
                    buttonType={"onClick"}
                    buttonOnClick={(() => {navigate("/create-new-account")})}
                >
                    Account
                </Button>
            }

            {   authority === "MODERATOR"
                 &&
                <Button
                    buttonType={"onClick"}
                    buttonOnClick={(() => {navigate("/new-operation")})}
                >
                    Handeling
                </Button>
            }

            {   authority !== "ADMIN"
                 &&
                <Button
                    buttonType={"onClick"}
                    buttonOnClick={(() => {navigate("/new-malfunction")})}
                >
                    Storing
                </Button>
            }

        </div>

    </>
    )
}

export default CreateNew