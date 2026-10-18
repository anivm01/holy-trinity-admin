import { useState } from "react";
import axios from "axios";
import ErrorModal from "../../ErrorModal/ErrorModal";
import SuccessModal from "../../SuccessModal/SuccessModal";
import Modal from "../../UI/Modal/Modal";
import ModifyButton from "../../UI/ModifyButton/ModifyButton";
import { API_URL } from "../../../utilities/api";
import ObituaryEntryForm from "../ObituaryEntryForm/ObituaryEntryForm";

function EditObituary({ single }) {
  const [visible, setVisible] = useState(false);
  const [entry, setEntry] = useState({
    name: single.name || "",
    name_bg: single.name_bg || "",
    years: single.years || "",
    image_url: single.image_url || "",
    obituary: single.obituary || "",
    obituary_bg: single.obituary_bg || "",
  });
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
      await axios.put(`${API_URL}/obituaries/${single.id}`, entry, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setVisible(false);
      setUploadSuccess(true);
    } catch (error) {
      setVisible(false);
      setErrorMessage(
        error.response?.data?.message ||
          "There was a problem updating the obituary. Try again later.",
      );
      setUploadError(true);
    }
  };

  return (
    <div>
      <ModifyButton
        onClick={() => setVisible(true)}
        hasText={false}
        hasIcon
        type="edit"
      />
      <Modal visible={visible} setVisible={setVisible}>
        <ObituaryEntryForm
          formType={`edit-${single.id}`}
          formTitle="Edit Obituary"
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

export default EditObituary;
