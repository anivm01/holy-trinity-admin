import BilingualMonthCarousel from "./BilingualMonthCarousel";

function YearCalendarAccordion({ isOpen, months, onToggle, year, initialMonthIndex }) {
  const entriesCount = months.reduce((total, month) => total + month.length, 0);
  const panelId = `calendar-year-${year}`;

  return (
    <section className="yearly-calendar__year">
      <h2 className="yearly-calendar__year-heading">
        <button
          className="yearly-calendar__year-button"
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={panelId}
        >
          <span>{year}</span>
          <span className="yearly-calendar__year-summary">
            {entriesCount} {entriesCount === 1 ? "entry" : "entries"}
          </span>
          <span className="yearly-calendar__chevron" aria-hidden="true" />
        </button>
      </h2>

      {isOpen && (
        <div className="yearly-calendar__year-content" id={panelId}>
          <BilingualMonthCarousel
            months={months}
            year={year}
            initialMonthIndex={initialMonthIndex}
          />
        </div>
      )}
    </section>
  );
}

export default YearCalendarAccordion;
