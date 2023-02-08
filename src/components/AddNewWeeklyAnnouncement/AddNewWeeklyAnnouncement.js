import { useState } from "react";
import "./AddNewWeeklyAnnouncement.scss";
import axios from "axios";
import { API_URL, weeklyAnnouncementSlug } from "../../utilities/api";
import ErrorModal from "../ErrorModal/ErrorModal";
import { dateInputConverter } from "../../utilities/dateConverter";
import SuccessModal from "../SuccessModal/SuccessModal";
import HeadingInput from "../OneLineInput/OneLineInput";
import Wysiwyg from "../Wysiwyg/Wysiwyg";
import DateInput from "../DateInput/DateInput";
import OneLineInput from "../OneLineInput/OneLineInput";

function AddNewWeeklyAnnouncement() {
  const [date, setDate] = useState("");
  const [enTitleToSend, setEnTitleToSend] = useState("");
  const [enContentToSend, setEnContentToSend] = useState("");
  const [bgTitleToSend, setBgTitleToSend] = useState("");
  const [bgContentToSend, setBgContentToSend] = useState("");

  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    if (
      !enTitleToSend ||
      !enContentToSend ||
      !bgTitleToSend ||
      !bgContentToSend
    ) {
      setUploadError(true);
      setErrorMessage(
        "Make sure that you have filled out all the fields in both English and Bulgarian. If you wish to return and edit the content later leave some default content such as 'TBD' or 'update coming soon'"
      );
      return;
    }
    if (!date) {
      setUploadError(true);
      setErrorMessage(
        "Make sure to add a date on which you want the announcement to be posted"
      );
      return;
    }

    const newAnnouncementEN = {
      title: enTitleToSend,
      announcement: enContentToSend,
      date: dateInputConverter(date),
    };

    const newAnnouncementBG = {
      title: bgTitleToSend,
      announcement: bgContentToSend,
      date: dateInputConverter(date),
    };

    const uploadWeeklyAnnouncement = async () => {
      try {
        const enResponse = await axios.post(
          `${API_URL}${weeklyAnnouncementSlug}/en`,
          newAnnouncementEN
        );
        const newAnnouncementBGUpdated = {
          ...newAnnouncementBG,
          en_id: enResponse.data.new_announcement.id,
        };
        await axios.post(
          `${API_URL}${weeklyAnnouncementSlug}/bg`,
          newAnnouncementBGUpdated
        );
        setUploadSuccess(true);
      } catch (err) {
        console.error(err);
        setUploadError(true);
        setErrorMessage(
          "There was a problem with the connection. Please try again later."
        );
      }
    };
    uploadWeeklyAnnouncement();
  };

  return (
    <form onSubmit={onSubmit} className="weekly-announcement">
      {uploadError && (
        <ErrorModal
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
          setUploadError={setUploadError}
        />
      )}
      {uploadSuccess && <SuccessModal />}
      <h1 className="weekly-announcement__title">Add a New Weekly Announcement</h1>
      <DateInput date={date} setDate={setDate}/>
      <div className="weekly-announcement__multilingual">
        <div className="weekly-announcement__language-specific">
          <h2 className="weekly-announcement__subtitle">English</h2>
          <OneLineInput
            label="Enter a title or a greeting"
            oneLine={enTitleToSend}
            setOneLine={setEnTitleToSend}
          />
          <Wysiwyg
            editorLabel="Enter the main content:"
            setContent={setEnContentToSend}
          />
        </div>
        <div className="weekly-announcement__language-specific">
          <h2 className="weekly-announcement__subtitle">Български</h2>
          <OneLineInput
            label="Въведете заглавие или поздравление"
            oneLine={bgTitleToSend}
            setOneLine={setBgTitleToSend}
          />
          <Wysiwyg
            editorLabel="Въведете основното съдържание:"
            setContent={setBgContentToSend}
          />
        </div>
      </div>
      <div className="weekly-announcement__bottom">
        <input
          className="weekly-announcement__submit"
          type="submit"
          value="Save "
        />
      </div>
    </form>
  );
}

export default AddNewWeeklyAnnouncement;
