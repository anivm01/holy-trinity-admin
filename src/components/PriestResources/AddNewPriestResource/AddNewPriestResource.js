import { useState } from "react";
import ErrorModal from "../../ErrorModal/ErrorModal";
import SuccessModal from "../../SuccessModal/SuccessModal";
import axios from "axios";
import { API_URL } from "../../../utilities/api";
import PriestResourceEntryForm from "../PriestResourceEntryForm/PriestResourceEntryForm";

function AddNewPriestResource() {

    //regular inputs controlled and stored into one object
    const [entry, setEntry] = useState({
        title: "",
        description: "",
        link: "",
        category_id: ""
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
                await axios.post(`${API_URL}/priest-resources`, post, {
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
        <>
            {uploadError && (
                <ErrorModal
                    errorMessage={errorMessage}
                    setErrorMessage={setErrorMessage}
                    setUploadError={setUploadError}
                />
            )}
            {uploadSuccess && <SuccessModal />}
            <PriestResourceEntryForm formTitle={"Add New Resource"} entry={entry} handleChange={handleChange} onPublish={onPublish} />
        </>
    );
}

export default AddNewPriestResource;
