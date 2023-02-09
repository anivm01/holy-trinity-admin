import { useState } from "react";
import "./AddNewEvent.scss";
import axios from "axios";
import { API_URL, eventSlug } from "../../utilities/api";
import ErrorModal from "../ErrorModal/ErrorModal";
import { dateInputConverter } from "../../utilities/dateConverter";
import SuccessModal from "../SuccessModal/SuccessModal";
import Wysiwyg from "../Wysiwyg/Wysiwyg";
import DateInput from "../DateInput/DateInput";
import OneLineInput from "../OneLineInput/OneLineInput";

function AddNewEvent() {
  const [date, setDate] = useState("");
  const [enTitle, setEnTitle] = useState("");
  const [enContent, setEnContent] = useState("");
  const [bgTitle, setBgTitle] = useState("");
  const [bgContent, setBgContent] = useState("");

  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    if (
      !enTitle ||
      !enContent ||
      !bgTitle ||
      !bgContent
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
        "Make sure to add a date on which you want the event to be posted"
      );
      return;
    }

    const newEventEN = {
      title: enTitle,
      event_details: enContent,
      date: dateInputConverter(date),
    };

    const newEventBG = {
      title: bgTitle,
      event_details: bgContent,
      date: dateInputConverter(date),
    };

    const uploadEvent = async () => {
      try {
        const enResponse = await axios.post(
          `${API_URL}${eventSlug}/en`,
          newEventEN
        );
        
        const newEventBGUpdated = {
          ...newEventBG,
          en_id: enResponse.data.new_entry.id,
        };

        await axios.post(
          `${API_URL}${eventSlug}/bg`,
          newEventBGUpdated
        );

        setUploadSuccess(true);
      } catch (err) {
        console.error(err.response);
        setUploadError(true);
        setErrorMessage(
          "There was a problem with the connection. Please try again later."
        );
      }
    };
    uploadEvent();
  };

  return (
    <form onSubmit={onSubmit} className="event">
      {uploadError && (
        <ErrorModal
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
          setUploadError={setUploadError}
        />
      )}
      {uploadSuccess && <SuccessModal />}
      <h1 className="event__title">Add a New Event</h1>
      <DateInput date={date} setDate={setDate}/>
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
      <div className="event__bottom">
        <input
          className="event__submit"
          type="submit"
          value="Save "
        />
      </div>
    </form>
  );
}

export default AddNewEvent;
