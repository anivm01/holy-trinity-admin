import "./WeeklyAnnouncementsPage.scss";
import { Link } from "react-router-dom";
import SavedWeeklyAnnouncements from "../../components/SavedWeeklyAnnouncements/SavedWeeklyAnnouncements";
import { API_URL } from "../../utilities/api";
import { useState } from "react";
import DraftPublishToggle from "../../components/DraftPublishToggle/DraftPublishToggle";

function WeeklyAnnouncementsPage() {
  const [draft, setDraft] = useState(true);

  return (
    <section className="weekly-announcements-page">
      <h1 className="weekly-announcements-page__title" >Weelky Announcements</h1>
      <div className="weekly-announcements-page__navigation">
      <DraftPublishToggle setDraft={setDraft} />
      <Link
        className="weekly-announcements-page__link"
        to="/weekly-announcements/add-new"
      >
        Add New
      </Link>
      </div>
      {draft && (
        <SavedWeeklyAnnouncements url={`${API_URL}/drafts/en/announcements`} />
      )}
      {!draft && (
        <SavedWeeklyAnnouncements
          url={`${API_URL}/published/en/announcements`}
        />
      )}
    </section>
  );
}

export default WeeklyAnnouncementsPage;
