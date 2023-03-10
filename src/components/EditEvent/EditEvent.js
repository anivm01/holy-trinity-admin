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
import { ThreeDots } from "react-loader-spinner";
import { updateItem } from "../../utilities/send";
import BgVersionConfirmation from "../BgVersionConfirmation/BgVersionConfirmation";

function EditEvent() {
  const [date, setDate] = useState("");
  const [eventDate, setEventDate] = useState("")
  const [enTitle, setEnTitle] = useState("");
  const [enContent, setEnContent] = useState("");
  const [bgTitle, setBgTitle] = useState("");
  const [bgContent, setBgContent] = useState("");
  const [bgVersion, setBgVersion] = useState("yes");


  const [isDraft, setIsDraft] = useState(true);
  const [dataLoaded, setDataLoaded] = useState(false);


  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const params = useParams()

  useEffect(()=>{
    const fetchEventContent = async () => {
        const enData = await axios.get(`${API_URL}${eventSlug}/en/${params.id}`)
        setEnTitle(enData.data.title)
        setEnContent(enData.data.event_details)
        setDate(dateOutputConverter(enData.data.date))
        setEventDate(dateOutputConverter(enData.data.event_date))
        setIsDraft(enData.data.is_draft)

        const bgData = await axios.get(`${API_URL}${eventSlug}/bg/${params.id}`)
        setBgTitle(bgData.data.title)
        setBgContent(bgData.data.event_details);
        setBgVersion(bgData.data.bg_version ? "yes" : "no");
        
        setDataLoaded(true);
    }
    fetchEventContent()
  },[params.id])

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
    const response = updateItem(posts, `${API_URL}/event`, params.id);
    setUploadSuccess(response);
    if (response === false) {
      setUploadError(true);
      setErrorMessage(
        "There was a problem with the connection. Try again later."
      );
    }
  };

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

    const updateEvent = async () => {
      try {
        await axios.put(
          `${API_URL}${eventSlug}/en/${params.id}`,
          newEventEN
        );
        

        await axios.put(
          `${API_URL}${eventSlug}/bg/${params.id}`,
          newEventBG
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
    updateEvent();
  };

  if (
    !dataLoaded
  ) {
    return <ThreeDots
    height="80" 
    width="80" 
    radius="9"
    color="#6F0B20" 
    ariaLabel="three-dots-loading"
    wrapperStyle={{justifyContent: "center"}}
    wrapperClassName=""
    visible={true}
     />;
  }

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
            className="event__submit"
            type="submit"
            value={isDraft ? "Update Draft" : "Revert to Draft and Save Changes"}
            onClick={onSave}
          />
      <DateInput date={date} setDate={setDate}/>
      <BgVersionConfirmation
          bgVersion={bgVersion}
          setBgVersion={setBgVersion}
        />
      <div className="event__bottom">
      <input
            className="event__submit"
            type="submit"
            value={isDraft ? "Publish" : "Update Live Content"}
            onClick={onPublish}
          />
      </div>
    </form>
  );
}

export default EditEvent;
