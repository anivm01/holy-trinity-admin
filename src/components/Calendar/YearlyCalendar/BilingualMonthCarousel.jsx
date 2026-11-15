import { useState } from "react";
import ArrowIcon from "../../../assets/svg/ArrowIcon/ArrowIcon";
import CalendarLanguagePanel from "./CalendarLanguagePanel";
import BulkDeleteCalendarEntries from "./BulkDeleteCalendarEntries";

const MONTHS_EN = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const MONTHS_BG = [
  "Януари",
  "Февруари",
  "Март",
  "Април",
  "Май",
  "Юни",
  "Юли",
  "Август",
  "Септември",
  "Октомври",
  "Ноември",
  "Декември",
];

function BilingualMonthCarousel({
  months,
  year,
  initialMonthIndex,
  onSelectEntry,
  selectedDate,
}) {
  const [monthIndex, setMonthIndex] = useState(initialMonthIndex);
  const [selectedEntryIds, setSelectedEntryIds] = useState(new Set());

  const showPreviousMonth = () => {
    setMonthIndex((currentIndex) => (currentIndex + 11) % 12);
    setSelectedEntryIds(new Set());
  };

  const showNextMonth = () => {
    setMonthIndex((currentIndex) => (currentIndex + 1) % 12);
    setSelectedEntryIds(new Set());
  };

  const toggleEntrySelection = (entryId) => {
    setSelectedEntryIds((currentSelection) => {
      const nextSelection = new Set(currentSelection);

      if (nextSelection.has(entryId)) {
        nextSelection.delete(entryId);
      } else {
        nextSelection.add(entryId);
      }

      return nextSelection;
    });
  };

  return (
    <div className="yearly-calendar__carousel">
      <div className="yearly-calendar__month-navigation">
        <button
          className="yearly-calendar__month-button"
          type="button"
          onClick={showPreviousMonth}
          aria-label={`Show the previous month for ${year}`}
        >
          <ArrowIcon className="yearly-calendar__arrow yearly-calendar__arrow--previous" />
        </button>

        <h3 className="yearly-calendar__month-title">
          <span>{MONTHS_EN[monthIndex]}</span>
          <span aria-hidden="true"> / </span>
          <span lang="bg">{MONTHS_BG[monthIndex]}</span>
          <span> {year}</span>
        </h3>

        <button
          className="yearly-calendar__month-button"
          type="button"
          onClick={showNextMonth}
          aria-label={`Show the next month for ${year}`}
        >
          <ArrowIcon className="yearly-calendar__arrow" />
        </button>
      </div>

      <BulkDeleteCalendarEntries selectedEntryIds={selectedEntryIds} />

      <div className="yearly-calendar__languages">
        <CalendarLanguagePanel
          entries={months[monthIndex] || []}
          language="en"
          monthName={MONTHS_EN[monthIndex]}
          onToggleEntry={toggleEntrySelection}
          onSelectEntry={onSelectEntry}
          selectedDate={selectedDate}
          selectedEntryIds={selectedEntryIds}
          year={year}
        />
        <CalendarLanguagePanel
          entries={months[monthIndex] || []}
          language="bg"
          monthName={MONTHS_BG[monthIndex]}
          onToggleEntry={toggleEntrySelection}
          onSelectEntry={onSelectEntry}
          selectedDate={selectedDate}
          selectedEntryIds={selectedEntryIds}
          year={year}
        />
      </div>
    </div>
  );
}

export default BilingualMonthCarousel;
