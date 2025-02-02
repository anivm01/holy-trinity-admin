import React from "react";
import { calendarDateConverter } from "../../../utilities/dateConverter";
import "./CalendarDisplayEntry.scss";
import SingleCalendarEntryTitles from "../SingleCalendarEntryTitles/SingleCalendarEntryTitles";

function CalendarDisplayEntry({ single }) {
  const date = calendarDateConverter(single.date);
  const entry = {
    title: single.title || "No English Title",
    titleBg: single.title_bg || "No Bulgrarian Title",
    cross: single.cross,
    bold: single.bold,
    red: single.red,
    star: single.star,
  };

  return (
    <div
      className={`calendar-single ${entry.bold ? "calendar-single__bold" : ""}`}
    >
      <div
        className={`calendar-single__date ${
          entry.red ? "calendar-single__red" : ""
        }`}
      >
        <span>{date.date}</span>
        <span>{date.dayEn}</span>
      </div>
      <SingleCalendarEntryTitles
        red={entry.red}
        cross={entry.cross}
        star={entry.star}
        title={entry.title}
      />
    </div>
  );
}

export default CalendarDisplayEntry;
