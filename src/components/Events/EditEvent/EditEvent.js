import { useState } from "react";
import "./EditEvent.scss";
import ErrorModal from "../../ErrorModal/ErrorModal";
import SuccessModal from "../../SuccessModal/SuccessModal";
import axios from "axios";
import editIcon from "../../../assets/edit.svg"
import { API_URL } from "../../../utilities/api";
import Modal from "../../Modal/Modal";
import EventEntryForm from "../EventEntryForm/EventEntryForm";

function EditEvent({ single }) {
    const [visible, setVisible] = useState()
    const [entry, setEntry] = useState(
        {
            event_date: single.event_date,
            title: single.title,
            title_bg: single.title_bg,
            is_default: single.is_default,
            event_details: single.event_details,
            event_details_bg: single.event_details_bg
        }
    )

    //success and error message states
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [uploadError, setUploadError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");


    const onPublish = (e) => {
        e.preventDefault();

        if (!entry.event_date) {
            setUploadError(true);
            setErrorMessage("Make sure to add the date the event will occur");
            return;
        }

        const updateEntry = async (post) => {
            const token = sessionStorage.getItem("authToken");
            try {
                const response = await axios.put(`${API_URL}/event/${single.id}`, post, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(response)
                setUploadSuccess(true);
            } catch (err) {
                console.log(err.response);
                setUploadError(true);
                setErrorMessage(
                    "There was a problem with the connection. Try again later."
                );
            }
        };
        updateEntry(entry);
    };


    return (
        <div className="edit-event">
            <button
                className="edit-event__button"
                onClick={() => {
                    setVisible(true);
                }}
                type="button"
            >
                <img
                    className="edit-event__icon"
                    src={editIcon}
                    alt="edit"
                />
            </button>
            <Modal visible={visible} setVisible={setVisible} >
                <div className="edit-event__form">
                    <EventEntryForm formType={"edit"} formTitle={"Edit Event"} entry={entry} setEntry={setEntry} onPublish={onPublish} />
                </div>
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

export default EditEvent;
