import { useState } from "react";
import "./AddNewVideo.scss";
import ErrorModal from "../../ErrorModal/ErrorModal";
import SuccessModal from "../../SuccessModal/SuccessModal";
import axios from "axios";
import { API_URL } from "../../../utilities/api";
import VideoEntryFrom from "../VideoEntryForm/VideoEntryForm";
import { getCurrentDateTimeLocal } from "../../../utilities/dateConverter";

function AddNewVideo() {
  const defaultDate = getCurrentDateTimeLocal();
  const [commentary, setCommentary] = useState("");
  const [entry, setEntry] = useState({
    title: "",
    youtube_video_id: "",
    upload_date: defaultDate,
    commentary: commentary,
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
    const post = {
      title: entry.title,
      youtube_video_id: entry.youtube_video_id,
      upload_date: entry.upload_date,
      commentary: commentary,
    };

    const uploadEntry = async (post) => {
      console.log(post);
      const token = sessionStorage.getItem("authToken");
      try {
        await axios.post(`${API_URL}/videos`, post, {
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
    <div className="add-video">
      {uploadError && (
        <ErrorModal
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
          setUploadError={setUploadError}
        />
      )}
      {uploadSuccess && <SuccessModal />}
      <VideoEntryFrom
        formTitle={"Add New video"}
        entry={entry}
        handleChange={handleChange}
        setCommentary={setCommentary}
        commentary={commentary}
        onPublish={onPublish}
      />
    </div>
  );
}

export default AddNewVideo;
