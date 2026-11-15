import './CalendarPage.scss'
import PageHeader from '../../components/UI/PageHeader/PageHeader';
import { API_URL } from '../../utilities/api';
import AddNewCalendarEntry from '../../components/Calendar/AddNewCalendarEntry/AddNewCalendarEntry';
import useFetch from '../../utilities/useFetch';
import NoData from '../../components/NoData/NoData';
import { ThreeDots } from "react-loader-spinner";
import YearlyCalendar from "../../components/Calendar/YearlyCalendar/YearlyCalendar";


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
        <YearlyCalendar data={data} />
        <AddNewCalendarEntry />
      </section>
    )
  }
}

export default CalendarPage
