import { useState } from "react";
import { Link } from "react-router-dom";
import DraftPublishToggle from "../../components/DraftPublishToggle/DraftPublishToggle";
import PageHeader from "../../components/PageHeader/PageHeader";
import SavedWorshipOffices from "../../components/SavedWorshipOffices/SavedWorshipOffices";
import { API_URL } from "../../utilities/api";
import "./WorshipOfficesPage.scss";

function WorshipOfficesPage() {
  const [draft, setDraft] = useState(false);

  return (
    <section className="worship-offices-page">
      <PageHeader title="Worship Offices">
        <DraftPublishToggle setDraft={setDraft} />
        <Link
          className="worship-offices-page__link"
          to="/worship-offices/add-new"
        >
          Add New
        </Link>
      </PageHeader>
      {draft && (
        <SavedWorshipOffices url={`${API_URL}/drafts/en/worship-offices`} />
      )}
      {!draft && (
        <SavedWorshipOffices url={`${API_URL}/published/en/worship-offices`} />
      )}
    </section>
  );
}

export default WorshipOfficesPage;
