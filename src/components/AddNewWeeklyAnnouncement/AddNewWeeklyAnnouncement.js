import { useState } from "react";
import "./AddNewWeeklyAnnouncement.scss";
import { API_URL } from "../../utilities/api";
import ErrorModal from "../ErrorModal/ErrorModal";
import {
  dateInputConverter,
  dateOutputConverter,
} from "../../utilities/dateConverter";
import SuccessModal from "../SuccessModal/SuccessModal";
import DateInput from "../DateInput/DateInput";
import OneLineInput from "../OneLineInput/OneLineInput";
import { uploadItem } from "../../utilities/send";
import BgVersionConfirmation from "../BgVersionConfirmation/BgVersionConfirmation";
import WysiwygEdit from "../WysiwygEdit/WysiwygEdit";

function AddNewWeeklyAnnouncement() {
  const currentDate = Math.floor(Date.now() / 1000);
  const [date, setDate] = useState(dateOutputConverter(currentDate));
  const [enTitleToSend, setEnTitleToSend] = useState("");
  const [enContentToSend, setEnContentToSend] = useState("");
  const [bgTitleToSend, setBgTitleToSend] = useState("");
  const [bgContentToSend, setBgContentToSend] = useState("");
  const [bgVersion, setBgVersion] = useState("yes");

  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const createPosts = (draft) => {
    const newAnnouncementEN = {
      title: enTitleToSend,
      announcement: enContentToSend,
      date: dateInputConverter(date),
      is_draft: draft,
    };

    const newAnnouncementBG = {
      title: bgTitleToSend,
      announcement: bgContentToSend,
      date: dateInputConverter(date),
      bg_version: bgVersion === "yes" ? true : false,
    };
    return { en: newAnnouncementEN, bg: newAnnouncementBG };
  };

  const onSave = (e) => {
    e.preventDefault();
    //save draft
    const posts = createPosts(true);
    console.log(posts);
    const response = uploadItem(posts, `${API_URL}/weekly-announcement`);
    console.log(response);
    setUploadSuccess(response);
    if (response === false) {
      setUploadError(true);
      setErrorMessage(
        "There was a problem with the connection. Try again later."
      );
    }
  };

  const onPublish = (e) => {
    e.preventDefault();

    //validate content before publishing
    if (!enTitleToSend || enContentToSend < 8) {
      setUploadError(true);
      setErrorMessage(
        "Make sure to provide the date of the event, the event title, and the event description before publishing this item to the public. If you wish to return and edit the content later click the Save as Draft button above"
      );
      return;
    }
    if (!date) {
      setUploadError(true);
      setErrorMessage(
        "Make sure to add a date on which you want the entry to be posted"
      );
      return;
    }
    if (bgVersion === "yes" && !bgTitleToSend && bgContentToSend.length < 8) {
      setUploadError(true);
      setErrorMessage(
        "You've requested to make the Bulgarian version of this item public but no Bulgarian translations have been provided. Please fill out correct fields in Bulgarian or choose the option not to display the Bulgarian version."
      );
      return;
    }
    if (bgVersion === "yes" && !bgTitleToSend) {
      setUploadError(true);
      setErrorMessage(
        "You've requested to make the Bulgarian version of this item public but there is no Bulgarian title. Please fill out the title in Bulgarian or choose the option not to display the Bulgarian version."
      );
      return;
    }
    if (bgVersion === "yes" && bgContentToSend.length < 8) {
      setUploadError(true);
      setErrorMessage(
        "You've requested to make the Bulgarian version of this item public but the obituary content is empty. Please fill out the obituary content in Bulgarian or choose the option not to display the Bulgarian version."
      );
      return;
    }

    //publish
    const posts = createPosts(false);
    const response = uploadItem(posts, `${API_URL}/weekly-announcement`);
    setUploadSuccess(response);
    if (response === false) {
      setUploadError(true);
      setErrorMessage(
        "There was a problem with the connection. Try again later."
      );
    }
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
      <form className="weekly-announcement">
        <h1 className="weekly-announcement__title">
          Add a New Weekly Announcement
        </h1>
        <div className="weekly-announcement__multilingual">
          <div className="weekly-announcement__language-specific">
            <h2 className="weekly-announcement__subtitle">English</h2>
            <OneLineInput
              label="Enter a title or a greeting"
              oneLine={enTitleToSend}
              setOneLine={setEnTitleToSend}
            />
            <WysiwygEdit
              editorLabel="Enter the main content:"
              setContent={setEnContentToSend}
              content={enContentToSend}
            />
          </div>
          <div className="weekly-announcement__language-specific">
            <h2 className="weekly-announcement__subtitle">Български</h2>
            <OneLineInput
              label="Въведете заглавие или поздравление"
              oneLine={bgTitleToSend}
              setOneLine={setBgTitleToSend}
            />
            <WysiwygEdit
              editorLabel="Въведете основното съдържание:"
              setContent={setBgContentToSend}
              content={bgContentToSend}
            />
          </div>
        </div>
        <input
          className="button"
          type="submit"
          value="Save as Draft"
          onClick={onSave}
        />
        <DateInput date={date} setDate={setDate} />
        <BgVersionConfirmation
          bgVersion={bgVersion}
          setBgVersion={setBgVersion}
        />
        <div className="weekly-announcement__bottom">
          <input
            className="button"
            type="submit"
            value="Publish"
            onClick={onPublish}
          />
        </div>
      </form>
    </>
  );
}

export default AddNewWeeklyAnnouncement;
