import { useState } from "react";
import axios from "axios";
import ErrorModal from "../../ErrorModal/ErrorModal";
import SuccessModal from "../../SuccessModal/SuccessModal";
import { API_URL } from "../../../utilities/api";
import ObituaryEntryForm from "../ObituaryEntryForm/ObituaryEntryForm";
import "./AddNewObituary.scss";

const emptyObituary = {
  name: "",
  name_bg: "",
  years: "",
  image_url: "",
  obituary: "",
  obituary_bg: "",
};

function AddNewObituary() {
  const [entry, setEntry] = useState(emptyObituary);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onPublish = async (event) => {
    event.preventDefault();

    if (!entry.name.trim() && !entry.name_bg.trim()) {
      setErrorMessage("Add the person's name in English or Bulgarian.");
      setUploadError(true);
      return;
    }

    const token = sessionStorage.getItem("authToken");

    try {
      await axios.post(`${API_URL}/obituaries`, entry, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUploadSuccess(true);
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message ||
          "There was a problem saving the obituary. Try again later.",
      );
      setUploadError(true);
    }
  };

  return (
    <div className="add-obituary">
      {uploadError && (
        <ErrorModal
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
          setUploadError={setUploadError}
        />
      )}
      {uploadSuccess && <SuccessModal />}
      <ObituaryEntryForm
        formType="add"
        formTitle="Add New Obituary"
        entry={entry}
        setEntry={setEntry}
        onPublish={onPublish}
      />
    </div>
  );
}

export default AddNewObituary;
