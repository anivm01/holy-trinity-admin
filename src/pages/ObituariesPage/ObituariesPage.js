import './ObituariesPage.scss'
import { Link } from "react-router-dom"
import SavedObituaries from '../../components/SavedObituaries/SavedObituaries'
import { useState } from 'react';
import { API_URL } from '../../utilities/api';
import DraftPublishToggle from '../../components/DraftPublishToggle/DraftPublishToggle';
import PageHeader from "../../components/UI/PageHeader/PageHeader";

function ObituariesPage() {
  const [draft, setDraft] = useState(false);

  return (
    <section className='obituaries-page'>
      <PageHeader title="In Memoriam">
        <DraftPublishToggle setDraft={setDraft} />
        <Link className='obituaries-page__link' to="/obituaries/add-new">Add New</Link>
      </PageHeader>
      {draft && (
        <SavedObituaries url={`${API_URL}/drafts/en/obituaries`} />
      )}
      {!draft && (
        <SavedObituaries
          url={`${API_URL}/published/en/obituaries`}
        />
      )}
    </section>
  )
}

export default ObituariesPage