import './CalendarPage.scss'
import PageHeader from '../../components/PageHeader/PageHeader';
import { API_URL } from '../../utilities/api';
import SavedCalendar from '../../components/Calendar/SavedCalendar/SavedCalendar';
import AddNewCalendarEntry from '../../components/Calendar/AddNewCalendarEntry/AddNewCalendarEntry';

function CalendarPage() {

  return (
    <section className='events-page'>
      <PageHeader title="Calendar"></PageHeader>
      <AddNewCalendarEntry />
      <SavedCalendar
        url={`${API_URL}/calendar`}
      />
    </section>
  )
}

export default CalendarPage