import React from "react";
import "./SingleFeast.scss";
import { wholeDateObjectConverter } from "../../../utilities/dateConverter";
import EditFeast from "../EditFeast/EditFeast";
import DeleteFeast from "../DeleteFeast/DeleteFeast";

function SingleFeast({ item }) {
  const localTime = new Date(item.event_date);
  const date = wholeDateObjectConverter(localTime);
  return (
    <div className="single-event">
      <div className="single-event__date">
        <span>
          {date.day} {date.month} {date.date}
        </span>
      </div>
      <div>
        <h2 className="single-event__title">
          {item.title ? item.title : "No Title"}
        </h2>
        <h2 className="single-event__title">
          {item.title_bg ? item.title_bg : "No BG Title"}
        </h2>
      </div>
      <EditFeast single={item} />
      <DeleteFeast id={item.id} />
    </div>
  );
}

export default SingleFeast;
