import React from "react";
import { calendarDateConverter } from "../../../utilities/dateConverter";
import "./SingleCalendarEntry.scss";
import DeleteCaledarEntry from "../DeleteCalendarEntry/DeleteCalendarEntry";
import EditCalendarEntry from "../EditCalendarEntry/EditCalendarEntry";
import SingleCalendarEntryTitles from "../SingleCalendarEntryTitles/SingleCalendarEntryTitles";

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
      <div className={`calendar-single ${entry.bold ? "calendar-single__bold" : ""}`}>
        <DeleteCaledarEntry id={single.id} />
        <EditCalendarEntry single={single} />
        <div className={`calendar-single__date ${entry.red ? "calendar-single__red" : ""}`}>
          {`${entry.date.date} ${entry.date.dayEn}`}
        </div>
        <SingleCalendarEntryTitles red={entry.red} cross={entry.cross} star={entry.star} title={entry.title} />
        <div className={`calendar-single__date ${entry.red ? "calendar-single__red" : ""}`}>
          {`${entry.date.date} ${entry.date.dayBg}`}
        </div>
        <SingleCalendarEntryTitles red={entry.red} cross={entry.cross} star={entry.star} title={entry.titleBg} />
      </div>
    </div>
  );
}

export default SingleCalendarEntry;
