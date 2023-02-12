import './EventsPage.scss'
import { Link } from "react-router-dom"
import SavedEvents from '../../components/SavedEvents/SavedEvents'

function EventsPage() {

    
  return (
    <section className='events-page'>
    <Link className='events-page__link' to="/events/add-new">Add New</Link>
    <SavedEvents />
    </section>
    )
}

export default EventsPage