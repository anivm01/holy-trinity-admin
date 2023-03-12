import { useState } from "react";
import ImageUpload from "../ImageUpload/ImageUpload";
import OneLineInput from "../OneLineInput/OneLineInput";
import "./AddNewObituary.scss";
import ImagePreview from "../ImagePreview/ImagePreview";
import AddImage from "../AddImage/AddImage";
import Wysiwyg from "../Wysiwyg/Wysiwyg";
import { API_URL } from "../../utilities/api";
import ErrorModal from "../ErrorModal/ErrorModal";
import SuccessModal from "../SuccessModal/SuccessModal";
import DateInput from "../DateInput/DateInput";
import {
  dateInputConverter,
  dateOutputConverter,
} from "../../utilities/dateConverter";
import BgVersionConfirmation from "../BgVersionConfirmation/BgVersionConfirmation";
import { uploadItem } from "../../utilities/send";

function AddNewObituary() {
  const currentDate = Math.floor(Date.now() / 1000);
  const [imageId, setImageId] = useState("");
  const [years, setYears] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [nameBg, setNameBg] = useState("");
  const [obituaryEn, setObituaryEn] = useState("");
  const [obituaryBg, setObituaryBg] = useState("");
  const [date, setDate] = useState(dateOutputConverter(currentDate));
  const [bgVersion, setBgVersion] = useState("yes");

  const [imageUploadVisible, setImageUploadVisible] = useState(false);
  const [imageReplaceVisible, setImageReplaceVisible] = useState(false);

  //states responsible for the option to add a different image on the bulgarian version of the site
  const [imageIdBg, setImageIdBg] = useState("");
  const [imageUploadVisibleBg, setImageUploadVisibleBg] = useState(false);
  const [imageReplaceVisibleBg, setImageReplaceVisibleBg] = useState(false);

  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");


  const createPosts = (draft) => {
    const newObituaryEN = {
      name: nameEn,
      obituary: obituaryEn,
      years: years,
      date: dateInputConverter(date),
      image_id: imageId,
      is_draft: draft
    };

    let newObituaryBG = {
      name: nameBg,
      obituary: obituaryBg,
      years: years,
      date: dateInputConverter(date),
      image_id: imageId,
      bg_version: bgVersion === "yes" ? true : false
    };

    if (imageIdBg) {
      newObituaryBG = {
        ...newObituaryBG,
        image_id: imageIdBg,
      };
    }
    return { en: newObituaryEN, bg: newObituaryBG };
  };

  const onSave = (e) => {
    e.preventDefault();
   
    //save draft
    const posts = createPosts(true);
    const response = uploadItem(posts, `${API_URL}/obituary`);
    setUploadSuccess(response);
    if (response === false) {
      setUploadError(true);
      setErrorMessage(
        "There was a problem with the connection. Try again later."
      );
    }
  };

  const onPublish = (e) => {
    e.preventDefault();

    //validate content before publishing
    if (!nameEn || obituaryEn.length < 8 || !years) {
      setUploadError(true);
      setErrorMessage(
        "Make sure to provide the date of the event, the event title, and the event description before publishing this item to the public. If you wish to return and edit the content later click the Save as Draft button above"
      );
      return;
    }
    if (!date) {
      setUploadError(true);
      setErrorMessage(
        "Make sure to add a date on which you want the entry to be posted"
      );
      return;
    }
    if (!imageId) {
      setUploadError(true);
      setErrorMessage("Make sure to upload an image before publishing this item.");
      return;
    }
    if (bgVersion === "yes" && !nameBg && obituaryBg.length < 8) {
      setUploadError(true);
      setErrorMessage(
        "You've requested to make the Bulgarian version of this item public but no Bulgarian translations have been provided. Please fill out correct fields in Bulgarian or choose the option not to display the Bulgarian version."
      );
      return;
    }
    if (bgVersion === "yes" && !nameBg) {
      setUploadError(true);
      setErrorMessage(
        "You've requested to make the Bulgarian version of this item public but there is no Bulgarian title. Please fill out the title in Bulgarian or choose the option not to display the Bulgarian version."
      );
      return;
    }
    if (bgVersion === "yes" && obituaryBg.length < 8) {
      setUploadError(true);
      setErrorMessage(
        "You've requested to make the Bulgarian version of this item public but the obituary content is empty. Please fill out the obituary content in Bulgarian or choose the option not to display the Bulgarian version."
      );
      return;
    }

    //publish
    const posts = createPosts(false);
    const response = uploadItem(posts, `${API_URL}/obituary`);
    setUploadSuccess(response);
    if (response === false) {
      setUploadError(true);
      setErrorMessage(
        "There was a problem with the connection. Try again later."
      );
    }
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
      {uploadSuccess && <SuccessModal />}
      <form className="obituary">
        <h1 className="obituary__title">Add New Obituary</h1>
        <div className="obituary__top">
          {imageId ? (
            <div className="obituary__images">
              <div className="obituary__image-preview">
                <ImagePreview
                  imageId={imageId}
                  setVisible={setImageUploadVisible}
                />
                <button
                  type="button"
                  className="obituary__button"
                  onClick={() => setImageReplaceVisible(true)}
                >
                  Replace
                </button>
                {!imageIdBg && (
                  <button
                    type="button"
                    className="obituary__special-button"
                    onClick={() => {
                      setImageReplaceVisibleBg(true);
                    }}
                  >
                    Special BG Image
                  </button>
                )}
              </div>
              {imageIdBg && (
                <div className="obituary__image-preview">
                  <ImagePreview
                    imageId={imageIdBg}
                    setVisible={setImageUploadVisibleBg}
                  />
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
                    onClick={() => {
                      setImageIdBg("");
                    }}
                  >
                    Remove Special BG Image
                  </button>
                </div>
              )}
            </div>
          ) : (
            <AddImage setImageUploadVisible={setImageUploadVisible} />
          )}
          <OneLineInput
            label="Enter the years of birth and death"
            oneLine={years}
            setOneLine={setYears}
          />
        </div>
        <div className="obituary__middle">
          <div className="obituary__language">
            <h2 className="obituary__subtitle">English</h2>
            <OneLineInput
              label="Enter the name"
              oneLine={nameEn}
              setOneLine={setNameEn}
            />
            <Wysiwyg
              editorLabel="Enter the main content:"
              setContent={setObituaryEn}
            />
          </div>
          <div className="obituary__language">
            <h2 className="obituary__subtitle">Български</h2>
            <OneLineInput
              label="Въведете името"
              oneLine={nameBg}
              setOneLine={setNameBg}
            />
            <Wysiwyg
              editorLabel="Въведете главното съдържание:"
              setContent={setObituaryBg}
            />
          </div>
        </div>
        <input
          className="obituary__button"
          type="submit"
          value="Save as Draft"
          onClick={onSave}
        />
        <DateInput date={date} setDate={setDate} />
        <BgVersionConfirmation
          bgVersion={bgVersion}
          setBgVersion={setBgVersion}
        />
        <div className="obituary__bottom">
          <input
            className="obituary__button"
            type="submit"
            value="Publish"
            onClick={onPublish}
          />
        </div>
      </form>
    </>
  );
}

export default AddNewObituary;
