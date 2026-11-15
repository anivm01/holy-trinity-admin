import { getCalendarDateDetails } from "./calendarData";
import EditCalendarEntry from "../EditCalendarEntry/EditCalendarEntry";

const EMPTY_MESSAGES = {
  en: "No calendar entries for this month.",
  bg: "Няма записи в календара за този месец.",
};

const hasCalendarFlag = (value) =>
  value === true || value === 1 || value === "1";

function CalendarLanguagePanel({
  entries,
  language,
  monthName,
  onSelectEntry,
  onToggleEntry,
  selectedDate,
  selectedEntryIds,
  year,
}) {
  const isBulgarian = language === "bg";

  return (
    <section
      className="yearly-calendar__language-panel"
      lang={isBulgarian ? "bg" : "en"}
      aria-label={`${monthName} ${year}`}
    >
      <div className="yearly-calendar__language-heading">
        <span>{isBulgarian ? "Български" : "English"}</span>
        <h4>{monthName}</h4>
      </div>

      <div className="yearly-calendar__days">
        {entries.length > 0 ? (
          entries.map((entry) => {
            const date = getCalendarDateDetails(entry.date);
            const title = isBulgarian ? entry.title_bg : entry.title;
            const isBold = hasCalendarFlag(entry.bold);
            const isRed = hasCalendarFlag(entry.red);
            const hasCross = hasCalendarFlag(entry.cross);
            const hasStar = hasCalendarFlag(entry.star);
            const entryDate = String(entry.date || "").split(/[T ]/)[0];
            const isSelectedDate = selectedDate === entryDate;

            return (
              <article
                className={`yearly-calendar__day${
                  isBold ? " yearly-calendar__day--bold" : ""
                }${isRed ? " yearly-calendar__day--red" : ""}${
                  isSelectedDate ? " yearly-calendar__day--selected" : ""
                }`}
                key={entry.id || `${entry.date}-${language}`}
              >
                <div className="yearly-calendar__actions">
                  <input
                    className="yearly-calendar__entry-checkbox"
                    type="checkbox"
                    checked={selectedEntryIds.has(entry.id)}
                    onChange={() => onToggleEntry(entry.id)}
                    aria-label={`Select ${
                      title || `calendar entry for day ${date.day}`
                    } for deletion`}
                  />
                  <EditCalendarEntry single={entry} />
                </div>
                {onSelectEntry ? (
                  <button
                    className="yearly-calendar__date-button"
                    type="button"
                    onClick={() => onSelectEntry(entry)}
                    aria-label={`Use ${monthName} ${date.day}, ${year} for the new feast date and titles`}
                    aria-pressed={isSelectedDate}
                  >
                    <time
                      className="yearly-calendar__date"
                      dateTime={entryDate}
                    >
                      <span>{date.day}</span>
                      <span>
                        {isBulgarian ? date.weekdayBg : date.weekdayEn}
                      </span>
                    </time>
                  </button>
                ) : (
                  <time className="yearly-calendar__date" dateTime={entryDate}>
                    <span>{date.day}</span>
                    <span>{isBulgarian ? date.weekdayBg : date.weekdayEn}</span>
                  </time>
                )}
                <p className="yearly-calendar__title">
                  {hasCross && (
                    <span className="yearly-calendar__symbol" aria-hidden="true">
                      †
                    </span>
                  )}
                  {hasStar && (
                    <span className="yearly-calendar__symbol" aria-hidden="true">
                      *
                    </span>
                  )}
                  {title || (isBulgarian ? "Без заглавие" : "No title")}
                </p>
              </article>
            );
          })
        ) : (
          <p className="yearly-calendar__empty">{EMPTY_MESSAGES[language]}</p>
        )}
      </div>
    </section>
  );
}

export default CalendarLanguagePanel;
