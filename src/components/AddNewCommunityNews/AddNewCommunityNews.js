import { useState } from "react";
import ImageUpload from "../ImageUpload/ImageUpload";
import OneLineInput from "../OneLineInput/OneLineInput";
import "./AddNewCommunityNews.scss"; 
import ImagePreview from "../ImagePreview/ImagePreview";
import AddImage from "../AddImage/AddImage";
import DateInput from "../DateInput/DateInput";
import Wysiwyg from "../Wysiwyg/Wysiwyg";
import { API_URL, communityNewsSlug } from "../../utilities/api";
import axios from "axios";
import { dateInputConverter } from "../../utilities/dateConverter";
import ErrorModal from "../ErrorModal/ErrorModal";
import SuccessModal from "../SuccessModal/SuccessModal";

function AddNewCommunityNews() {
  const [featuredImgId, setFeaturedImgId] = useState("");
  const [date, setDate] = useState("");
  const [titleEn, setTitleEn] = useState("");
  const [titleBg, setTitleBg] = useState("");
  const [contentEn, setContentEn] = useState("");
  const [contentBg, setContentBg] = useState("");

  const [imageUploadVisible, setImageUploadVisible] = useState(false);
  const [imageReplaceVisible, setImageReplaceVisible] = useState(false);

  //states responsible for the option to add a different image on the bulgarian version of the site
  const [featuredImgIdBg, setFeaturedImgIdBg] = useState("")
  const [imageUploadVisibleBg, setImageUploadVisibleBg] = useState(false);
  const [imageReplaceVisibleBg, setImageReplaceVisibleBg] = useState(false);

  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    if (
      !titleEn ||
      !titleBg ||
      !contentEn ||
      !contentBg
    ) {
      setUploadError(true);
      setErrorMessage(
        "Make sure that you have filled out all the fields in both English and Bulgarian. If you wish to return and edit the content later leave some default content such as 'TBD' or 'update coming soon'"
      );
      return;
    }
    if (!featuredImgId){
        setUploadError(true);
        setErrorMessage(
            "Make sure to upload a featured image"
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

    const articleEN = {
      title: titleEn,
      content: contentEn,
      featured_img_id: featuredImgId,
      date_posted: dateInputConverter(date)
    };

    let articleBG = {
        title: titleBg,
        content: contentBg,
        featured_img_id: featuredImgId,
        date_posted: dateInputConverter(date)
    };

    if(featuredImgIdBg){
      articleBG = {
        ...articleBG,
        featured_img_id: featuredImgId
      }
    }

    const uploadCommunityNews = async () => {
      try {
        const enResponse = await axios.post(
          `${API_URL}${communityNewsSlug}/en`,
          articleEN
        );
        const articleBGUpdated = {
          ...articleBG,
          en_id: enResponse.data.new_entry.id,
        };
        await axios.post(
          `${API_URL}${communityNewsSlug}/bg`,
          articleBGUpdated
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
    uploadCommunityNews();
  };


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
      {uploadSuccess && <SuccessModal/>}
      <form onSubmit={onSubmit} className="community-news">
        <h1 className="community-news__title">Add New Community News Article</h1>
        <div className="community-news__top">
            <DateInput date={date} setDate={setDate}/>
            {featuredImgId ? (
              <div className="community-news__images">
                <div className="community-news__image-preview">
                  <ImagePreview imageId={featuredImgId} setVisible={setImageUploadVisible} />
                  <button
                    type="button"
                    className="community-news__button"
                    onClick={() => setImageReplaceVisible(true)}
                  >
                    Replace
                  </button>
                {!featuredImgIdBg && <button
                  type="button"
                  className="community-news__special-button"
                  onClick={() => {setImageReplaceVisibleBg(true)}}
                >
                  Special BG Image
                </button>}
                </div>
                {featuredImgIdBg && <div className="community-news__image-preview">
                  <ImagePreview imageId={featuredImgIdBg} setVisible={setImageUploadVisibleBg} />
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
                  onClick={() => {setFeaturedImgIdBg("")}}
                >
                  Remove Special BG Image
                </button>
                </div>}
              </div>
            ) : (
                <AddImage setImageUploadVisible={setImageUploadVisible} />
            )}
            
        </div>
        <div className="community-news__middle">
            <div className="community-news__language">
            <h2 className="community-news__subtitle">English</h2>
                <OneLineInput label="Enter the headline/title" oneLine={titleEn} setOneLine={setTitleEn} />
                <Wysiwyg
                    editorLabel="Enter the main content:"
                    setContent={setContentEn}
                />
            </div>
            <div className="community-news__language">
            <h2 className="community-news__subtitle">Български</h2>
                <OneLineInput label="Въведете заглавието" oneLine={titleBg} setOneLine={setTitleBg} />
                <Wysiwyg
                    editorLabel="Въведете главното съдържание:"
                    setContent={setContentBg}
                />
            </div>
        </div>
        <div className="community-news__bottom">
        <input
          className="community-news__button"
          type="submit"
          value="Save "
        />
      </div>
      </form>
    </>
  );
}

export default AddNewCommunityNews;
