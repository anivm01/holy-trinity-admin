import React, { useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../../utilities/api";
import { dateShorthandConverter } from "../../utilities/dateConverter";
import DeleteButton from "../DeleteButton/DeleteButton";
import DeleteModal from "../DeleteModal/DeleteModal";
import "./SingleEvent.scss";

function SingleEvent({ event }) {
  const [deleteVisible, setDeleteVisible] = useState(false);

  return (
    <>
      {deleteVisible && (
        <DeleteModal
          setVisible={setDeleteVisible}
          url={`${API_URL}/event/en/${event.id}`}
        />
      )}
      <div className="single-event">
        <DeleteButton setDeleteVisible={setDeleteVisible} />
        <Link to={`${event.id}`} className="single-event__link">
          <span className="single-event__date">
            {dateShorthandConverter(event.event_date)}
          </span>
          <h2 className="single-event__title">{event.title ? event.title : "No Title"}</h2>
        </Link>
      </div>
    </>
  );
}

export default SingleEvent;
