import "./WeeklyAnnouncementsPage.scss";
import { Link } from "react-router-dom";
import SavedWeeklyAnnouncements from "../../components/SavedWeeklyAnnouncements/SavedWeeklyAnnouncements";
import { API_URL } from "../../utilities/api";
import { useState } from "react";
import DraftPublishToggle from "../../components/DraftPublishToggle/DraftPublishToggle";
import PageHeader from "../../components/PageHeader/PageHeader";

function WeeklyAnnouncementsPage() {
  const [draft, setDraft] = useState(false);

  return (
    <section className="weekly-announcements-page">
      <PageHeader title="Weekly Announcements">
        <DraftPublishToggle setDraft={setDraft} />
        <Link
          className="weekly-announcements-page__link"
          to="/weekly-announcements/add-new"
        >
          Add New
        </Link>
      </PageHeader>

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
