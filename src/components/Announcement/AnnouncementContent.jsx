import React, { useState } from "react";
import Wysiwyg from "../UI/Wysiwyg/Wysiwyg";
import { createMarkup } from "../../utilities/createMarkup";
import "./Announcement.scss";
import ErrorModal from "../ErrorModal/ErrorModal";
import SuccessModal from "../SuccessModal/SuccessModal";
import axios from "axios";
import { API_URL } from "../../utilities/api";
import { FormBox } from "../UI/FormBox/FormBox";

export const AnnouncementContent = ({ data }) => {
  const [announcement, setAnnouncement] = useState(data.announcement);
  const [announcementBg, setAnnouncementBg] = useState(data.announcement_bg);

  //success and error message states
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onPublish = () => {
    //publish
    const entry = {
      announcement: announcement,
      announcement_bg: announcementBg,
    };
    const uploadEntry = async (entry) => {
      const token = sessionStorage.getItem("authToken");
      try {
        await axios.put(`${API_URL}/announcement/1`, entry, {
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
    <div className="announcement">
      {uploadError && (
        <ErrorModal
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
          setUploadError={setUploadError}
        />
      )}
      {uploadSuccess && <SuccessModal />}
      <div className="announcement__edit">
        <FormBox
          className="announcement__form"
          formTitle="Edit Announcement"
          onPublish={onPublish}
        >
          <Wysiwyg
            editorLabel="Announcement in English"
            setContent={setAnnouncement}
            content={announcement}
          />
          <Wysiwyg
            editorLabel="Съобщение на Български"
            setContent={setAnnouncementBg}
            content={announcementBg}
          />
        </FormBox>
      </div>
      <div className="announcement__previews">
        <h2>Preview</h2>
        <div>
          <div
            className="announcement__preview"
            dangerouslySetInnerHTML={createMarkup(announcement)}
          ></div>
          <div
            className="announcement__preview"
            dangerouslySetInnerHTML={createMarkup(announcementBg)}
          ></div>
        </div>
      </div>
    </div>
  );
};
