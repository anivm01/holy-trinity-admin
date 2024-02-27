import "./SavedCalendar.scss";
import SingleCalendarEntry from "../SingleCalendarEntry/SingleCalendarEntry";
import React, { useEffect, useRef } from "react";

function SavedCalendar({ data }) {
  const monthRefs = useRef({});

  useEffect(() => {
    // Initialize monthRefs with all months as keys and their ref values
    if (data) {
      monthRefs.current = Object.keys(data).reduce((acc, month) => {
        acc[month] = React.createRef();
        return acc;
      }, {});
    }
  }, [data]);

  const scrollToMonth = (month) => {
    monthRefs.current[month]?.current?.scrollIntoView({ behavior: 'smooth' });
  };


  return (
    <>
      <div className="month-navigation">
        {Object.keys(data).map((month, index) => (
          <button key={index} onClick={() => scrollToMonth(month)} style={{ marginRight: '10px' }}>
            {month}
          </button>
        ))}
      </div>
      <div className="saved-entries">
        {Object.entries(data).map(([month, entries], index) => (
          <div key={index}>
            <h3>{month}</h3> {/* Display the month */}
            {entries.map((single, entryIndex) => (
              <SingleCalendarEntry key={entryIndex} single={single} />
            ))}
          </div>
        ))}
      </div>
    </>
  );

}
export default SavedCalendar;
