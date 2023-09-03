import './EventsPage.scss'
import { Link } from "react-router-dom"
import SavedEvents from '../../components/SavedEvents/SavedEvents'
import { useState } from 'react';
import DraftPublishToggle from '../../components/DraftPublishToggle/DraftPublishToggle';
import PageHeader from '../../components/PageHeader/PageHeader';
import { API_URL } from '../../utilities/api';

function EventsPage() {
  const [draft, setDraft] = useState(false);

  return (
    <section className='events-page'>
      <PageHeader title="Events">
        <DraftPublishToggle setDraft={setDraft} />
        <Link className='events-page__link' to="/events/add-new">Add New</Link>
      </PageHeader>
      {draft && (
        <SavedEvents url={`${API_URL}/drafts/en/events`} />
      )}
      {!draft && (
        <SavedEvents
          url={`${API_URL}/published/en/events`}
        />
      )}
    </section>
  )
}

export default EventsPage