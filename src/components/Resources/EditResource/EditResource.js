import { useState } from "react";
import "./EditResource.scss";
import ErrorModal from "../../ErrorModal/ErrorModal";
import SuccessModal from "../../SuccessModal/SuccessModal";
import axios from "axios";
import editIcon from "../../../assets/edit.svg"
import { API_URL } from "../../../utilities/api";
import Modal from "../../Modal/Modal";
import ResourceEntryForm from "../ResourceEntryForm/ResourceEntryForm";

function EditResource({ single }) {
    const [visible, setVisible] = useState()

    //success and error message states
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [uploadError, setUploadError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [entry, setEntry] = useState({
        text: single.text,
        url: single.url,
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setEntry((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    //function to handle uploading the new entry
    const onPublish = (e) => {
        e.preventDefault();

        //publish
        const post = {
            text: entry.text,
            url: entry.url,
        };
        const uploadEntry = async (post) => {
            const token = sessionStorage.getItem("authToken");
            try {
                await axios.put(`${API_URL}/resources/${single.id}`, post, {
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
        <div className="edit-resource">
            <button
                className="edit-resource__button"
                onClick={() => {
                    setVisible(true);
                }}
                type="button"
            >
                <img
                    className="edit-resource__icon"
                    src={editIcon}
                    alt="edit"
                />
            </button>
            <Modal visible={visible} setVisible={setVisible} >
                <ResourceEntryForm formTitle={"Edit Resource"} entry={entry} handleChange={handleChange} onPublish={onPublish} />
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

export default EditResource;
