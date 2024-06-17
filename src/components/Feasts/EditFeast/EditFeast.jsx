import { useState } from "react";
import "./EditFeast.scss";
import ErrorModal from "../../ErrorModal/ErrorModal";
import SuccessModal from "../../SuccessModal/SuccessModal";
import axios from "axios";
import { API_URL } from "../../../utilities/api";
import ModifyButton from "../../UI/ModifyButton/ModifyButton";
import Modal from "../../UI/Modal/Modal";
import FeastEntryForm from "../FeastEntryForm/FeastEntryForm";
import { toDatetimeLocalString } from "../../../utilities/dateConverter";

function EditFeast({ single }) {
  const utcString = single.event_date;
  const date = new Date(utcString);
  const localISOTime = toDatetimeLocalString(date);
  const [visible, setVisible] = useState();
  const [entry, setEntry] = useState({
    event_date: localISOTime,
    title: single.title,
    title_bg: single.title_bg,
    is_default: single.is_default,
    event_details: single.event_details,
    event_details_bg: single.event_details_bg,
  });

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
        const response = await axios.put(
          `${API_URL}/feasts/${single.id}`,
          post,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response);
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
      <ModifyButton
        onClick={() => {
          setVisible(true);
        }}
        hasText={true}
        hasIcon={true}
        type="edit"
      />
      <Modal visible={visible} setVisible={setVisible}>
        <FeastEntryForm
          formType="edit"
          formTitle="Edit Feast"
          entry={entry}
          setEntry={setEntry}
          onPublish={onPublish}
        />
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

export default EditFeast;
