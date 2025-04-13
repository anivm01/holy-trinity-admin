import { useState } from "react";
import ErrorModal from "../../ErrorModal/ErrorModal";
import SuccessModal from "../../SuccessModal/SuccessModal";
import axios from "axios";
import { API_URL } from "../../../utilities/api";
import VideoEntryFrom from "../VideoEntryForm/VideoEntryForm";
import ModifyButton from "../../UI/ModifyButton/ModifyButton";
import Modal from "../../UI/Modal/Modal";
import { getCurrentDateTimeLocal } from "../../../utilities/dateConverter";

function EditVideo({ single }) {
  const [visible, setVisible] = useState();
  //success and error message states
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [commentary, setCommentary] = useState(single.commentary);

  const [entry, setEntry] = useState({
    title: single.title,
    youtube_video_id: single.youtube_video_id,
    upload_date: getCurrentDateTimeLocal(single.upload_date),
    commentary: commentary,
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
    const post = {
      title: entry.title,
      youtube_video_id: entry.youtube_video_id,
      upload_date: entry.upload_date,
      commentary: commentary,
    };
    //publish
    const uploadEntry = async (post) => {
      const token = sessionStorage.getItem("authToken");
      try {
        await axios.put(`${API_URL}/videos/${single.id}`, post, {
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
    uploadEntry(post);
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
        <VideoEntryFrom
          formTitle={"Edit Video"}
          entry={entry}
          handleChange={handleChange}
          setCommentary={setCommentary}
          commentary={commentary}
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

export default EditVideo;
