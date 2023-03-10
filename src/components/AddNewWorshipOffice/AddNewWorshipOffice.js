import { useState } from "react";
import ImageUpload from "../ImageUpload/ImageUpload";
import OneLineInput from "../OneLineInput/OneLineInput";
import "./AddNewWorshipOffice.scss"; 
import ImagePreview from "../ImagePreview/ImagePreview";
import AddImage from "../AddImage/AddImage";
import DateInput from "../DateInput/DateInput";
import Wysiwyg from "../Wysiwyg/Wysiwyg";
import { API_URL, worshipOfficeSlug } from "../../utilities/api";
import axios from "axios";
import { dateInputConverter, dateOutputConverter } from "../../utilities/dateConverter";
import ErrorModal from "../ErrorModal/ErrorModal";
import SuccessModal from "../SuccessModal/SuccessModal";
import { uploadItem } from "../../utilities/send";
import BgVersionConfirmation from "../BgVersionConfirmation/BgVersionConfirmation";

function AddNewWorshipOffice() {
  const currentDate = Math.floor(Date.now() / 1000);
  const [youtubeId, setYoutubeId] = useState("");
  const [thumbnailId, setThumbnailId] = useState("");
  const [date, setDate] = useState(dateOutputConverter(currentDate));
  const [titleEn, setTitleEn] = useState("");
  const [titleBg, setTitleBg] = useState("");
  const [gospelEn, setGospelEn] = useState("");
  const [gospelBg, setGospelBg] = useState("");
  const [epistleEn, setEpistleEn] = useState("");
  const [epistleBg, setEpistleBg] = useState("");
  const [oldTestamentEn, setOldTestamentEn] = useState("");
  const [oldTestamentBg, setOldTestamentBg] = useState("");
  const [bgVersion, setBgVersion] = useState("yes");


  //states responsible for image upload popup
  const [imageUploadVisible, setImageUploadVisible] = useState(false);
  const [imageReplaceVisible, setImageReplaceVisible] = useState(false);

  //states responsible for the option to add a different image on the bulgarian version of the site
  const [thumbnailIdBg, setThumbnailIdBg] = useState("")
  const [imageUploadVisibleBg, setImageUploadVisibleBg] = useState(false);
  const [imageReplaceVisibleBg, setImageReplaceVisibleBg] = useState(false);

  //error and success states
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const createPosts = (draft) => {
    const WorshipOfficeEN = {
      title: titleEn,
      gospel: gospelEn,
      epistle: epistleEn,
      old_testament: oldTestamentEn,
      thumbnail_id: thumbnailId,
      youtube_video_id: youtubeId,
      date: dateInputConverter(date),
      is_draft: draft
    };

    let WorshipOfficeBG = {
        title: titleBg,
        gospel: gospelBg,
        epistle: epistleBg,
        old_testament: oldTestamentBg,
        thumbnail_id: thumbnailId,
        youtube_video_id: youtubeId,
        date: dateInputConverter(date),
        bg_version: bgVersion === "yes" ? true : false
    };

    if(thumbnailIdBg){
      WorshipOfficeBG = {
        ...WorshipOfficeBG,
        thumbnail_id: thumbnailIdBg
      }
    }
    return { en: WorshipOfficeEN, bg: WorshipOfficeBG };
  };

  const onSave = (e) => {
    e.preventDefault();

    if (!thumbnailId) {
      setUploadError(true);
      setErrorMessage("An image is required to save this post. You can change the image later but please select a placeholder image in the mean time");
      return;
    }

    //save draft
    const posts = createPosts(true);
    const response = uploadItem(posts, `${API_URL}/worship-office`);
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
    if (!titleEn || gospelEn.length < 8 || epistleEn.length < 8) {
      setUploadError(true);
      setErrorMessage(
        "Make sure to provide the title, gospel reading and epistle reading in English before publishing this item to the public. If you wish to return and edit the content later click the Save as Draft button above"
      );
      return;
    }
    if (!youtubeId) {
      setUploadError(true);
      setErrorMessage(
        "Make sure to provide the id of the youtube video before publishing this item to the live site"
      );
      return;
    }
    if (!date) {
      setUploadError(true);
      setErrorMessage(
        "Make sure to add a date on which you want this item to be posted"
      );
      return;
    }
    if (!thumbnailId) {
      setUploadError(true);
      setErrorMessage("Make sure to upload an image before publishing this item.");
      return;
    }
    if (bgVersion === "yes" && !titleBg && gospelBg.length < 8 && epistleBg.length < 8) {
      setUploadError(true);
      setErrorMessage(
        "You've requested to make the Bulgarian version of this item public but no Bulgarian translations have been provided. Please fill out correct fields in Bulgarian or choose the option not to display the Bulgarian version."
      );
      return;
    }
    if (bgVersion === "yes" && !titleBg) {
      setUploadError(true);
      setErrorMessage(
        "You've requested to make the Bulgarian version of this item public but there is no Bulgarian title. Please fill out the title in Bulgarian or choose the option not to display the Bulgarian version."
      );
      return;
    }
    if (bgVersion === "yes" && gospelBg.length < 8) {
      setUploadError(true);
      setErrorMessage(
        "You've requested to make the Bulgarian version of this item public but the Bulgarian translation of the Gospel reading is empty. Please fill out the content in Bulgarian or choose the option not to display the Bulgarian version."
      );
      return;
    }
    if (bgVersion === "yes" && epistleBg.length < 8) {
      setUploadError(true);
      setErrorMessage(
        "You've requested to make the Bulgarian version of this item public but the Bulgarian translation of the Epistle reading is empty. Please fill out the content in Bulgarian or choose the option not to display the Bulgarian version."
      );
      return;
    }

    //publish
    const posts = createPosts(false);
    const response = uploadItem(posts, `${API_URL}/worship-office`);
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
          setImageId={setThumbnailId}
          setVisible={setImageUploadVisible}
        />
      )}
      {imageReplaceVisible && (
        <ImageUpload
          setImageId={setThumbnailId}
          setVisible={setImageReplaceVisible}
        />
      )}
      {imageUploadVisibleBg && (
        <ImageUpload
          setImageId={setThumbnailIdBg}
          setVisible={setImageUploadVisibleBg}
        />
      )}
      {imageReplaceVisibleBg && (
        <ImageUpload
          setImageId={setThumbnailIdBg}
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
      <form className="worship-office">
        <h1 className="worship-office__title">Add New Worship Office Entry</h1>
        <div className="worship-office__top">
            <div className="worship-office__youtube">
            <OneLineInput
                label="Paste in the id of the youtube video you've created"
                oneLine={youtubeId}
                setOneLine={setYoutubeId}
            />
            {thumbnailId ? (
              <div className="worship-office__images">
              <div className="worship-office__image-preview">
                <ImagePreview imageId={thumbnailId} setVisible={setImageUploadVisible} />
                <button
                  type="button"
                  className="worship-office__button"
                  onClick={() => setImageReplaceVisible(true)}
                >
                  Replace
                </button>
                {!thumbnailIdBg && <button
                  type="button"
                  className="worship-office__special-button"
                  onClick={() => {setImageReplaceVisibleBg(true)}}
                >
                  Special BG Image
                </button>}
                </div>
                {thumbnailIdBg && (
                  <div className="worship-office__image-preview">
                    <ImagePreview imageId={thumbnailIdBg} setVisible={setImageUploadVisibleBg} />
                  <button
                    type="button"
                    className="worship-office__button"
                    onClick={() => setImageReplaceVisibleBg(true)}
                  >
                    Replace
                  </button>
                  <button
                    type="button"
                    className="worship-office__special-button"
                    onClick={() => {setThumbnailIdBg("")}}
                  >
                    Remove Special BG Image
                  </button>

                  </div>
                )}
              </div>
            ) : (
                <AddImage setImageUploadVisible={setImageUploadVisible} />
            )}
            </div>
        </div>
        <div className="worship-office__middle">
            <div className="worship-office__language">
            <h2 className="worship-office__subtitle">English</h2>
                <OneLineInput label="Enter the headline/title" oneLine={titleEn} setOneLine={setTitleEn} />
                <Wysiwyg
                    editorLabel="Enter relevant Gospel reading:"
                    setContent={setGospelEn}
                />
                <Wysiwyg
                    editorLabel="Enter relevant Epsitle reading:"
                    setContent={setEpistleEn}
                />
                <Wysiwyg
                    editorLabel="Enter relevant reading from the Old Testament:"
                    setContent={setOldTestamentEn}
                />
            </div>
            <div className="worship-office__language">
            <h2 className="worship-office__subtitle">Български</h2>
                <OneLineInput label="Въведете заглавието" oneLine={titleBg} setOneLine={setTitleBg} />
                <Wysiwyg
                    editorLabel="Въведете съответното Евангелско четиво:"
                    setContent={setGospelBg}
                />
                <Wysiwyg
                    editorLabel="Въведете съответното Апостолско четиво:"
                    setContent={setEpistleBg}
                />
                <Wysiwyg
                    editorLabel="Въведете подходящото четиво от Стария Завет"
                    setContent={setOldTestamentBg}
                />
            </div>
        </div>
        <input
          className="worship-office__button"
          type="submit"
          value="Save as Draft"
          onClick={onSave}
        />
        <DateInput date={date} setDate={setDate}/>
        <BgVersionConfirmation
          bgVersion={bgVersion}
          setBgVersion={setBgVersion}
        />
        <div className="worship-office__bottom">
        <input
          className="worship-office__button"
          type="submit"
          value="Publish"
          onClick={onPublish}
        />
      </div>
      </form>
    </>
  );
}

export default AddNewWorshipOffice;
