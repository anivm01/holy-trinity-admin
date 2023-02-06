import { useEffect, useState } from "react";
import WeeklyAnnouncementUpload from "../WeeklyAnnouncementUpload/WeeklyAnnouncementUpload";
import "./WeeklyAnnouncementForm.scss";
import axios from 'axios';
import DOMPurify from 'dompurify';
import API_URL from "../../utilities/api";
import ErrorModal from "../ErrorModal/ErrorModal";
import { dateInputConverter } from "../../utilities/dateConverter";
import SuccessModal from "../SuccessModal/SuccessModal";


function WeeklyAnnouncementForm() {
  const [date, setDate] = useState("");
  const [enTitleToSend, setEnTitleToSend] = useState("");
  const [enContentToSend, setEnContentToSend] = useState("");
  //const [contentToDisplay, setContentToDisplay] = useState("")
  const [bgTitleToSend, setBgTitleToSend] = useState("");
  const [bgContentToSend, setBgContentToSend] = useState("");

  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // console.log(date)
  // let toTimestamp = date => Date.parse(date)
  // console.log(toTimestamp(date))

  // function createMarkup(html) {
  //   return {
  //     __html: DOMPurify.sanitize(html)
  //   }
  // }

  // useEffect(() => {
  //   if(enContentToSend) {
  //       setContentToDisplay(enContentToSend);
  //   }
  // }, [enContentToSend]);

  const onSubmit = (e) => {
    e.preventDefault();

    if(!enTitleToSend || !enContentToSend || !bgTitleToSend || !bgContentToSend) {
      setUploadError(true)
      setErrorMessage("Make sure that you have filled out all the fields in both English and Bulgarian. If you wish to return and edit the content later leave some default content such as 'TBD' or 'update coming soon'")
      return
    }
    if(!date) {
      setUploadError(true)
      setErrorMessage("Make sure to add a date on which you want the announcement to be posted")
      return
    }

    const newAnnouncementEN = {
        title: enTitleToSend,
        announcement: enContentToSend,
        date: dateInputConverter(date)
    } 

    const newAnnouncementBG = {
      title: bgTitleToSend,
      announcement: bgContentToSend,
      date: dateInputConverter(date)
  }

    const uploadWeeklyAnnouncement = async () => {
      try {
          const enResponse = await axios.post(`${API_URL}/weekly-announcement/en`, newAnnouncementEN);
          const newAnnouncementBGUpdated = { ...newAnnouncementBG, en_id:enResponse.data.new_announcement.id }
          const bgResponse = await axios.post(`${API_URL}/weekly-announcement/bg`, newAnnouncementBGUpdated)
          setUploadSuccess(true)
      } catch (err) {
          console.error(err);
          setUploadError(true)
          setErrorMessage("There was a problem with the connection. Please try again later.")
      }
  };
     uploadWeeklyAnnouncement()
  };

  return (
    <form onSubmit={onSubmit} className="weeklyAnnouncementForm">
        {uploadError && <ErrorModal errorMessage={errorMessage} setErrorMessage={setErrorMessage} setUploadError={setUploadError}/>}
        {uploadSuccess && <SuccessModal />}
        {/* {contentToDisplay && <div dangerouslySetInnerHTML={createMarkup(contentToDisplay)}></div>} */}
      <div className="weeklyAnnouncementForm__editors">
        <WeeklyAnnouncementUpload
          titleLabel="Enter a title or a greeting"
          editorLabel="Enter the main content in the editor below:"
          title={enTitleToSend}
          setTitleToSend={setEnTitleToSend}
          setContentToSend={setEnContentToSend}
        />
        <WeeklyAnnouncementUpload
          titleLabel="Въведете заглавие или поздравление"
          editorLabel="Въведете основното съдържание в редактора отдолу:"
          title={bgTitleToSend}
          setTitleToSend={setBgTitleToSend}
          setContentToSend={setBgContentToSend}
        />
      </div>
      <div className="weeklyAnnouncementForm__common">
        <label className="weeklyAnnouncementForm__label" htmlFor="date">
          Enter the date on which you want the announcement to be posted
        </label>
        <input
          className="weeklyAnnouncementForm__date"
          type="date"
          id="date"
          name="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <input
        className="weeklyAnnouncementForm__submit"
        type="submit"
        value="Save "
      />
    </form>

  );
}

export default WeeklyAnnouncementForm;
