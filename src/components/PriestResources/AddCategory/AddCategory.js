import { useState } from "react";
import ErrorModal from "../../ErrorModal/ErrorModal";
import SuccessModal from "../../SuccessModal/SuccessModal";
import axios from "axios";
import { API_URL } from "../../../utilities/api";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import "./AddCategory.scss"

function AddCategory() {

    //regular inputs controlled and stored into one object
    const [entry, setEntry] = useState("");

    //success and error message states
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [uploadError, setUploadError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");


    //function to handle uploading the new entry
    const onPublish = (e) => {
        e.preventDefault();

        //publish
        const post = {
            name: entry,
        };

        const uploadEntry = async (post) => {
            const token = sessionStorage.getItem("authToken");
            try {
                await axios.post(`${API_URL}/priest-resources/category`, post, {
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
        <div className="add-category">
            {uploadError && (
                <ErrorModal
                    errorMessage={errorMessage}
                    setErrorMessage={setErrorMessage}
                    setUploadError={setUploadError}
                />
            )}
            {uploadSuccess && <SuccessModal />}
            <h2 className="add-category__title">Add A Category</h2>
            <Input label="Input a new cateogry" id="add-category" name="add-category" value={entry} onChange={(event) => setEntry(event.target.value)} type="text" inputComponent="input" />
            <Button
                text="Save"
                type="submit"
                onClick={onPublish}
            />
        </div>
    );
}

export default AddCategory;
