import React, { useState } from "react";
import "./SingleWeeklyAnnouncement.scss";
import { Link } from "react-router-dom";
import { createMarkup } from "../../utilities/createMarkup";
import { dateShorthandConverter } from "../../utilities/dateConverter";
import DeleteModal from "../DeleteModal/DeleteModal";
import { API_URL } from "../../utilities/api";
import DeleteButton from "../DeleteButton/DeleteButton";

function SingleWeeklyAnnouncement({ announcement }) {
  const [deleteVisible, setDeleteVisible] = useState(false);

  return (
    <div className="announcement-single-draft">
      {deleteVisible && (
        <DeleteModal
          setVisible={setDeleteVisible}
          url={`${API_URL}/weekly-announcement/en/${announcement.id}`}
        />
      )}
      <DeleteButton setDeleteVisible={setDeleteVisible} />
      <Link
        to={`${announcement.id}`}
        className="announcement-single-draft__date"
      >
        {dateShorthandConverter(announcement.date)}
      </Link>
      <Link
        to={`${announcement.id}`}
        className="announcement-single-draft__text"
      >
        <h2 className="announcement-single-draft__title">
          {announcement.title ? announcement.title : "No Title"}
        </h2>
        {announcement.announcement.length > 0 && <div
          className="announcement-single-draft__content"
          dangerouslySetInnerHTML={createMarkup(announcement.announcement)}
        ></div>}
        {announcement.announcement.length < 8 && <p>No content</p>}
      </Link>
    </div>
  );
}

export default SingleWeeklyAnnouncement;
