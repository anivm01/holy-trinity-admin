import React, { useState } from "react";
import { API_URL } from "../../../utilities/api";
import ErrorModal from "../../ErrorModal/ErrorModal";
import plus from "../../../assets/plus.svg";
import axios from "axios";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import "./AddImage.scss"
import SuccessModal from "../../SuccessModal/SuccessModal";

function AddImage() {
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState("")
  const [previewURL, setPreviewURL] = useState(plus);

  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("caption", caption);
    const token = sessionStorage.getItem("authToken");
    try {
      await axios.post(`${API_URL}/assets/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      setUploadSuccess(true);
    } catch (error) {
      console.error(error);
      setUploadError(true);
      setErrorMessage("There was an error with the image upload");
    }
  };
  return (
    <>
      {uploadError && (
        <ErrorModal
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
          setUploadError={setUploadError}
        />
      )}
      {uploadSuccess && <SuccessModal />}
      <form className="add-image">
        <div className="add-image__main">
          <label htmlFor="add-image" className="add-image__box">
            <img
              className="add-image__preview"
              src={previewURL}
              alt="preview"
            />
          </label>
          <input
            className="add-image__input"
            filename={file}
            onChange={(e) => {
              setPreviewURL(URL.createObjectURL(e.target.files[0]));
              setFile(e.target.files[0]);
            }}
            type="file"
            accept="image/png, image/jpg, image/gif, image/jpeg"
            id="add-image"
            name="add-image"
          />
        </div>
        <div>
          <Input className="add-image__caption" label="Write a caption for this image" id="pdf-caption" name="caption" value={caption} onChange={(event) => setCaption(event.target.value)} type="text" inputComponent="input" />
          <Button onClick={(e) => handleSubmit(e)} text='Upload' type="submit" />
        </div>
      </form>
    </>
  );
}

export default AddImage;
