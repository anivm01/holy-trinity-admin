import { useMemo, useState } from "react";
import YearCalendarAccordion from "./YearCalendarAccordion";
import { groupCalendarEntriesByYear } from "./calendarData";
import "./YearlyCalendar.scss";

function YearlyCalendar({ data }) {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonthIndex = currentDate.getMonth();
  const groupedYears = useMemo(() => groupCalendarEntriesByYear(data), [data]);
  const years = useMemo(
    () =>
      Object.keys(groupedYears)
        .map(Number)
        .sort((a, b) => {
          if (a === currentYear) return -1;
          if (b === currentYear) return 1;
          return b - a;
        }),
    [currentYear, groupedYears],
  );
  const firstOpenYear = years.includes(currentYear) ? currentYear : years[0];
  const [openYears, setOpenYears] = useState(() =>
    firstOpenYear ? { [firstOpenYear]: true } : {},
  );

  const toggleYear = (year) => {
    setOpenYears((currentOpenYears) => ({
      ...currentOpenYears,
      [year]: !currentOpenYears[year],
    }));
  };

  if (years.length === 0) {
    return null;
  }

  return (
    <section className="yearly-calendar" aria-label="Calendar by year">
      <div className="yearly-calendar__years">
        {years.map((year) => (
          <YearCalendarAccordion
            initialMonthIndex={currentMonthIndex}
            isOpen={Boolean(openYears[year])}
            key={year}
            months={groupedYears[year]}
            onToggle={() => toggleYear(year)}
            year={year}
          />
        ))}
      </div>
    </section>
  );
}

export default YearlyCalendar;
