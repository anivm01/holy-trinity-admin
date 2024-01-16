import React from "react";
import { calendarDateConverter } from "../../../utilities/dateConverter";
import "./SingleCalendarEntry.scss";
import DeleteCaledarEntry from "../DeleteCalendarEntry/DeleteCalendarEntry";
import EditCalendarEntry from "../EditCalendarEntry/EditCalendarEntry";

function SingleCalendarEntry({ single }) {
  const entry = {
    date: calendarDateConverter(single.date),
    title: single.title || "No English Title",
    titleBg: single.title_bg || "No Bulgrarian Title",
    cross: single.cross,
    bold: single.bold,
    red: single.red,
    star: single.star
  }


  return (
    <div>
      <div className="calendar-single">
        <DeleteCaledarEntry id={single.id} />
        <EditCalendarEntry single={single} />
        <div className={`calendar-single__date ${entry.red ? "calendar-single__red" : ""}`}>
          {`${entry.date.date} ${entry.date.dayEn}`}
        </div>
        <div className={`calendar-single__entry ${entry.red ? "calendar-single__red" : ""}`}>
          <p className={`calendar-single__title ${entry.bold ? "calendar-single__bold" : ""}`}>
            <span className="calendar-single__prefix">{entry.cross ? "† " : ""}</span>
            <span className="calendar-single__prefix">{entry.star ? "* " : ""}</span>
            {entry.title}</p>
        </div>
        <div className={`calendar-single__date ${entry.red ? "calendar-single__red" : ""}`}>
          {`${entry.date.date} ${entry.date.dayBg}`}
        </div>
        <div className={`calendar-single__entry ${entry.red ? "calendar-single__red" : ""}`}>
          <p className={`calendar-single__title ${entry.bold ? "calendar-single__bold" : ""}`}>
            <span className="calendar-single__prefix">{entry.cross ? "† " : ""}</span>
            <span className="calendar-single__prefix">{entry.star ? "* " : ""}</span>
            {entry.titleBg}</p>
        </div>
      </div>
    </div>
  );
}

export default SingleCalendarEntry;
