import React, { useState } from "react";
import ChooseImages from "../ChooseImages/ChooseImages";
import NewImageForm from "../NewImageForm/NewImageForm";
import close from "../../assets/close.svg";
import "./CreateGallery.scss";
import LoadImages from "../LoadImages/LoadImages";

function CreateGallery({ chosenIds, setChosenIds,  setVisible }) {
  const [addNewVisible, setAddNewVisible] = useState(false);
  const [newlyAddedId, setNewlyAddedId] = useState("");

  return (
    <div className="create-gallery">
      <div className="create-gallery__box">
        <img
          onClick={() => setVisible(false)}
          className="create-gallery__close"
          src={close}
          alt="close create gallery popup"
        />
        <NewImageForm
            setImageId={setNewlyAddedId}
            setVisible={setAddNewVisible}
          />
        <button
          className="button"
          type="button"
          onClick={() => setAddNewVisible(true)}
        >
          Add New Image
        </button>
        <h2>Choose images you want to add to the gallery of this article</h2>
        <LoadImages chosenIds={chosenIds} setChosenIds={setChosenIds} setVisible={setVisible} />
      </div>
    </div>
  );
}

export default CreateGallery;
