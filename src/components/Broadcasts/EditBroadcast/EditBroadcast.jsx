import { useState } from "react";
import ErrorModal from "../../ErrorModal/ErrorModal";
import SuccessModal from "../../SuccessModal/SuccessModal";
import axios from "axios";
import { API_URL } from "../../../utilities/api";
import BroadcastEntryFrom from "../BroadcastEntryForm/BroadcastEntryForm";
import ModifyButton from "../../UI/ModifyButton/ModifyButton";
import { toDatetimeLocalString } from "../../../utilities/dateConverter";
import Modal from "../../UI/Modal/Modal";

function EditBroadcast({ single }) {
  const [visible, setVisible] = useState();
  const utcString = single.broadcast_time;
  const date = new Date(utcString);
  const localISOTime = toDatetimeLocalString(date);

  //success and error message states
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [entry, setEntry] = useState({
    title: single.title,
    title_bg: single.title_bg,
    heading: single.heading,
    heading_bg: single.heading_bg,
    youtube_video_id: single.youtube_video_id,
    featured_image_url: single.featured_image_url,
    broadcast_time: localISOTime,
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setEntry((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  //function to handle uploading the new entry
  const onPublish = () => {
    //publish
    const uploadEntry = async (entry) => {
      const token = sessionStorage.getItem("authToken");
      try {
        await axios.put(`${API_URL}/broadcasts/${single.id}`, entry, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUploadSuccess(true);
        setVisible(false);
      } catch (err) {
        console.log(err.response);
        setVisible(false);
        setUploadError(true);
        setErrorMessage(
          "There was a problem with the connection. Try again later."
        );
      }
    };
    uploadEntry(entry);
  };

  return (
    <div>
      <ModifyButton
        onClick={() => {
          setVisible(true);
        }}
        hasText={true}
        hasIcon={true}
        type="edit"
      />
      <Modal visible={visible} setVisible={setVisible}>
        <BroadcastEntryFrom
          formTitle={"Edit Broadcast"}
          entry={entry}
          handleChange={handleChange}
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

export default EditBroadcast;
