import { useState } from "react";
import "./EditCaption.scss";
import ErrorModal from "../../ErrorModal/ErrorModal";
import SuccessModal from "../../SuccessModal/SuccessModal";
import axios from "axios";
import { API_URL } from "../../../utilities/api";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import ModifyButton from "../../UI/ModifyButton/ModifyButton";
import Modal from "../../UI/Modal/Modal";

function EditCaption({ id, caption }) {
    const [visible, setVisible] = useState()

    //success and error message states
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [uploadError, setUploadError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [newCaption, setNewCaption] = useState(caption);

    //function to handle uploading the new entry
    const handleSubmit = (e) => {
        e.preventDefault();

        const update = {
            caption: newCaption
        }

        //publish
        const uploadEntry = async (update) => {
            const token = sessionStorage.getItem("authToken");
            try {
                await axios.put(`${API_URL}/assets/${id}`, update, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUploadSuccess(true);
                setVisible(false)
            } catch (err) {
                console.log(err.response);
                setVisible(false)
                setUploadError(true);
                setErrorMessage(
                    "There was a problem with the connection. Try again later."
                );
            }
        };
        uploadEntry(update);
    };


    return (
        <div className="edit-pdf">
            <ModifyButton
                onClick={() => { setVisible(true) }}
                hasText={true}
                hasIcon={true}
                type='edit' />
            <Modal visible={visible} setVisible={setVisible} >
                <form className="edit-pdf__form">
                    <Input label="Rewrite the caption for this file" id="pdf-caption" name="caption" value={newCaption} onChange={(event) => setNewCaption(event.target.value)} type="text" inputComponent="input" />
                    <Button onClick={(e) => { handleSubmit(e) }} text="Save" type="submit" />
                </form>
            </Modal>
            {uploadError && (
                <ErrorModal
                    errorMessage={errorMessage}
                    setErrorMessage={setErrorMessage}
                    setUploadError={setUploadError}
                />
            )}
            {uploadSuccess && <SuccessModal />}

        </div>
    );
}

export default EditCaption;
