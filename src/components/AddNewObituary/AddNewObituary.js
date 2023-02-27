import { useState } from "react";
import ImageUpload from "../ImageUpload/ImageUpload";
import OneLineInput from "../OneLineInput/OneLineInput";
import "./AddNewObituary.scss"; 
import ImagePreview from "../ImagePreview/ImagePreview";
import AddImage from "../AddImage/AddImage";
import Wysiwyg from "../Wysiwyg/Wysiwyg";
import { API_URL, obituarySlug } from "../../utilities/api";
import axios from "axios";
import ErrorModal from "../ErrorModal/ErrorModal";
import SuccessModal from "../SuccessModal/SuccessModal";

function AddNewObituary() {
  const [imageId, setImageId] = useState("");
  const [years, setYears] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [nameBg, setNameBg] = useState("");
  const [obituaryEn, setObituaryEn] = useState("");
  const [obituaryBg, setObituaryBg] = useState("");

  const [imageUploadVisible, setImageUploadVisible] = useState(false);
  const [imageReplaceVisible, setImageReplaceVisible] = useState(false);

    //states responsible for the option to add a different image on the bulgarian version of the site
    const [imageIdBg, setImageIdBg] = useState("")
    const [imageUploadVisibleBg, setImageUploadVisibleBg] = useState(false);
    const [imageReplaceVisibleBg, setImageReplaceVisibleBg] = useState(false);

  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    if (
      !nameEn ||
      !nameBg ||
      !obituaryEn ||
      !obituaryBg ||
      !years
    ) {
      setUploadError(true);
      setErrorMessage(
        "Make sure that you have filled out all the fields in both English and Bulgarian. If you wish to return and edit the content later leave some default content such as 'TBD' or 'update coming soon'"
      );
      return;
    }
    if (!imageId){
        setUploadError(true);
        setErrorMessage(
            "Make sure to upload an image"
        );
        return;
    }

    const newObituaryEN = {
      name: nameEn,
      obituary: obituaryEn,
      years: years,
      image_id: imageId,
    };

    let newObituaryBG = {
        name: nameBg,
        obituary: obituaryBg,
        years: years,
        image_id: imageId,
    };

    if(imageIdBg){
      newObituaryBG = {
        ...newObituaryBG,
        image_id: imageIdBg
      }
    }

    const uploadObituary = async () => {
      try {
        const enResponse = await axios.post(
          `${API_URL}${obituarySlug}/en`,
          newObituaryEN
        );
        const newObituaryBGUpdated = {
          ...newObituaryBG,
          en_id: enResponse.data.new_entry.id,
        };
        await axios.post(
          `${API_URL}${obituarySlug}/bg`,
          newObituaryBGUpdated
        );
        setUploadSuccess(true);
      } catch (err) {
        console.log(err.response);
        setUploadError(true);
        setErrorMessage(
          "There was a problem with the connection. Please try again later."
        );
      }
    };
    uploadObituary();
  };


  return (
    <>
      {imageUploadVisible && (
        <ImageUpload
          setImageId={setImageId}
          setVisible={setImageUploadVisible}
        />
      )}
      {imageReplaceVisible && (
        <ImageUpload
          setImageId={setImageId}
          setVisible={setImageReplaceVisible}
        />
      )}
      {imageUploadVisibleBg && (
        <ImageUpload
          setImageId={setImageIdBg}
          setVisible={setImageUploadVisibleBg}
        />
      )}
      {imageReplaceVisibleBg && (
        <ImageUpload
          setImageId={setImageIdBg}
          setVisible={setImageReplaceVisibleBg}
        />
      )}
      {uploadError && (
        <ErrorModal
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
          setUploadError={setUploadError}
        />
      )}
      {uploadSuccess && <SuccessModal/>}
      <form onSubmit={onSubmit} className="obituary">
        <h1 className="obituary__title">Add New Obituary</h1>
        <div className="obituary__top">
            {imageId ? (
              <div className="obituary__images">
              <div className="obituary__image-preview">
                <ImagePreview imageId={imageId} setVisible={setImageUploadVisible} />
                <button
                  type="button"
                  className="obituary__button"
                  onClick={() => setImageReplaceVisible(true)}
                >
                  Replace
                </button>
                {!imageIdBg && <button
                  type="button"
                  className="obituary__special-button"
                  onClick={() => {setImageReplaceVisibleBg(true)}}
                >
                  Special BG Image
                </button>}
              </div>
              {imageIdBg && <div className="obituary__image-preview">
                  <ImagePreview imageId={imageIdBg} setVisible={setImageUploadVisibleBg} />
                  <button
                    type="button"
                    className="obituary__button"
                    onClick={() => setImageReplaceVisibleBg(true)}
                  >
                    Replace
                  </button>
                  <button
                  type="button"
                  className="obituary__special-button"
                  onClick={() => {setImageIdBg("")}}
                >
                  Remove Special BG Image
                </button>
                </div>}
              </div>
            ) : (
                <AddImage setImageUploadVisible={setImageUploadVisible} />
            )}
            <OneLineInput label="Enter the years of birth and death" oneLine={years} setOneLine={setYears} />
        </div>
        <div className="obituary__middle">
            <div className="obituary__language">
            <h2 className="obituary__subtitle">English</h2>
                <OneLineInput label="Enter the name" oneLine={nameEn} setOneLine={setNameEn} />
                <Wysiwyg
                    editorLabel="Enter the main content:"
                    setContent={setObituaryEn}
                />
            </div>
            <div className="obituary__language">
            <h2 className="obituary__subtitle">Български</h2>
                <OneLineInput label="Въведете името" oneLine={nameBg} setOneLine={setNameBg} />
                <Wysiwyg
                    editorLabel="Въведете главното съдържание:"
                    setContent={setObituaryBg}
                />
            </div>
        </div>
        <div className="obituary__bottom">
        <input
          className="obituary__button"
          type="submit"
          value="Save "
        />
      </div>
      </form>
    </>
  );
}

export default AddNewObituary;
