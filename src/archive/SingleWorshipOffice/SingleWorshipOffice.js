import React, { useState } from "react";
import "./SingleWorshipOffice.scss";
import DeleteModal from "../DeleteModal/DeleteModal";
import { dateShorthandConverter } from "../../utilities/dateConverter";
import { API_URL } from "../../utilities/api";
import SavedImage from "../SavedImage/SavedImage";
import DeleteButton from "../DeleteButton/DeleteButton";
import { Link } from "react-router-dom";

function SingleWorshipOffice({ worshipOffice }) {
  const [deleteVisible, setDeleteVisible] = useState(false);

  return (
    <div className="single-worship-office">
      <Link to={`${worshipOffice.id}`} className="single-worship-office__link">
        <SavedImage url={`${API_URL}/thumbnail/en/${worshipOffice.id}`} />
      </Link>
      <Link to={`${worshipOffice.id}`} className="single-worship-office__date">
        {dateShorthandConverter(worshipOffice.date)}
      </Link>
      {deleteVisible && (
        <DeleteModal
          setVisible={setDeleteVisible}
          url={`${API_URL}/worship-office/en/${worshipOffice.id}`}
        />
      )}
      <DeleteButton setDeleteVisible={setDeleteVisible} />
    </div>
  );
}

export default SingleWorshipOffice;
