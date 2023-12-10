import './CalendarPage.scss'
import PageHeader from '../../components/PageHeader/PageHeader';
import { API_URL } from '../../utilities/api';
import SavedCalendar from '../../components/SavedCalendar/SavedCalendar';

function CalendarPage() {

  return (
    <section className='events-page'>
      <PageHeader title="Calendar"></PageHeader>
      <SavedCalendar
        url={`${API_URL}/calendar`}
      />
    </section>
  )
}

export default CalendarPage