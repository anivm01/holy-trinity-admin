import { useEffect, useState } from "react";
import "./EditEvent.scss";
import axios from "axios";
import { API_URL, eventSlug } from "../../utilities/api";
import ErrorModal from "../ErrorModal/ErrorModal";
import { dateInputConverter, dateOutputConverter } from "../../utilities/dateConverter";
import SuccessModal from "../SuccessModal/SuccessModal";
import DateInput from "../DateInput/DateInput";
import OneLineInput from "../OneLineInput/OneLineInput";
import WysiwygEdit from "../WysiwygEdit/WysiwygEdit";
import { useParams } from "react-router-dom";
import { updateItem } from "../../utilities/send";

function EditEvent({data, dataBg}) {
  const [date, setDate] = useState(dateOutputConverter(data.date));
  const [eventDate, setEventDate] = useState(dateOutputConverter(data.event_date))
  const [enTitle, setEnTitle] = useState(data.title);
  const [enContent, setEnContent] = useState(data.event_details);
  const [bgTitle, setBgTitle] = useState(dataBg.title);
  const [bgContent, setBgContent] = useState(dataBg.event_details);
  const [isDraft] = useState(data.is_draft);


  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const params = useParams()

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
      date: dateInputConverter(date)
    };
    return { en: newEventEN, bg: newEventBG };
  };

  const onSave = (e) => {
    e.preventDefault();

    //save draft
    const posts = createPosts(true);
    const response = updateItem(posts, `${API_URL}/event`, params.id);
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
      setErrorMessage(
        "Make sure to add the date the event will occur"
      );
      return;
    }
    if(!bgTitle) {
      setUploadError(true);
      setErrorMessage(
        "Please fill out the title in Bulgarian"
      );
      return;
    }
    if(bgContent.length < 8){
      setUploadError(true);
      setErrorMessage(
        "Please fill out the main content in Bulgarian."
      );
      return;
    }
    if(!enTitle) {
      setUploadError(true);
      setErrorMessage(
        "Please fill out the title in English"
      );
      return;
    }
    if(enContent.length < 8) {
      setUploadError(true);
      setErrorMessage(
        "Please fill out the main content in English"
      );
      return;
    }
    //publish
    const posts = createPosts(false);
    const response = updateItem(posts, `${API_URL}/event`, params.id);
    setUploadSuccess(response);
    if (response === false) {
      setUploadError(true);
      setErrorMessage(
        "There was a problem with the connection. Try again later."
      );
    }
  };

  return (
    <form className="event">
      {uploadError && (
        <ErrorModal
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
          setUploadError={setUploadError}
        />
      )}
      {uploadSuccess && <SuccessModal />}
      <h1 className="event__title">Edit Event</h1>
      {isDraft ? (
          <p>This item is currently saved as a draft</p>
        ) : (
          <p>This item is published to the live site.</p>
        )}
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
            className="button"
            type="submit"
            value={isDraft ? "Update Draft" : "Revert to Draft and Save Changes"}
            onClick={onSave}
          />
      <DateInput date={date} setDate={setDate}/>
      <div className="event__bottom">
      <input
            className="button"
            type="submit"
            value={isDraft ? "Publish" : "Update Live Content"}
            onClick={onPublish}
          />
      </div>
    </form>
  );
}

export default EditEvent;
