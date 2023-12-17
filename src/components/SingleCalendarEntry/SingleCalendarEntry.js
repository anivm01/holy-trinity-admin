import React, { useState } from "react";
import { API_URL } from "../../utilities/api";
import { dateShorthandConverter } from "../../utilities/dateConverter";
import DeleteButton from "../DeleteButton/DeleteButton";
import DeleteModal from "../DeleteModal/DeleteModal";
import "./SingleCalendarEntry.scss";

function SingleCalendarEntry({ single }) {
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [expanded, setExpanded] = useState(false)
  console.log(single)

  const entry = {
    date: dateShorthandConverter(single.date),
    title: single.title || "No English Title",
    titleBg: single.title_bg || "No Bulgraian Title"
  }

  return (
    <div>
      {deleteVisible && (
        <DeleteModal
          setVisible={setDeleteVisible}
          url={`${API_URL}/calendar/${single.id}`}
        />
      )}
      <div className="calendar-single">
        <div className="calendar-single__column--small">
          <span className="calendar-single__date">
            {entry.date}
          </span>
        </div>
        <div className="calendar-single__column">
          <h2 className={`calendar-single__title ${expanded ? "" : "calendar-single__title--contained"}`}>{entry.title}</h2>
        </div>

        <div className="calendar-single__column">
          <h2 className={`calendar-single__title ${expanded ? "" : "calendar-single__title--contained"}`}>{entry.titleBg}</h2>
        </div>
        <div className="calendar-single__column--small">
          <DeleteButton setDeleteVisible={setDeleteVisible} />
        </div>
      </div>
      <button className="calendar-single__expand" onClick={() => setExpanded(current => !current)}>
        <svg className="calendar-single__chevron" xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 512 512"><path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" /></svg>
      </button>
      {expanded &&
        <div className="calendar-single">
          <div className="calendar-single__column">
            <p>{single.details ? single.details : "No details"}</p>
          </div>
          <div className="calendar-single__column">
            <p>{single.details_bg ? single.details_bg : "No details"}</p>
          </div>
        </div>
      }
    </div>
  );
}

export default SingleCalendarEntry;
