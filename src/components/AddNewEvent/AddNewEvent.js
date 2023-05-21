import { useState } from "react";
import "./AddNewEvent.scss";
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
import WysiwygEdit from "../WysiwygEdit/WysiwygEdit";

function AddNewEvent() {
  const currentDate = Math.floor(Date.now() / 1000);
  const [date, setDate] = useState(dateOutputConverter(currentDate));
  const [eventDate, setEventDate] = useState("");
  const [enTitle, setEnTitle] = useState("");
  const [enContent, setEnContent] = useState("");
  const [bgTitle, setBgTitle] = useState("");
  const [bgContent, setBgContent] = useState("");

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
    if (!date) {
      setUploadError(true);
      setErrorMessage(
        "Make sure to add a date on which you want the entry to be posted"
      );
      return;
    }
    if (!eventDate) {
      setUploadError(true);
      setErrorMessage("Make sure to add the date the event will occur");
      return;
    }
    if (!bgTitle) {
      setUploadError(true);
      setErrorMessage("Please fill out the title in Bulgarian");
      return;
    }
    if (bgContent.length < 8) {
      setUploadError(true);
      setErrorMessage("Please fill out the main content in Bulgarian.");
      return;
    }
    if (!enTitle) {
      setUploadError(true);
      setErrorMessage("Please fill out the title in English");
      return;
    }
    if (enContent.length < 8) {
      setUploadError(true);
      setErrorMessage("Please fill out the main content in English");
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

            <WysiwygEdit
              editorLabel="Enter the main content:"
              setContent={setEnContent}
              content={enContent}
            />
          </div>
          <div className="event__language-specific">
            <h2 className="event__subtitle">Български</h2>
            <OneLineInput
              label="Въведете заглавие или поздравление"
              oneLine={bgTitle}
              setOneLine={setBgTitle}
            />
            <WysiwygEdit
              editorLabel="Въведете основното съдържание:"
              setContent={setBgContent}
              content={bgContent}
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
