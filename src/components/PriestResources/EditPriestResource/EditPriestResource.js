import { useState } from "react";
import ErrorModal from "../../ErrorModal/ErrorModal";
import SuccessModal from "../../SuccessModal/SuccessModal";
import axios from "axios";
import editIcon from "../../../assets/edit.svg"
import { API_URL } from "../../../utilities/api";
import Modal from "../../Modal/Modal";
import PriestResourceEntryForm from "../PriestResourceEntryForm/PriestResourceEntryForm";
import './EditPriestResource.scss'

function EditPriestResource({ single }) {
    const [visible, setVisible] = useState()

    //success and error message states
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [uploadError, setUploadError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [entry, setEntry] = useState({
        title: single.title,
        description: single.description,
        link: single.link,
        category_id: single.category_id
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
            title: entry.title,
            description: entry.description,
            link: entry.link,
            categoryId: entry.category_id
        };
        const uploadEntry = async (post) => {
            const token = sessionStorage.getItem("authToken");
            try {
                await axios.put(`${API_URL}/priest-resources/${single.id}`, post, {
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
        <div className="edit-priest-resource">
            <button
                className="edit-priest-resource__button"
                onClick={() => {
                    setVisible(true);
                }}
                type="button"
            >
                <img
                    className="edit-priest-resource__icon"
                    src={editIcon}
                    alt="edit"
                />
            </button>
            <Modal visible={visible} setVisible={setVisible} >
                <PriestResourceEntryForm formTitle={"Edit Resource"} entry={entry} handleChange={handleChange} onPublish={onPublish} />
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

export default EditPriestResource;
