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
import { dateInputConverter } from "../../utilities/dateConverter";
import ErrorModal from "../ErrorModal/ErrorModal";
import SuccessModal from "../SuccessModal/SuccessModal";

function AddNewWorshipOffice() {
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

  const onSubmit = (e) => {
    e.preventDefault();

    if (
      !titleEn ||
      !titleBg ||
      !gospelEn ||
      !gospelBg ||
      !epistleEn ||
      !epistleBg ||
      !oldTestamentEn ||
      !oldTestamentBg
    ) {
      setUploadError(true);
      setErrorMessage(
        "Make sure that you have filled out all the fields in both English and Bulgarian. If you wish to return and edit the content later leave some default content such as 'TBD' or 'update coming soon'"
      );
      return;
    }
    if (!youtubeId) {
      setUploadError(true);
      setErrorMessage(
        "Make sure to add a youtube video id"      
        );
      return;
    }
    if (!thumbnailId){
        setUploadError(true);
        setErrorMessage(
            "Make sure to upload a thumbnail image"
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

    const WorshipOfficeEN = {
      title: titleEn,
      gospel: gospelEn,
      epistle: epistleEn,
      old_testament: oldTestamentEn,
      thumbnail_id: thumbnailId,
      youtube_video_id: youtubeId,
      date: dateInputConverter(date)
    };

   
    let WorshipOfficeBG = {
        title: titleBg,
        gospel: gospelBg,
        epistle: epistleBg,
        old_testament: oldTestamentBg,
        thumbnail_id: thumbnailId,
        youtube_video_id: youtubeId,
        date: dateInputConverter(date)
    };

    if(thumbnailIdBg){
      WorshipOfficeBG = {
        ...WorshipOfficeBG,
        thumbnail_id: thumbnailIdBg
      }
    }
    
    const uploadWorshipOffice = async () => {
      try {
        const enResponse = await axios.post(
          `${API_URL}${worshipOfficeSlug}/en`,
          WorshipOfficeEN
        );
        const WorshipOfficeBGUpdated = {
          ...WorshipOfficeBG,
          en_id: enResponse.data.new_entry.id,
        };
        await axios.post(
          `${API_URL}${worshipOfficeSlug}/bg`,
          WorshipOfficeBGUpdated
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
    uploadWorshipOffice();
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
      <form onSubmit={onSubmit} className="worship-office">
        <h1 className="worship-office__title">Add New Worship Office Entry</h1>
        <div className="worship-office__top">
            <DateInput date={date} setDate={setDate}/>
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


        
        <div className="worship-office__bottom">
        <input
          className="worship-office__button"
          type="submit"
          value="Save "
        />
      </div>
      </form>
    </>
  );
}

export default AddNewWorshipOffice;
