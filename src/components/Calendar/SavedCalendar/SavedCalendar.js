import "./SavedCalendar.scss";
import SingleCalendarEntry from "../SingleCalendarEntry/SingleCalendarEntry";
import React, { useEffect, useRef } from "react";
import Button from "../../UI/Button/Button";

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

  const scrollToMonth = (month, index) => {
    const element = document.getElementById(`month-${index}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };


  return (
    <div className="saved-entries">
      <div className="saved-entries__navigation">
        {Object.keys(data).map((month, index) => (
          <Button text={month} key={index} onClick={() => scrollToMonth(month, index)} />
        ))}
      </div>
      <div className="saved-entries__entries">
        {Object.entries(data).map(([month, entries], index) => (
          <div key={index} id={`month-${index}`}>
            <h3>{month}</h3>
            {entries.map((single, entryIndex) => (
              <SingleCalendarEntry key={entryIndex} single={single} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );

}
export default SavedCalendar;
