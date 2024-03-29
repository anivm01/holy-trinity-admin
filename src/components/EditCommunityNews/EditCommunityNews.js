import { useEffect, useState } from "react";
import ImageUpload from "../ImageUpload/ImageUpload";
import OneLineInput from "../OneLineInput/OneLineInput";
import "./EditCommunityNews.scss";
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
import BgVersionConfirmation from "../BgVersionConfirmation/BgVersionConfirmation";
import { updateItem } from "../../utilities/send";
import CreateGallery from "../CreateGallery/CreateGallery";

function EditCommunityNews({ data, dataBg }) {
  console.log(data);
  console.log(dataBg);

  //content states
  const [date, setDate] = useState(dateOutputConverter(data.entry_data.date));
  const [titleEn, setTitleEn] = useState(data.entry_data.title);
  const [titleBg, setTitleBg] = useState(dataBg.entry_data.title);
  const [authorEn, setAuthorEn] = useState(data.entry_data.author);
  const [authorBg, setAuthorBg] = useState(dataBg.entry_data.author);
  const [contentEn, setContentEn] = useState(data.entry_data.content);
  const [contentBg, setContentBg] = useState(dataBg.entry_data.content);
  const [bgVersion, setBgVersion] = useState(
    dataBg.entry_data.bg_version ? "yes" : "no"
  );

  const [isDraft] = useState(data.entry_data.is_draft);

  //image popup states
  const [imageUploadVisible, setImageUploadVisible] = useState(false);
  const [imageReplaceVisible, setImageReplaceVisible] = useState(false);

  //image states
  const [imagesLoading, setImagesLoading] = useState(false);
  const [featuredImgId, setFeaturedImgId] = useState(data.entry_data.image_id);
  const [featuredImgIdBg, setFeaturedImgIdBg] = useState(
    dataBg.entry_data.image_id !== data.entry_data.image_id
      ? dataBg.entry_data.image_id
      : ""
  );
  const [imageUploadVisibleBg, setImageUploadVisibleBg] = useState(false);
  const [imageReplaceVisibleBg, setImageReplaceVisibleBg] = useState(false);

  //image gallery
  const galleryData = data.image_gallery.map((image) => {
    return image.id;
  });
  const galleryDataBg = dataBg.image_gallery.map((image) => {
    return image.id;
  });

  const [galleryEn, setGalleryEn] = useState(galleryData);
  const [galleryBg, setGalleryBg] = useState(galleryDataBg);
  const [createGalleryVisbile, setCreateGalleryVisible] = useState(false);
  const [createBgGalleryVisbile, setCreateBgGalleryVisible] = useState(false);

  //success and error states
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const params = useParams();

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
    const response = updateItem(posts, `${API_URL}/article`, params.id);
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
    const response = updateItem(posts, `${API_URL}/article`, params.id);
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
        <CreateGallery
          chosenIds={galleryEn}
          setChosenIds={setGalleryEn}
          setVisible={setCreateGalleryVisible}
        />
      )}
      {createBgGalleryVisbile && (
        <CreateGallery
          chosenIds={galleryBg}
          setChosenIds={setGalleryBg}
          setVisible={setCreateBgGalleryVisible}
        />
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
        <h1 className="community-news__title">Edit Community News Article</h1>
        {isDraft ? (
          <p>This item is currently saved as a draft</p>
        ) : (
          <p>This item is published to the live site.</p>
        )}
        <div className="community-news__top">
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
                    className="button"
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
                    className="button"
                    onClick={() => setImageReplaceVisibleBg(true)}
                  >
                    Replace
                  </button>
                  <button
                    type="button"
                    className="button"
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
            <WysiwygEdit
              editorLabel="Enter the main content:"
              setContent={setContentEn}
              content={contentEn}
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
            <WysiwygEdit
              editorLabel="Въведете главното съдържание:"
              setContent={setContentBg}
              content={contentBg}
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
          className="button"
          type="submit"
          value={isDraft ? "Update Draft" : "Revert to Draft and Save Changes"}
          onClick={onSave}
        />
        <DateInput date={date} setDate={setDate} />
        <BgVersionConfirmation
          bgVersion={bgVersion}
          setBgVersion={setBgVersion}
        />
        <div className="community-news__bottom">
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

export default EditCommunityNews;
