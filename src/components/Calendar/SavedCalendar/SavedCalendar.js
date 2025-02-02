import "./SavedCalendar.scss";
import SingleCalendarEntry from "../SingleCalendarEntry/SingleCalendarEntry";
import React, { useEffect, useRef } from "react";
import Button from "../../UI/Button/Button";

const monthMap = {
  Jan: 0,
  Feb: 1,
  Mar: 2,
  Apr: 3,
  May: 4,
  Jun: 5,
  Jul: 6,
  Aug: 7,
  Sep: 8,
  Oct: 9,
  Nov: 10,
  Dec: 11,
};

function SavedCalendar({ data }) {
  const monthRefs = useRef({});

  // 1. Sort the months: "Jan 2024", "Feb 2024", etc. => newest first
  const sortedMonths = React.useMemo(() => {
    return Object.keys(data).sort((a, b) => {
      // e.g. a = "Jan 2024", b = "Feb 2024"
      const [aMonthAbbr, aYearStr] = a.split(" ");
      const [bMonthAbbr, bYearStr] = b.split(" ");

      const aMonthNum = monthMap[aMonthAbbr]; // e.g. "Jan" => 0
      const bMonthNum = monthMap[bMonthAbbr];

      const aYear = parseInt(aYearStr, 10);   // e.g. 2024
      const bYear = parseInt(bYearStr, 10);

      const dateA = new Date(aYear, aMonthNum, 1);
      const dateB = new Date(bYear, bMonthNum, 1);

      // newest first => bigger date first
      return dateA - dateB;
    });
  }, [data]);

  // 2. Initialize refs for each month so we can scroll to them
  useEffect(() => {
    monthRefs.current = sortedMonths.reduce((acc, month) => {
      acc[month] = React.createRef();
      return acc;
    }, {});
  }, [sortedMonths]);

  // 3. Scroll function
  const scrollToMonth = (month, index) => {
    const element = document.getElementById(`month-${index}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="saved-entries">

      <div className="saved-entries__navigation">
        {sortedMonths.map((month, index) => (
          <Button
            text={month}
            key={month}
            onClick={() => scrollToMonth(month, index)}
          />
        ))}
      </div>

      <div className="saved-entries__entries">
        {sortedMonths.map((month, index) => {
          return (
            <div key={month} id={`month-${index}`}>
              <h3>{month}</h3>
              {[...data[month]].map((single, entryIndex) => (
                <SingleCalendarEntry key={entryIndex} single={single} />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SavedCalendar;