import './CalendarPage.scss'
import PageHeader from '../../components/UI/PageHeader/PageHeader';
import { API_URL } from '../../utilities/api';
import SavedCalendar from '../../components/Calendar/SavedCalendar/SavedCalendar';
import AddNewCalendarEntry from '../../components/Calendar/AddNewCalendarEntry/AddNewCalendarEntry';
import useFetch from '../../utilities/useFetch';
import NoData from '../../components/NoData/NoData';
import { ThreeDots } from "react-loader-spinner";
import CalendarPreview from "../CalendarPreview/CalendarPreview";


function CalendarPage() {
  const { data, error, loading } = useFetch(`${API_URL}/calendar`);

  if (loading) {
    return (
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="#6F0B20"
        ariaLabel="three-dots-loading"
        wrapperStyle={{ justifyContent: "center" }}
        wrapperClassName=""
        visible={true}
      />
    );
  }
  if (error) {
    return <NoData />;
  }
  if (data) {

    return (
      <section className='events-page'>
        <PageHeader title="Calendar"></PageHeader>
        <AddNewCalendarEntry />
        <SavedCalendar
          data={data}
        />
        <CalendarPreview />
      </section>
    )
  }
}

export default CalendarPage