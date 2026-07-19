import { useState } from "react";
import "./AddNewEvent.scss";
import { API_URL } from "../../../utilities/api";
import axios from "axios";
import ErrorModal from "../../ErrorModal/ErrorModal";
import SuccessModal from "../../SuccessModal/SuccessModal";
import EventEntryForm from "../EventEntryForm/EventEntryForm";

function AddNewEvent() {
  const currentDate = Math.floor(Date.now() / 1000);
  const [entry, setEntry] = useState(
    {
      event_date: currentDate,
      title: "",
      title_bg: "",
      is_default: true,
      event_details: "",
      event_details_bg: ""
    }
  )

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
        const response = await axios.post(`${API_URL}/event`, post, {
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
    uploadEntry(entry);
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
      <EventEntryForm formType="add" formTitle="Add New Event" entry={entry} setEntry={setEntry} onPublish={onPublish} />

    </>
  );
}

export default AddNewEvent;
