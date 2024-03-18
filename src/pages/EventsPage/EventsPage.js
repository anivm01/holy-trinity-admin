import './EventsPage.scss'
import { Link } from "react-router-dom"
import SavedEvents from '../../components/Events/SavedEvents/SavedEvents'
import PageHeader from '../../components/UI/PageHeader/PageHeader';
import { API_URL } from '../../utilities/api';

function EventsPage() {

  return (
    <section className='events-page'>
      <PageHeader title="Events">
        <Link className='events-page__link' to="/events/add-new">Add New</Link>
      </PageHeader>
      <SavedEvents
        url={`${API_URL}/event`}
      />

    </section>
  )
}

export default EventsPage