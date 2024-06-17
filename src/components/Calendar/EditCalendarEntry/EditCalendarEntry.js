import { useState } from "react";
import "./EditCalendarEntry.scss";
import ErrorModal from "../../ErrorModal/ErrorModal";
import SuccessModal from "../../SuccessModal/SuccessModal";
import axios from "axios";
import editIcon from "../../../assets/edit.svg"
import { API_URL } from "../../../utilities/api";
import { toDatetimeLocalString } from "../../../utilities/dateConverter";
import Modal from "../../Modal/Modal";
import CalendarEntryForm from "../CalendarEntryForm/CalendarEntryForm";

function EditCalendarEntry({ single }) {
    const [visible, setVisible] = useState()
    const utcString = single.date;
    const date = new Date(utcString);
    const localISOTime = toDatetimeLocalString(date);

    //success and error message states
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [uploadError, setUploadError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [entry, setEntry] = useState({
        date: localISOTime,
        title: single.title,
        title_bg: single.title_bg,
        cross: single.cross,
        bold: single.bold,
        red: single.red,
        star: single.star,

    });

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;

        if (type === "checkbox") {
            setEntry((prevState) => ({
                ...prevState,
                [name]: checked,
            }));
        } else {
            setEntry((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
    };

    //function to handle uploading the new entry
    const onPublish = (e) => {
        e.preventDefault();

        //validate the date before publishing
        if (!entry.date) {
            setUploadError(true);
            setErrorMessage(
                "Make sure to add a date for this entry"
            );
            return;
        }

        const uploadEntry = async (post) => {
            const token = sessionStorage.getItem("authToken");
            try {
                await axios.put(`${API_URL}/calendar/${single.id}`, post, {
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
        uploadEntry(entry);
    };


    return (
        <div className="edit-calendar">
            <button
                className="edit-calendar__button"
                onClick={() => {
                    setVisible(true);
                }}
                type="button"
            >
                <img
                    className="edit-calendar__icon"
                    src={editIcon}
                    alt="edit"
                />
            </button>
            <Modal visible={visible} setVisible={setVisible} >
                <CalendarEntryForm formType={"edit"} formTitle={`Edit Entry for ${entry.date}`} entry={entry} handleChange={handleChange} onPublish={onPublish} />
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

export default EditCalendarEntry;
