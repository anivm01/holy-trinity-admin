import { useState } from "react";
import "./AddNewFeast.scss";
import { API_URL } from "../../../utilities/api";
import axios from "axios";
import ErrorModal from "../../ErrorModal/ErrorModal";
import SuccessModal from "../../SuccessModal/SuccessModal";
import { getDefaultDateTime } from "../../../utilities/dateConverter";
import FeastEntryForm from "../FeastEntryForm/FeastEntryForm";

function AddNewFeast() {
  const [entry, setEntry] = useState({
    event_date: getDefaultDateTime(10, 15),
    title: "",
    title_bg: "",
    is_default: true,
    event_details: "",
    event_details_bg: "",
  });

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

    const uploadEntry = async (post) => {
      const token = sessionStorage.getItem("authToken");
      try {
        await axios.post(`${API_URL}/feasts`, post, {
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
    uploadEntry(entry);
  };

  return (
    <div className="new-feast">
      {uploadError && (
        <ErrorModal
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
          setUploadError={setUploadError}
        />
      )}
      {uploadSuccess && <SuccessModal />}
      <FeastEntryForm
        formType="add"
        formTitle="Add New Feast"
        entry={entry}
        setEntry={setEntry}
        onPublish={onPublish}
      />
    </div>
  );
}

export default AddNewFeast;
