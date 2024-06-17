import { useState } from "react";
import "./AddNewBroadcast.scss"
import ErrorModal from "../../ErrorModal/ErrorModal";
import SuccessModal from "../../SuccessModal/SuccessModal";
import axios from "axios";
import { API_URL } from "../../../utilities/api";
import { getDefaultDateTime } from "../../../utilities/dateConverter";
import BroadcastEntryFrom from "../BroadcastEntryForm/BroadcastEntryForm";

function AddNewBroadcast() {

    const [entry, setEntry] = useState({
        title: "",
        title_bg: "",
        heading: "",
        heading_bg: "",
        youtube_video_id: "",
        featured_image_url: "",
        broadcast_time: getDefaultDateTime(10, 15),
    });
    const handleChange = (event) => {
        const { name, value } = event.target;
        setEntry((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    //success and error message states
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [uploadError, setUploadError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");


    //function to handle uploading the new entry
    const onPublish = (e) => {
        const post = {
            ...entry,
        }

        const uploadEntry = async (post) => {
            const token = sessionStorage.getItem("authToken");
            try {
                await axios.post(`${API_URL}/broadcasts`, post, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUploadSuccess(true);
            } catch (err) {
                console.log(err.response);
                setUploadError(true);
                setErrorMessage(
                    "There was a problem with the connection. Try again later."
                );
            }
        };
        uploadEntry(post);
    };

    return (
        <div className="add-broadcast">
            {uploadError && (
                <ErrorModal
                    errorMessage={errorMessage}
                    setErrorMessage={setErrorMessage}
                    setUploadError={setUploadError}
                />
            )}
            {uploadSuccess && <SuccessModal />}
            <BroadcastEntryFrom formTitle={"Add New Broadcast"} entry={entry} handleChange={handleChange} onPublish={onPublish} />
        </div>
    );
}

export default AddNewBroadcast;
