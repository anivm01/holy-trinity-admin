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

function EditEvent() {
  const [date, setDate] = useState("");
  const [enTitle, setEnTitle] = useState("");
  const [enContent, setEnContent] = useState("");
  const [bgTitle, setBgTitle] = useState("");
  const [bgContent, setBgContent] = useState("");

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
        const bgData = await axios.get(`${API_URL}${eventSlug}/bg/${params.id}`)
        setBgTitle(bgData.data.title)
        setBgContent(bgData.data.event_details)
    }
    fetchEventContent()
  },[params.id])

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
    !enTitle ||
    !enContent ||
    !bgTitle ||
    !bgContent ||
    !date
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
      <DateInput date={date} setDate={setDate}/>
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

export default EditEvent;
