import { ThreeDots } from "react-loader-spinner";
import { API_URL } from "../../../utilities/api";
import useFetch from "../../../utilities/useFetch";
import BilingualMonthCarousel from "../../Calendar/YearlyCalendar/BilingualMonthCarousel";
import "../../Calendar/YearlyCalendar/YearlyCalendar.scss";
import "./CurrentYearCalendar.scss";

function CurrentYearCalendar({ onSelectEntry, selectedDate }) {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonthIndex = currentDate.getMonth();
  const { data, error, loading } = useFetch(`${API_URL}/calendar/byyear`);

  return (
    <section
      className="current-year-calendar yearly-calendar"
      aria-labelledby="current-year-calendar-title"
    >
      <h2
        className="current-year-calendar__title"
        id="current-year-calendar-title"
      >
        Calendar {currentYear}
      </h2>
      <p className="current-year-calendar__hint">
        Select a calendar date to fill the date and titles in the Add New Feast
        form.
      </p>

      {loading && (
        <ThreeDots
          height="60"
          width="60"
          radius="9"
          color="#6F0B20"
          ariaLabel="Loading the current year calendar"
          wrapperStyle={{ justifyContent: "center" }}
          visible={true}
        />
      )}

      {error && (
        <p className="current-year-calendar__status" role="alert">
          The calendar for {currentYear} is not available yet.
        </p>
      )}

      {data && (
        <BilingualMonthCarousel
          months={data}
          year={currentYear}
          initialMonthIndex={currentMonthIndex}
          onSelectEntry={onSelectEntry}
          selectedDate={selectedDate}
        />
      )}
    </section>
  );
}

export default CurrentYearCalendar;
