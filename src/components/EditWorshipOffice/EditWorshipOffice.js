import { useEffect, useState } from "react";
import ImageUpload from "../ImageUpload/ImageUpload";
import OneLineInput from "../OneLineInput/OneLineInput";
import "./EditWorshipOffice.scss"; 
import ImagePreview from "../ImagePreview/ImagePreview";
import AddImage from "../AddImage/AddImage";
import DateInput from "../DateInput/DateInput";
import Wysiwyg from "../Wysiwyg/Wysiwyg";
import { API_URL, worshipOfficeSlug } from "../../utilities/api";
import axios from "axios";
import { dateInputConverter, dateOutputConverter } from "../../utilities/dateConverter";
import ErrorModal from "../ErrorModal/ErrorModal";
import SuccessModal from "../SuccessModal/SuccessModal";
import { useParams } from "react-router-dom";
import WysiwygEdit from "../WysiwygEdit/WysiwygEdit";

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
  const [dataLoaded, setDataLoaded] = useState(false)

  const [imageUploadVisible, setImageUploadVisible] = useState(false);

  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const params = useParams()

  useEffect(()=>{
    const fetchContent = async () => {
        const enData = await axios.get(`${API_URL}${worshipOfficeSlug}/en/${params.id}`)
        setDate(dateOutputConverter(enData.data.date))
        setThumbnailId(enData.data.thumbnail_id)
        setYoutubeId(enData.data.youtube_video_id)
        setTitleEn(enData.data.title)
        setGospelEn(enData.data.gospel)
        setEpistleEn(enData.data.epistle)
        setOldTestamentEn(enData.data.old_testament)
        const bgData = await axios.get(`${API_URL}${worshipOfficeSlug}/bg/${params.id}`)
        setTitleBg(bgData.data.title)
        setGospelBg(bgData.data.gospel)
        setEpistleBg(bgData.data.epistle)
        setOldTestamentBg(bgData.data.old_testament)
        setDataLoaded(true)
    }
    fetchContent()
  },[params.id])

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
        "Make sure to add a date on which you want the announcement to be posted"
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

    const WorshipOfficeBG = {
        title: titleBg,
        gospel: gospelBg,
        epistle: epistleBg,
        old_testament: oldTestamentBg,
        thumbnail_id: thumbnailId,
        youtube_video_id: youtubeId,
        date: dateInputConverter(date)
    };
    
    const uploadWorshipOffice = async () => {
      try {
        await axios.put(
          `${API_URL}${worshipOfficeSlug}/en`,
          WorshipOfficeEN
        );
        
        await axios.put(
          `${API_URL}${worshipOfficeSlug}/bg`,
          WorshipOfficeBG
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

  if(!dataLoaded) {
    return <p>Loading</p>
  }


  return (
    <>
      {imageUploadVisible && (
        <ImageUpload
          setImageId={setThumbnailId}
          setVisible={setImageUploadVisible}
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
        <h1 className="worship-office__title">Edit Worship Office Entry</h1>
        <div className="worship-office__top">
            <DateInput date={date} setDate={setDate}/>
            <div className="worship-office__youtube">
            <OneLineInput
                label="Paste in the id of the youtube video you've created"
                oneLine={youtubeId}
                setOneLine={setYoutubeId}
            />
            {thumbnailId ? (
                <ImagePreview imageId={thumbnailId} setVisible={setImageUploadVisible} />
            ) : (
                <AddImage setImageUploadVisible={setImageUploadVisible} />
            )}
            </div>
        </div>
        <div className="worship-office__middle">
            <div className="worship-office__language">
            <h2 className="worship-office__subtitle">English</h2>
                <OneLineInput label="Enter the headline/title" oneLine={titleEn} setOneLine={setTitleEn} />
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
                <OneLineInput label="Въведете заглавието" oneLine={titleBg} setOneLine={setTitleBg} />
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


        
        <div className="worship-office__bottom">
        <input
          className="worship-office__submit"
          type="submit"
          value="Save "
        />
      </div>
      </form>
    </>
  );
}

export default EditWorshipOffice;
