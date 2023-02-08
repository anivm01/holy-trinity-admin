import axios from "axios";
import { useState } from "react";
import { API_URL } from "../../utilities/api";
import plus from "../../assets/plus.svg";
import "./ImageUpload.scss";
import ErrorModal from "../ErrorModal/ErrorModal";
import close from "../../assets/close.svg";

function ImageUpload({ setImageId, setVisible }) {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [descriptionBG, setDescriptionBG] = useState("");
  const [previewURL, setPreviewURL] = useState(plus);

  const [uploadError, setUploadError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const submit = async (event) => {
    event.preventDefault();

    if (!file || !description || !descriptionBG) {
      setUploadError(true);
      setErrorMessage(
        "Make sure to fill out all the fields. You need to add an image file, a description in English and a description in Bulgarian."
      );
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    formData.append("description", description);
    formData.append("descriptionBG", descriptionBG);

    try {
      const result = await axios.post(`${API_URL}/images/en`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setImageId(result.data.new_image_en[0].id);
      setVisible(false)
    } catch (error) {
      console.error(error);
      setUploadError(true);
      setErrorMessage(
        "There was a problem with the connection. Please try again later."
      );
    }
  };

  return (
    <div className="image-upload">
      {uploadError && (
          <ErrorModal
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
            setUploadError={setUploadError}
          />
        )}
      <form onSubmit={submit} className="image-upload__form">
        <img
          onClick={() => {
            setVisible(false);
          }}
          className="image-upload__close"
          src={close}
          alt="close icon"
        />
        <div className="image-upload__main">
          <label htmlFor="image-upload" className="image-upload__image">
            <img className="image-upload__preview" src={previewURL}/>
            <input
              className="image-upload__input"
              filename={file}
              onChange={(e) => {
                setPreviewURL(URL.createObjectURL(e.target.files[0]));
                setFile(e.target.files[0]);
              }}
              type="file"
              accept="image/png, image/jpg, image/gif, image/jpeg"
              id='image-upload'
              name='image-upload'
            />
          </label>
          <div className="image-upload__descriptions">
            <label
              className="image-upload__description"
              htmlFor="enDescription"
            >
              Enter a short description of the image in English
              <input
                onChange={(e) => setDescription(e.target.value)}
                type="text"
                id="enDescription"
                name="enDescription"
                value={description}
                className="image-upload__text"
              />
            </label>
            <label
              className="image-upload__description"
              htmlFor="bgDescription"
            >
              Въведете кратко описание на снимката на Български
              <input
                onChange={(e) => setDescriptionBG(e.target.value)}
                type="text"
                id="bgDescription"
                name="bgDescription"
                value={descriptionBG}
                className="image-upload__text"
              />
            </label>
          </div>
        </div>
        <button className="image-upload__submit" type="submit">
          Save Image
        </button>
      </form>
    </div>
  );
}

export default ImageUpload;
