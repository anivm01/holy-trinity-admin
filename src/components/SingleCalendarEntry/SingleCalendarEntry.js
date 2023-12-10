import React, { useState } from "react";
import { API_URL } from "../../utilities/api";
import { dateShorthandConverter } from "../../utilities/dateConverter";
import DeleteButton from "../DeleteButton/DeleteButton";
import DeleteModal from "../DeleteModal/DeleteModal";
import "./SingleCalendarEntry.scss";

function SingleCalendarEntry({ single }) {
  const [deleteVisible, setDeleteVisible] = useState(false);

  return (
    <>
      {deleteVisible && (
        <DeleteModal
          setVisible={setDeleteVisible}
          url={`${API_URL}/calendar/${single.id}`}
        />
      )}
      <div className="calendar-single">
        <span className="calendar-single__date">
          {dateShorthandConverter(single.single_date)}
        </span>
        <h2 className="calendar-single__title">{single.title ? single.title : "No Title"}</h2>
        <p>{single.details ? single.details : "No details"}</p>

        <h2 className="calendar-single__title">{single.title_bg ? single.title_bg : "No BG Title"}</h2>
        <p>{single.details_bg ? single.details_bg : "No details"}</p>

        <DeleteButton setDeleteVisible={setDeleteVisible} />
      </div>
    </>
  );
}

export default SingleCalendarEntry;
