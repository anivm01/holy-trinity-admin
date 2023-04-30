import { useState } from "react";
import ImageUpload from "../ImageUpload/ImageUpload";
import OneLineInput from "../OneLineInput/OneLineInput";
import "./AddNewCommunityNews.scss";
import ImagePreview from "../ImagePreview/ImagePreview";
import AddImage from "../AddImage/AddImage";
import DateInput from "../DateInput/DateInput";
import Wysiwyg from "../Wysiwyg/Wysiwyg";
import { API_URL } from "../../utilities/api";
import {
  dateInputConverter,
  dateOutputConverter,
} from "../../utilities/dateConverter";
import ErrorModal from "../ErrorModal/ErrorModal";
import SuccessModal from "../SuccessModal/SuccessModal";
import BgVersionConfirmation from "../BgVersionConfirmation/BgVersionConfirmation";
import { uploadItem } from "../../utilities/send";
import CreateGallery from "../CreateGallery/CreateGallery";

function AddNewCommunityNews() {
  const currentDate = Math.floor(Date.now() / 1000);
  const [featuredImgId, setFeaturedImgId] = useState("");
  const [date, setDate] = useState(dateOutputConverter(currentDate));
  const [titleEn, setTitleEn] = useState("");
  const [titleBg, setTitleBg] = useState("");
  const [authorEn, setAuthorEn] = useState("");
  const [authorBg, setAuthorBg] = useState("");
  const [contentEn, setContentEn] = useState("");
  const [contentBg, setContentBg] = useState("");
  const [bgVersion, setBgVersion] = useState("yes");

  const [imageUploadVisible, setImageUploadVisible] = useState(false);
  const [imageReplaceVisible, setImageReplaceVisible] = useState(false);

  //states responsible for the option to add a different image on the bulgarian version of the site
  const [featuredImgIdBg, setFeaturedImgIdBg] = useState("");
  const [imageUploadVisibleBg, setImageUploadVisibleBg] = useState(false);
  const [imageReplaceVisibleBg, setImageReplaceVisibleBg] = useState(false);

  //image gallery
  const [galleryEn, setGalleryEn] = useState([]);
  const [galleryBg, setGalleryBg] = useState([]);
  const [createGalleryVisbile, setCreateGalleryVisible] = useState(false);
  const [createBgGalleryVisbile, setCreateBgGalleryVisible] = useState(false);

  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const createPosts = (draft) => {
    const articleEn = {
      title: titleEn,
      author: authorEn,
      content: contentEn,
      featured_img_id: featuredImgId,
      date: dateInputConverter(date),
      is_draft: draft,
      gallery: galleryEn,
    };

    let articleBg = {
      title: titleBg,
      author: authorBg,
      content: contentBg,
      featured_img_id: featuredImgId,
      date: dateInputConverter(date),
      bg_version: bgVersion === "yes" ? true : false,
      gallery: galleryBg,
    };

    if (featuredImgIdBg) {
      articleBg = {
        ...articleBg,
        featured_img_id: featuredImgIdBg,
      };
    }
    return { en: articleEn, bg: articleBg };
  };

  const onSave = (e) => {
    e.preventDefault();

    //save draft
    const posts = createPosts(true);
    const response = uploadItem(posts, `${API_URL}/article`);
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

    if (!date) {
      setUploadError(true);
      setErrorMessage(
        "Make sure to add a date on which you want the entry to be posted"
      );
      return;
    }
    if (bgVersion === "no" && !titleEn) {
      setUploadError(true);
      setErrorMessage("Make sure to fill out the title in English");
      return;
    }
    if (bgVersion === "no" && contentEn.length < 8) {
      setUploadError(true);
      setErrorMessage(
        "Make sure to provide some main content before publishing this item to the public. If you wish to return and edit the content later click the Save as Draft button above"
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
    if (bgVersion === "yes" && contentBg.length < 8) {
      setUploadError(true);
      setErrorMessage(
        "You've requested to make the Bulgarian version of this item public but the main content is empty. Please fill out the main content in Bulgarian or choose the option not to display the Bulgarian version."
      );
      return;
    }

    //publish
    const posts = createPosts(false);
    const response = uploadItem(posts, `${API_URL}/article`);
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
      {createGalleryVisbile && (
        <CreateGallery chosenIds={galleryEn} setChosenIds={setGalleryEn} setVisible={setCreateGalleryVisible} />
      )}
      {createBgGalleryVisbile && (
        <CreateGallery chosenIds={galleryBg} setChosenIds={setGalleryBg} setVisible={setCreateBgGalleryVisible} />
      )}
      {imageUploadVisible && (
        <ImageUpload
          setImageId={setFeaturedImgId}
          setVisible={setImageUploadVisible}
        />
      )}
      {imageReplaceVisible && (
        <ImageUpload
          setImageId={setFeaturedImgId}
          setVisible={setImageReplaceVisible}
        />
      )}
      {imageUploadVisibleBg && (
        <ImageUpload
          setImageId={setFeaturedImgIdBg}
          setVisible={setImageUploadVisibleBg}
        />
      )}
      {imageReplaceVisibleBg && (
        <ImageUpload
          setImageId={setFeaturedImgIdBg}
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
      <form className="community-news">
        <h1 className="community-news__title">
          Add New Community News Article
        </h1>
        <div className="community-news__top">
          {featuredImgId ? (
            <div className="community-news__images">
              <div className="community-news__image-preview">
                <ImagePreview
                  imageId={featuredImgId}
                  setVisible={setImageUploadVisible}
                />
                <button
                  type="button"
                  className="button"
                  onClick={() => setImageReplaceVisible(true)}
                >
                  Replace
                </button>
                <button
                  className="button"
                  type="button"
                  onClick={() => setFeaturedImgId("")}
                >
                  Remove
                </button>
                {!featuredImgIdBg && (
                  <button
                    type="button"
                    className="community-news__special-button"
                    onClick={() => {
                      setImageReplaceVisibleBg(true);
                    }}
                  >
                    Special BG Image
                  </button>
                )}
              </div>
              {featuredImgIdBg && (
                <div className="community-news__image-preview">
                  <ImagePreview
                    imageId={featuredImgIdBg}
                    setVisible={setImageUploadVisibleBg}
                  />
                  <button
                    type="button"
                    className="community-news__button"
                    onClick={() => setImageReplaceVisibleBg(true)}
                  >
                    Replace
                  </button>
                  <button
                    type="button"
                    className="community-news__special-button"
                    onClick={() => {
                      setFeaturedImgIdBg("");
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
        <div className="community-news__middle">
          <div className="community-news__language">
            <h2 className="community-news__subtitle">English</h2>
            <OneLineInput
              label="Enter the headline/title"
              oneLine={titleEn}
              setOneLine={setTitleEn}
            />
            <OneLineInput
              label="Enter name of the author"
              oneLine={authorEn}
              setOneLine={setAuthorEn}
            />
            <Wysiwyg
              editorLabel="Enter the main content:"
              setContent={setContentEn}
            />
          </div>
          <div className="community-news__language">
            <h2 className="community-news__subtitle">Български</h2>
            <OneLineInput
              label="Въведете заглавието"
              oneLine={titleBg}
              setOneLine={setTitleBg}
            />
            <OneLineInput
              label="Въведете името на автора"
              oneLine={authorBg}
              setOneLine={setAuthorBg}
            />
            <Wysiwyg
              editorLabel="Въведете главното съдържание:"
              setContent={setContentBg}
            />
          </div>
        </div>
        <div className="community-news__gallery">
          <button
            className="button"
            type="button"
            onClick={() => setCreateGalleryVisible(true)}
          >
            Gallery
          </button>
          <button
            className="button"
            type="button"
            onClick={() => setCreateBgGalleryVisible(true)}
          >
            Bg Gallery
          </button>
        </div>
        <input
          className="community-news__button"
          type="submit"
          value="Save as Draft"
          onClick={onSave}
        />
        <DateInput date={date} setDate={setDate} />
        <BgVersionConfirmation
          bgVersion={bgVersion}
          setBgVersion={setBgVersion}
        />
        <div className="community-news__bottom">
          <input
            className="community-news__button"
            type="submit"
            value="Publish"
            onClick={onPublish}
          />
        </div>
      </form>
    </>
  );
}

export default AddNewCommunityNews;
