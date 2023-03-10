import { useState } from "react";
import "./AddNewEvent.scss";
import { API_URL } from "../../utilities/api";
import ErrorModal from "../ErrorModal/ErrorModal";
import { dateInputConverter, dateOutputConverter } from "../../utilities/dateConverter";
import SuccessModal from "../SuccessModal/SuccessModal";
import Wysiwyg from "../Wysiwyg/Wysiwyg";
import DateInput from "../DateInput/DateInput";
import OneLineInput from "../OneLineInput/OneLineInput";
import { uploadItem } from "../../utilities/send";
import BgVersionConfirmation from "../BgVersionConfirmation/BgVersionConfirmation";

function AddNewEvent() {
  const currentDate = Math.floor(Date.now() / 1000);
  const [date, setDate] = useState(dateOutputConverter(currentDate));
  const [eventDate, setEventDate] = useState("");
  const [enTitle, setEnTitle] = useState("");
  const [enContent, setEnContent] = useState("");
  const [bgTitle, setBgTitle] = useState("");
  const [bgContent, setBgContent] = useState("");
  
  const [bgVersion, setBgVersion] = useState("yes");

  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const createPosts = (draft) => {
    const newEventEN = {
      title: enTitle,
      event_details: enContent,
      event_date: dateInputConverter(eventDate),
      date: dateInputConverter(date),
      is_draft: draft,
    };

    const newEventBG = {
      title: bgTitle,
      event_details: bgContent,
      event_date: dateInputConverter(eventDate),
      date: dateInputConverter(date),
      bg_version: bgVersion === "yes" ? true : false,
    };
    return { en: newEventEN, bg: newEventBG };
  };

  const onSave = (e) => {
    e.preventDefault();

    //save draft
    const posts = createPosts(true);
    const response = uploadItem(posts, `${API_URL}/event`);
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
    if (!enTitle || enContent.length < 8 || !eventDate) {
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
    if (bgVersion === "yes" && !bgTitle && bgContent.length < 8) {
      setUploadError(true);
      setErrorMessage(
        "You've requested to make the Bulgarian version of this item public but no Bulgarian translations have been provided. Please fill out correct fields in Bulgarian or choose the option not to display the Bulgarian version."
      );
      return;
    }
    if (bgVersion === "yes" && !bgTitle) {
      setUploadError(true);
      setErrorMessage(
        "You've requested to make the Bulgarian version of this item public but there is no Bulgarian title. Please fill out the title in Bulgarian or choose the option not to display the Bulgarian version."
      );
      return;
    }
    if (bgVersion === "yes" && bgContent.length < 8) {
      setUploadError(true);
      setErrorMessage(
        "You've requested to make the Bulgarian version of this item public but the main content is empty. Please fill out the main content in Bulgarian or choose the option not to display the Bulgarian version."
      );
      return;
    }

    //publish
    const posts = createPosts(false);
    const response = uploadItem(posts, `${API_URL}/event`);
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
      <form className="event">
        <h1 className="event__title">Add a New Event</h1>
        <div className="date-input">
          <label className="date-input__label" htmlFor="event-date">
            Input the date of the event
          </label>
          <input
            className="date-input__date"
            type="date"
            id="event-date"
            name="event-date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
          />
        </div>
        <div className="event__multilingual">
          <div className="event__language-specific">
            <h2 className="event__subtitle">English</h2>
            <OneLineInput
              label="Enter a title or a greeting"
              oneLine={enTitle}
              setOneLine={setEnTitle}
            />

            <Wysiwyg
              editorLabel="Enter the main content:"
              setContent={setEnContent}
            />
          </div>
          <div className="event__language-specific">
            <h2 className="event__subtitle">Български</h2>
            <OneLineInput
              label="Въведете заглавие или поздравление"
              oneLine={bgTitle}
              setOneLine={setBgTitle}
            />
            <Wysiwyg
              editorLabel="Въведете основното съдържание:"
              setContent={setBgContent}
            />
          </div>
        </div>
        <input
          className="event__submit"
          type="submit"
          value="Save as Draft"
          onClick={onSave}
        />
        <DateInput date={date} setDate={setDate} />
        <BgVersionConfirmation
          bgVersion={bgVersion}
          setBgVersion={setBgVersion}
        />
        <div className="event__bottom">
          <input
            className="event__submit"
            type="submit"
            value="Publish"
            onClick={onPublish}
          />
        </div>
      </form>
    </>
  );
}

export default AddNewEvent;
