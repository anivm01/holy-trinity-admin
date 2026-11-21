import { useState } from "react";
import AddNewFeast from "../../components/Feasts/AddNewFeast/AddNewFeast";
import SavedFeasts from "../../components/Feasts/SavedFeasts/SavedFeasts";
import CurrentYearCalendar from "../../components/Feasts/CurrentYearCalendar/CurrentYearCalendar";
import PageHeader from "../../components/UI/PageHeader/PageHeader";
import "./FeastsPage.scss";

const getCalendarEntryDate = (entry) =>
  String(entry?.date || "").split(/[T ]/)[0];

function FeastsPage() {
  const [selectedCalendarEntry, setSelectedCalendarEntry] = useState(null);
  const selectedCalendarDate = getCalendarEntryDate(selectedCalendarEntry);

  const toggleCalendarEntry = (entry) => {
    setSelectedCalendarEntry((currentEntry) =>
      getCalendarEntryDate(currentEntry) === getCalendarEntryDate(entry)
        ? null
        : { ...entry },
    );
  };

  return (
    <>
      <PageHeader title="Feasts" />
      <section className="feasts-page">
        <AddNewFeast selectedCalendarEntry={selectedCalendarEntry} />
        <CurrentYearCalendar
          onSelectEntry={toggleCalendarEntry}
          selectedDate={selectedCalendarDate}
          year={2027}
        />
        <SavedFeasts />
      </section>
    </>
  );
}

export default FeastsPage;
