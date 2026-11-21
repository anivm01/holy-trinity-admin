import { useMemo } from "react";
import { ThreeDots } from "react-loader-spinner";
import { API_URL } from "../../../utilities/api";
import useFetch from "../../../utilities/useFetch";
import BilingualMonthCarousel from "../../Calendar/YearlyCalendar/BilingualMonthCarousel";
import { groupCalendarEntriesByYear } from "../../Calendar/YearlyCalendar/calendarData";
import "../../Calendar/YearlyCalendar/YearlyCalendar.scss";
import "./CurrentYearCalendar.scss";

function CurrentYearCalendar({ onSelectEntry, selectedDate, year }) {
  const currentDate = new Date();
  const initialMonthIndex =
    year === currentDate.getFullYear() ? currentDate.getMonth() : 0;
  const { data, error, loading } = useFetch(`${API_URL}/calendar`);
  const months = useMemo(
    () => groupCalendarEntriesByYear(data)[year] || null,
    [data, year],
  );

  return (
    <section
      className="current-year-calendar yearly-calendar"
      aria-labelledby="current-year-calendar-title"
    >
      <h2
        className="current-year-calendar__title"
        id="current-year-calendar-title"
      >
        Calendar {year}
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

      {(error || (data && !months)) && (
        <p className="current-year-calendar__status" role="alert">
          The calendar for {year} is not available yet.
        </p>
      )}

      {months && (
        <BilingualMonthCarousel
          months={months}
          year={year}
          initialMonthIndex={initialMonthIndex}
          onSelectEntry={onSelectEntry}
          selectedDate={selectedDate}
        />
      )}
    </section>
  );
}

export default CurrentYearCalendar;
