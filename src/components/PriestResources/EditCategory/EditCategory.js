import { useState } from "react";
import ErrorModal from "../../ErrorModal/ErrorModal";
import SuccessModal from "../../SuccessModal/SuccessModal";
import axios from "axios";
import { API_URL } from "../../../utilities/api";
import Modal from "../../Modal/Modal";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";

function EditCategory({ name, id }) {
    const [visible, setVisible] = useState()

    //success and error message states
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [uploadError, setUploadError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [entry, setEntry] = useState(name);

    //function to handle uploading the new entry
    const onPublish = (e) => {
        e.preventDefault();

        //publish
        const post = {
            name: entry
        };
        const uploadEntry = async (post) => {
            const token = sessionStorage.getItem("authToken");
            try {
                await axios.put(`${API_URL}/priest-resources/category/${id}`, post, {
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
        uploadEntry(post);
    };


    return (
        <div>
            <Button
                text="Edit"
                type="button"
                onClick={() => {
                    setVisible(true);
                }}
            />
            <Modal visible={visible} setVisible={setVisible} >
                <h2 className="add-category__title">Edit A Category</h2>
                <Input label="Change cateogry name" id="edit-category" name="edit-category" value={entry} onChange={(event) => setEntry(event.target.value)} type="text" inputComponent="input" />
                <Button
                    text="Save"
                    type="submit"
                    onClick={onPublish}
                />
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

export default EditCategory;
