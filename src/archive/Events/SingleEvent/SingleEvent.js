import React from "react";
import "./SingleEvent.scss";

import { dateShorthandConverter } from "../../../utilities/dateConverter";
import DeleteEvent from "../DeleteEvent/DeleteEvent";
import EditEvent from "../EditEvent/EditEvent";

function SingleEvent({ event }) {

  return (
    <div className="single-event">

      <span className="single-event__date">
        {dateShorthandConverter(event.event_date)}
      </span>
      <div>
        <h2 className="single-event__title">{event.title ? event.title : "No Title"}</h2>
        <h2 className="single-event__title">{event.title_bg ? event.title_bg : "No BG Title"}</h2>
      </div>
      <EditEvent single={event} />
      <DeleteEvent id={event.id} />
    </div>
  );
}

export default SingleEvent;
