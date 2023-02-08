import { useState } from "react";
import ImageUpload from "../ImageUpload/ImageUpload";
import OneLineInput from "../OneLineInput/OneLineInput";
import "./AddNewWorshipOffice.scss";
import plus from "../../assets/plus.svg";
import ImagePreview from "../ImagePreview/ImagePreview";
import AddImage from "../AddImage/AddImage";
import DateInput from "../DateInput/DateInput";
import Wysiwyg from "../Wysiwyg/Wysiwyg";

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
  const [newTestamentEn, setNewTestamentEn] = useState("");
  const [newTestamentBg, setNewTestamentBg] = useState("");

  const [imageUploadVisible, setImageUploadVisible] = useState(false);

  return (
    <>
      {imageUploadVisible && (
        <ImageUpload
          setImageId={setThumbnailId}
          setVisible={setImageUploadVisible}
        />
      )}
      <form className="worship-office">
        <h1 className="worship-office__title">Add a New Worship Office Entry</h1>
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
                <Wysiwyg
                    editorLabel="Enter relevant Gospel reading:"
                    setContent={setGospelEn}
                />
                <Wysiwyg
                    editorLabel="Enter relevant Epsitle reading:"
                    setContent={setEpistleEn}
                />
                <Wysiwyg
                    editorLabel="Enter relevant reading from the New Testament:"
                    setContent={setNewTestamentEn}
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
                    editorLabel="Въведете подходящото четиво от Новия завет"
                    setContent={setNewTestamentBg}
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

export default AddNewWorshipOffice;
