import { useEffect, useState } from "react";
import ImageUpload from "../ImageUpload/ImageUpload";
import OneLineInput from "../OneLineInput/OneLineInput";
import "./EditWorshipOffice.scss";
import ImagePreview from "../ImagePreview/ImagePreview";
import AddImage from "../AddImage/AddImage";
import DateInput from "../DateInput/DateInput";
import { API_URL, worshipOfficeSlug } from "../../utilities/api";
import axios from "axios";
import {
  dateInputConverter,
  dateOutputConverter,
} from "../../utilities/dateConverter";
import ErrorModal from "../ErrorModal/ErrorModal";
import SuccessModal from "../SuccessModal/SuccessModal";
import { useParams } from "react-router-dom";
import WysiwygEdit from "../WysiwygEdit/WysiwygEdit";
import { ThreeDots } from "react-loader-spinner";
import BgVersionConfirmation from "../BgVersionConfirmation/BgVersionConfirmation";
import { updateItem } from "../../utilities/send";

function EditWorshipOffice() {
  const [youtubeId, setYoutubeId] = useState("");
  const [thumbnailId, setThumbnailId] = useState("");
  const [date, setDate] = useState("");
  const [titleEn, setTitleEn] = useState("");
  const [titleBg, setTitleBg] = useState("");
  const [gospelEn, setGospelEn] = useState("");
  const [gospelBg, setGospelBg] = useState("");
  const [epistleEn, setEpistleEn] = useState("");
  const [epistleBg, setEpistleBg] = useState("");
  const [oldTestamentEn, setOldTestamentEn] = useState("");
  const [oldTestamentBg, setOldTestamentBg] = useState("");
  const [dataLoaded, setDataLoaded] = useState(false);
  const [bgVersion, setBgVersion] = useState("yes");
  const [isDraft, setIsDraft] = useState(true);

  const [imageUploadVisible, setImageUploadVisible] = useState(false);
  const [imageReplaceVisible, setImageReplaceVisible] = useState(false);

  const [thumbnailIdBg, setThumbnailIdBg] = useState("")
  const [imageUploadVisibleBg, setImageUploadVisibleBg] = useState(false);
  const [imageReplaceVisibleBg, setImageReplaceVisibleBg] = useState(false);

  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const params = useParams();

  useEffect(() => {
    const fetchContent = async () => {

      //commont content and English content
      const enData = await axios.get(
        `${API_URL}${worshipOfficeSlug}/en/${params.id}`
      );
      setDate(dateOutputConverter(enData.data.date));
      
      setYoutubeId(enData.data.youtube_video_id);
      setTitleEn(enData.data.title);
      setGospelEn(enData.data.gospel);
      setEpistleEn(enData.data.epistle);
      setOldTestamentEn(enData.data.old_testament);
      setIsDraft(enData.data.is_draft)

      //bg content
      const bgData = await axios.get(
        `${API_URL}${worshipOfficeSlug}/bg/${params.id}`
      );
      setTitleBg(bgData.data.title);
      setGospelBg(bgData.data.gospel);
      setEpistleBg(bgData.data.epistle);
      setOldTestamentBg(bgData.data.old_testament);
      setBgVersion(bgData.data.bg_version ? "yes" : "no");
      

      //image
      const enImage = await axios.get(
        `${API_URL}/thumbnail/en/${params.id}`
      );
      const bgImage = await axios.get(
        `${API_URL}/thumbnail/bg/${params.id}`
      );
      setThumbnailId(enImage.data.image_id);
      
      if (enImage.data.image_id !== bgImage.data.image_id) {
        setThumbnailIdBg(bgImage.data.image_id);
      }

      setDataLoaded(true);
    };
    fetchContent();
  }, [params.id]);


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

    //save draft
    const posts = createPosts(true);
    const response = updateItem(posts, `${API_URL}/worship-office`, params.id);
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
    const response = updateItem(posts, `${API_URL}/worship-office`, params.id);
    setUploadSuccess(response);
    if (response === false) {
      setUploadError(true);
      setErrorMessage(
        "There was a problem with the connection. Try again later."
      );
    }
  };

  if (!dataLoaded) {
    return <ThreeDots
    height="80" 
    width="80" 
    radius="9"
    color="#6F0B20" 
    ariaLabel="three-dots-loading"
    wrapperStyle={{justifyContent: "center"}}
    wrapperClassName=""
    visible={true}
     />;
  }
  console.log(epistleEn)

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
        <h1 className="worship-office__title">Edit Worship Office Entry</h1>
        {isDraft ? (
          <p>This item is currently saved as a draft</p>
        ) : (
          <p>This item is published to the live site.</p>
        )}
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
            <OneLineInput
              label="Enter the headline/title"
              oneLine={titleEn}
              setOneLine={setTitleEn}
            />
            <WysiwygEdit
              editorLabel="Enter relevant Gospel reading:"
              setContent={setGospelEn}
              content={gospelEn}
            />
            <WysiwygEdit
              editorLabel="Enter relevant Epsitle reading:"
              setContent={setEpistleEn}
              content={epistleEn}
            />
            <WysiwygEdit
              editorLabel="Enter relevant reading from the Old Testament:"
              setContent={setOldTestamentEn}
              content={oldTestamentEn}
            />
          </div>
          <div className="worship-office__language">
            <h2 className="worship-office__subtitle">Български</h2>
            <OneLineInput
              label="Въведете заглавието"
              oneLine={titleBg}
              setOneLine={setTitleBg}
            />
            <WysiwygEdit
              editorLabel="Въведете съответното Евангелско четиво:"
              setContent={setGospelBg}
              content={gospelBg}
            />
            <WysiwygEdit
              editorLabel="Въведете съответното Апостолско четиво:"
              setContent={setEpistleBg}
              content={epistleBg}
            />
            <WysiwygEdit
              editorLabel="Въведете подходящото четиво от Стария Завет"
              setContent={setOldTestamentBg}
              content={oldTestamentBg}
            />
          </div>
        </div>
        <input
            className="worship-office__button"
            type="submit"
            value={isDraft ? "Update Draft" : "Revert to Draft and Save Changes"}
          onClick={onSave}
          />
        <DateInput date={date} setDate={setDate} />
        <BgVersionConfirmation
          bgVersion={bgVersion}
          setBgVersion={setBgVersion}
        />
        <div className="worship-office__bottom">
          <input
            className="worship-office__button"
            type="submit"
            value={isDraft ? "Publish" : "Update Live Content"}
            onClick={onPublish}
          />
        </div>
      </form>
    </>
  );
}

export default EditWorshipOffice;
