import { useEffect, useState } from "react";
import "./EditWeeklyAnnouncement.scss";
import axios from "axios";
import { API_URL, weeklyAnnouncementSlug } from "../../utilities/api";
import ErrorModal from "../ErrorModal/ErrorModal";
import { dateInputConverter, dateOutputConverter } from "../../utilities/dateConverter";
import SuccessModal from "../SuccessModal/SuccessModal";
import HeadingInput from "../OneLineInput/OneLineInput";
import DateInput from "../DateInput/DateInput";
import { useParams } from "react-router-dom";
import WysiwygEdit from "../WysiwygEdit/WysiwygEdit";
import OneLineInput from "../OneLineInput/OneLineInput";
import { ThreeDots } from "react-loader-spinner";
import { updateItem } from "../../utilities/send";
import BgVersionConfirmation from "../BgVersionConfirmation/BgVersionConfirmation";

function EditWeeklyAnnouncement() {
  const [date, setDate] = useState("");
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
    const fetchAnnouncementContent = async () => {
        const enData = await axios.get(`${API_URL}${weeklyAnnouncementSlug}/en/${params.id}`)
        setEnTitle(enData.data.title)
        setEnContent(enData.data.announcement)
        setDate(dateOutputConverter(enData.data.date))
        setIsDraft(enData.data.is_draft)
        const bgData = await axios.get(`${API_URL}${weeklyAnnouncementSlug}/bg/${params.id}`)
        setBgTitle(bgData.data.title)
        setBgContent(bgData.data.announcement)
        setBgVersion(bgData.data.bg_version ? "yes" : "no");
        setDataLoaded(true);
    }
    fetchAnnouncementContent()
  },[params.id])


  const createPosts = (draft) => {
    const newAnnouncementEN = {
          title: enTitle,
          announcement: enContent,
          date: dateInputConverter(date),
          is_draft: draft
        };
    
        const newAnnouncementBG = {
          title: bgTitle,
          announcement: bgContent,
          date: dateInputConverter(date),
          bg_version: bgVersion === "yes" ? true : false
        };
    return { en: newAnnouncementEN, bg: newAnnouncementBG };
  };

  const onSave = (e) => {
    e.preventDefault();
    //save draft
    const posts = createPosts(true);
    const response = updateItem(posts, `${API_URL}/weekly-announcement`, params.id);
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
    if (!enTitle || enContent < 8) {
      setUploadError(true);
      setErrorMessage(
        "Make sure to provide the title, and announcement content before publishing this item to the public. If you wish to return and edit the content later click the Save as Draft button above"
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
        "You've requested to make the Bulgarian version of this item public but the obituary content is empty. Please fill out the obituary content in Bulgarian or choose the option not to display the Bulgarian version."
      );
      return;
    }

    //publish
    const posts = createPosts(false);
    const response = updateItem(posts, `${API_URL}/weekly-announcement`, params.id);
    setUploadSuccess(response);
    if (response === false) {
      setUploadError(true);
      setErrorMessage(
        "There was a problem with the connection. Try again later."
      );
    }
  };

  if (!dataLoaded) {
    return (
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="#6F0B20"
        ariaLabel="three-dots-loading"
        wrapperStyle={{ justifyContent: "center" }}
        wrapperClassName=""
        visible={true}
      />
    );
  }

  return (
    <form className="weekly-announcement">
      {uploadError && (
        <ErrorModal
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
          setUploadError={setUploadError}
        />
      )}
      {uploadSuccess && <SuccessModal />}
      <h1 className="weekly-announcement__title">Edit Weekly Announcement</h1>
      {isDraft ? (
          <p>This item is currently saved as a draft</p>
        ) : (
          <p>This item is published to the live site.</p>
        )}
      <div className="weekly-announcement__multilingual">
        <div className="weekly-announcement__language-specific">
          <h2 className="weekly-announcement__subtitle">English</h2>
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
        <div className="weekly-announcement__language-specific">
          <h2 className="weekly-announcement__subtitle">Български</h2>
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
          className="weekly-announcement__submit"
          type="submit"
          value={isDraft ? "Update Draft" : "Revert to Draft and Save Changes"}
          onClick={onSave}
        />
      <DateInput date={date} setDate={setDate}/>
      <BgVersionConfirmation
          bgVersion={bgVersion}
          setBgVersion={setBgVersion}
        />
      <div className="weekly-announcement__bottom">
        <input
          className="weekly-announcement__submit"
          type="submit"
          value={isDraft ? "Publish" : "Update Live Content"}
          onClick={onPublish}
        />
      </div>
    </form>
  );
}

export default EditWeeklyAnnouncement;
