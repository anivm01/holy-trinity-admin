import { useState } from "react";
import "./ImageUpload.scss";
import close from "../../assets/close.svg";
import NewImageForm from "../NewImageForm/NewImageForm";
import ChooseImage from "../ChooseImage/ChooseImage";

function ImageUpload({ setImageId, setVisible }) {
  const [chosenId, setChosenId] = useState("");

  const chooseImage = (id) => {
    setImageId(id);
    setChosenId(id);
  };

  return (
    <div className="image-upload">
      <div className="image-upload__modal">
        <img
          onClick={() => {
            setVisible(false);
          }}
          className="image-upload__close"
          src={close}
          alt="close icon"
        />
        <span>Upload a new image</span>
        <NewImageForm setImageId={setImageId} setVisible={setVisible} />
        <span>Or choose a previously uploaded image</span>
        <div className="image-upload__bottom">
          <div className="image-upload__saved">
            <ChooseImage chooseImage={chooseImage} chosenId={chosenId} />
          </div>
          <button
            type="button"
            className="button"
            onClick={() => {
              setVisible(false);
            }}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}

export default ImageUpload;
