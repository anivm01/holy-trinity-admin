import { useEffect, useState } from "react";
import ImageUpload from "../ImageUpload/ImageUpload";
import OneLineInput from "../OneLineInput/OneLineInput";
import "./EditWorshipOffice.scss";
import SavedImage from "../SavedImage/SavedImage";
import ImagePreview from "../ImagePreview/ImagePreview";
import AddImage from "../AddImage/AddImage";
import DateInput from "../DateInput/DateInput";
import { API_URL } from "../../utilities/api";
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
import { updateItem } from "../../utilities/send";

function EditWorshipOffice({ data, dataBg }) {
  const [youtubeId, setYoutubeId] = useState(data.youtube_video_id);

  const [date, setDate] = useState(dateOutputConverter(data.date));
  const [titleEn, setTitleEn] = useState(data.title);
  const [titleBg, setTitleBg] = useState(dataBg.title);
  const [gospelEn, setGospelEn] = useState(data.gospel);
  const [gospelBg, setGospelBg] = useState(dataBg.gospel);
  const [epistleEn, setEpistleEn] = useState(data.epistle);
  const [epistleBg, setEpistleBg] = useState(dataBg.epistle);
  const [oldTestamentEn, setOldTestamentEn] = useState(data.old_testament);
  const [oldTestamentBg, setOldTestamentBg] = useState(dataBg.old_testament);

  const [isDraft] = useState(data.is_draft);

  const [imageUploadVisible, setImageUploadVisible] = useState(false);
  const [imageReplaceVisible, setImageReplaceVisible] = useState(false);

  const [imagesLoading, setImagesLoading] = useState(false);
  const [thumbnailId, setThumbnailId] = useState("");
  const [thumbnailIdBg, setThumbnailIdBg] = useState("");
  const [imageUploadVisibleBg, setImageUploadVisibleBg] = useState(false);
  const [imageReplaceVisibleBg, setImageReplaceVisibleBg] = useState(false);

  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const params = useParams();

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setImagesLoading(true);
        const enImage = await axios.get(`${API_URL}/thumbnail/en/${params.id}`);
        const bgImage = await axios.get(`${API_URL}/thumbnail/bg/${params.id}`);
        setThumbnailId(enImage.data.image_id);

        if (enImage.data.image_id !== bgImage.data.image_id) {
          setThumbnailIdBg(bgImage.data.image_id);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setImagesLoading(false);
      }
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
      is_draft: draft,
    };

    let WorshipOfficeBG = {
      title: titleBg,
      gospel: gospelBg,
      epistle: epistleBg,
      old_testament: oldTestamentBg,
      thumbnail_id: thumbnailId,
      youtube_video_id: youtubeId,
      date: dateInputConverter(date),
    };

    if (thumbnailIdBg) {
      WorshipOfficeBG = {
        ...WorshipOfficeBG,
        thumbnail_id: thumbnailIdBg,
      };
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

    if (!date) {
      setUploadError(true);
      setErrorMessage(
        "Make sure to add a date on which you want the entry to be posted"
      );
      return;
    }
    if (!youtubeId) {
      setUploadError(true);
      setErrorMessage(
        "Make sure to add the id of the youtube video before publishing. If you wish to wait and do it later, save this item as a draft"
      );
      return;
    }
    if (!titleEn) {
      setUploadError(true);
      setErrorMessage("Please fill out the title in English");
      return;
    }
    if (!titleBg) {
      setUploadError(true);
      setErrorMessage("Please fill out the title in Bulgarian");
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
            {imagesLoading && (
              <ThreeDots
                height="80"
                width="80"
                radius="9"
                color="#6F0B20"
                ariaLabel="three-dots-loading"
                wrapperStyle={{ justifyContent: "center" }}
                wrapperClassName=""
                visible={true}
              />
            )}
            {thumbnailId ? (
              <div className="worship-office__images">
                <div className="worship-office__image-preview">
                  <ImagePreview imageId={thumbnailId} />
                  <button
                    type="button"
                    className="worship-office__button"
                    onClick={() => setImageReplaceVisible(true)}
                  >
                    Replace
                  </button>
                  <button
                    className="button"
                    type="button"
                    onClick={() => setThumbnailId("")}
                  >
                    Remove
                  </button>
                  {!thumbnailIdBg && (
                    <button
                      type="button"
                      className="button"
                      onClick={() => {
                        setImageReplaceVisibleBg(true);
                      }}
                    >
                      Special BG Image
                    </button>
                  )}
                </div>
                {thumbnailIdBg && (
                  <div className="worship-office__image-preview">
                    <ImagePreview
                      imageId={thumbnailIdBg}
                      setVisible={setImageUploadVisibleBg}
                    />
                    <button
                      type="button"
                      className="button"
                      onClick={() => setImageReplaceVisibleBg(true)}
                    >
                      Replace
                    </button>
                    <button
                      type="button"
                      className="button"
                      onClick={() => {
                        setThumbnailIdBg("");
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
        <DateInput date={date} setDate={setDate} />
        <div className="worship-office__bottom">
          <input
            className="button"
            type="submit"
            value={
              isDraft ? "Update Draft" : "Revert to Draft and Save Changes"
            }
            onClick={onSave}
          />
          <input
            className="button"
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
