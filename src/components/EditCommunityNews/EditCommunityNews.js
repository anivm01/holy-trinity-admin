import { useEffect, useState } from "react";
import ImageUpload from "../ImageUpload/ImageUpload";
import OneLineInput from "../OneLineInput/OneLineInput";
import "./EditCommunityNews.scss";
import ImagePreview from "../ImagePreview/ImagePreview";
import AddImage from "../AddImage/AddImage";
import DateInput from "../DateInput/DateInput";
import { API_URL, communityNewsSlug } from "../../utilities/api";
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

function EditCommunityNews() {
  //content states
  const [featuredImgId, setFeaturedImgId] = useState("");
  const [date, setDate] = useState("");
  const [titleEn, setTitleEn] = useState("");
  const [titleBg, setTitleBg] = useState("");
  const [authorEn, setAuthorEn] = useState("");
  const [authorBg, setAuthorBg] = useState("");
  const [contentEn, setContentEn] = useState("");
  const [contentBg, setContentBg] = useState("");
  const [bgVersion, setBgVersion] = useState("yes");

  const [isDraft, setIsDraft] = useState(true);

  //image popup states
  const [imageUploadVisible, setImageUploadVisible] = useState(false);
  const [imageReplaceVisible, setImageReplaceVisible] = useState(false);

  //states responsible for the option to add a different image on the bulgarian version of the site
  const [featuredImgIdBg, setFeaturedImgIdBg] = useState("");
  const [imageUploadVisibleBg, setImageUploadVisibleBg] = useState(false);
  const [imageReplaceVisibleBg, setImageReplaceVisibleBg] = useState(false);

  //success and error states
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [dataLoaded, setDataLoaded] = useState(false);

  const params = useParams();

  useEffect(() => {
    const fetchContent = async () => {
      const enData = await axios.get(
        `${API_URL}${communityNewsSlug}/en/${params.id}`
      );
      setDate(dateOutputConverter(enData.data.date));
      setFeaturedImgId(enData.data.featured_img_id);
      setTitleEn(enData.data.title);
      setAuthorEn(enData.data.author);
      setContentEn(enData.data.content);
      setIsDraft(enData.data.is_draft);
      const bgData = await axios.get(
        `${API_URL}${communityNewsSlug}/bg/${params.id}`
      );
      setTitleBg(bgData.data.title);
      setAuthorBg(bgData.data.author);
      setContentBg(bgData.data.content);
      setBgVersion(bgData.data.bg_version ? "yes" : "no");
      
      if (enData.data.featured_img_id !== bgData.data.featured_img_id) {
        setFeaturedImgIdBg(bgData.data.featured_img_id);
      }
      setDataLoaded(true);
    };
    fetchContent();
  }, [params.id]);
  const createPosts = (draft) => {
    const articleEn = {
      title: titleEn,
      author: authorEn,
      content: contentEn,
      featured_img_id: featuredImgId,
      date: dateInputConverter(date),
      is_draft: draft,
    };

    let articleBg = {
      title: titleBg,
      author: authorBg,
      content: contentBg,
      featured_img_id: featuredImgId,
      date: dateInputConverter(date),
      bg_version: bgVersion === "yes" ? true : false,
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
    if (!titleEn || !contentEn || !authorEn) {
      setUploadError(true);
      setErrorMessage(
        "Make sure to provide a title, author and main content before publishing this item to the public. If you wish to return and edit the content later click the Save as Draft button above"
      );
      return;
    }
    if (contentEn.length < 8) {
      setUploadError(true);
      setErrorMessage(
        "Make sure to provide some main content before publishing this item to the public. If you wish to return and edit the content later click the Save as Draft button above"
      );
      return;
    }
    if (!featuredImgId) {
      setUploadError(true);
      setErrorMessage("Make sure to upload a featured image");
      return;
    }
    if (!date) {
      setUploadError(true);
      setErrorMessage(
        "Make sure to add a date on which you want the entry to be posted"
      );
      return;
    }
    if (bgVersion === "yes" && !titleBg && !contentBg && !authorBg) {
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
    if (bgVersion === "yes" && contentBg.length < 8) {
      setUploadError(true);
      setErrorMessage(
        "You've requested to make the Bulgarian version of this item public but the main content is empty. Please fill out the main content in Bulgarian or choose the option not to display the Bulgarian version."
      );
      return;
    }
    if (bgVersion === "yes" && !authorBg) {
      setUploadError(true);
      setErrorMessage(
        "You've requested to make the Bulgarian version of this item public but you have not provided the author's name in Bulgarian. Please fill out the main content in Bulgarian or choose the option not to display the Bulgarian version."
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

  if (!dataLoaded) {
    return (
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
    );
  }

  return (
    <>
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
          {featuredImgId ? (
            <div className="community-news__images">
              <div className="community-news__image-preview">
                <ImagePreview
                  imageId={featuredImgId}
                  setVisible={setImageUploadVisible}
                />
                <button
                  type="button"
                  className="community-news__button"
                  onClick={() => setImageReplaceVisible(true)}
                >
                  Replace
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
        <input
          className="community-news__button"
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
            className="community-news__button"
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
