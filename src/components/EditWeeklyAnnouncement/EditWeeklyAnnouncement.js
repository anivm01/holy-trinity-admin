import { useEffect, useState } from "react";
import "./EditWeeklyAnnouncement.scss";
import axios from "axios";
import { API_URL, weeklyAnnouncementSlug } from "../../utilities/api";
import ErrorModal from "../ErrorModal/ErrorModal";
import { dateInputConverter, dateOutputConverter } from "../../utilities/dateConverter";
import SuccessModal from "../SuccessModal/SuccessModal";
import HeadingInput from "../HeadingInput/HeadingInput";
import DateInput from "../DateInput/DateInput";
import { useParams } from "react-router-dom";
import WysiwygEdit from "../WysiwygEdit/WysiwygEdit";

function EditWeeklyAnnouncement() {
  const [date, setDate] = useState("");
  const [enTitle, setEnTitle] = useState("");
  const [enContent, setEnContent] = useState("");
  const [bgTitleToSend, setBgTitle] = useState("");
  const [bgContent, setBgContent] = useState("");

  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const params = useParams()

  useEffect(()=>{
    const fetchAnnouncementContent = async () => {
        const enData = await axios.get(`${API_URL}${weeklyAnnouncementSlug}/en/${params.id}`)
        setEnTitle(enData.data.title)
        setEnContent(enData.data.announcement)
        setDate(dateOutputConverter(enData.data.date))
        const bgData = await axios.get(`${API_URL}${weeklyAnnouncementSlug}/bg/${params.id}`)
        setBgTitle(bgData.data.title)
        setBgContent(bgData.data.announcement)
    }
    fetchAnnouncementContent()
  },[params.id])

  const onSubmit = (e) => {
    e.preventDefault();

    if (
      !enTitle ||
      !enContent ||
      !bgTitleToSend ||
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
        "Make sure to add a date on which you want the announcement to be posted"
      );
      return;
    }

    const updatedAnnouncementEN = {
      title: enTitle,
      announcement: enContent,
      date: dateInputConverter(date),
    };

    const updatedAnnouncementBG = {
      title: bgTitleToSend,
      announcement: bgContent,
      date: dateInputConverter(date),
    };

    const uploadWeeklyAnnouncement = async () => {
      try {
        const enResponse = await axios.put(
          `${API_URL}${weeklyAnnouncementSlug}/en/${params.id}`,
          updatedAnnouncementEN
        );
        // const newAnnouncementBGUpdated = {
        //   ...newAnnouncementBG,
        //   en_id: enResponse.data.new_announcement.id,
        // };
        const bgResponse = await axios.put(
          `${API_URL}${weeklyAnnouncementSlug}/bg/${params.id}`,
          updatedAnnouncementBG
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
  if (
    !enTitle ||
    !enContent ||
    !bgTitleToSend ||
    !bgContent ||
    !date
  ) {
    return <p>Loading...</p>
  }

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
      <h1 className="weekly-announcement__title">Edit Weekly Announcement</h1>
      <DateInput date={date} setDate={setDate}/>
      <div className="weekly-announcement__multilingual">
        <div className="weekly-announcement__language-specific">
          <h2 className="weekly-announcement__subtitle">English</h2>
          <HeadingInput
            titleLabel="Enter a title or a greeting"
            title={enTitle}
            setTitle={setEnTitle}
          />
          <WysiwygEdit
            editorLabel="Enter the main content:"
            setContent={setEnContent}
            content={enContent}
          />
        </div>
        <div className="weekly-announcement__language-specific">
          <h2 className="weekly-announcement__subtitle">Български</h2>
          <HeadingInput
            titleLabel="Въведете заглавие или поздравление"
            title={bgTitleToSend}
            setTitle={setBgTitle}
            
          />
          <WysiwygEdit
            editorLabel="Въведете основното съдържание:"
            setContent={setBgContent}
            content={bgContent}
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

export default EditWeeklyAnnouncement;
