import { useEffect, useState } from "react";
import ImageUpload from "../ImageUpload/ImageUpload";
import OneLineInput from "../OneLineInput/OneLineInput";
import "./EditObituary.scss"; 
import ImagePreview from "../ImagePreview/ImagePreview";
import AddImage from "../AddImage/AddImage";
import DateInput from "../DateInput/DateInput";
import Wysiwyg from "../Wysiwyg/Wysiwyg";
import { API_URL, communityNewsSlug, obituarySlug } from "../../utilities/api";
import axios from "axios";
import { dateInputConverter } from "../../utilities/dateConverter";
import ErrorModal from "../ErrorModal/ErrorModal";
import SuccessModal from "../SuccessModal/SuccessModal";
import WysiwygEdit from "../WysiwygEdit/WysiwygEdit";
import { useNavigate, useParams } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";

function EditObituary() {
  const [imageId, setImageId] = useState("");
  const [years, setYears] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [nameBg, setNameBg] = useState("");
  const [obituaryEn, setObituaryEn] = useState("");
  const [obituaryBg, setObituaryBg] = useState("");

  const [imageUploadVisible, setImageUploadVisible] = useState(false);
  const [imageReplaceVisible, setImageReplaceVisible] = useState(false);

  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const params = useParams()
  const [dataLoaded, setDataLoaded] = useState(false)
  const navigate = useNavigate()

  useEffect(()=>{
    const fetchContent = async () => {
        const enData = await axios.get(`${API_URL}${obituarySlug}/en/${params.id}`)
        setImageId(enData.data.image_id)
        setYears(enData.data.years)
        setNameEn(enData.data.name)
        setObituaryEn(enData.data.obituary)
        const bgData = await axios.get(`${API_URL}${obituarySlug}/bg/${params.id}`)
        setNameBg(bgData.data.name)
        setObituaryBg(bgData.data.obituary)
        setDataLoaded(true)
    }
    fetchContent()
  },[params.id])

  const onSubmit = (e) => {
    e.preventDefault();

    if (
      !nameEn ||
      !nameBg ||
      !obituaryEn ||
      !obituaryBg ||
      !years
    ) {
      setUploadError(true);
      setErrorMessage(
        "Make sure that you have filled out all the fields in both English and Bulgarian. If you wish to return and edit the content later leave some default content such as 'TBD' or 'update coming soon'"
      );
      return;
    }
    if (!imageId){
        setUploadError(true);
        setErrorMessage(
            "Make sure to upload an image"
        );
        return;
    }

    const newObituaryEN = {
      name: nameEn,
      obituary: obituaryEn,
      years: years,
      image_id: imageId,
    };

    const newObituaryBG = {
        name: nameBg,
        obituary: obituaryBg,
        years: years,
        image_id: imageId,
    };

    const updateObituary = async () => {
      try {
        const enResponse = await axios.put(
          `${API_URL}${obituarySlug}/en/${params.id}`,
          newObituaryEN
        );
        await axios.put(
          `${API_URL}${obituarySlug}/bg/${params.id}`,
          newObituaryBG
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
    updateObituary();
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete(`${API_URL}${obituarySlug}/en/${id}`);
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };

  if(!dataLoaded) {
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


  return (
    <>
      {imageUploadVisible && (
        <ImageUpload
          setImageId={setImageId}
          setVisible={setImageUploadVisible}
        />
      )}
      {imageReplaceVisible && (
        <ImageUpload
          setImageId={setImageId}
          setVisible={setImageReplaceVisible}
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
      <form onSubmit={onSubmit} className="obituary">
        <h1 className="obituary__title">Edit Obituary</h1>
        <div className="obituary__top">
            {imageId ? (
              <div className="obituary__image-preview">
                <div className="obituary__container">
                  <ImagePreview imageId={imageId} setVisible={setImageUploadVisible} />
                </div>
                <button
                  type="button"
                  className="obituary__button"
                  onClick={() => setImageReplaceVisible(true)}
                >
                  Replace
                </button>
              </div>
            ) : (
                <AddImage setImageUploadVisible={setImageUploadVisible} />
            )}
            <OneLineInput label="Enter the years of birth and death" oneLine={years} setOneLine={setYears} />
        </div>
        <div className="obituary__middle">
            <div className="obituary__language">
            <h2 className="obituary__subtitle">English</h2>
                <OneLineInput label="Enter the name" oneLine={nameEn} setOneLine={setNameEn} />
                <WysiwygEdit
                    editorLabel="Enter the main content:"
                    setContent={setObituaryEn}
                    content={obituaryEn}
                />
            </div>
            <div className="obituary__language">
            <h2 className="obituary__subtitle">Български</h2>
                <OneLineInput label="Въведете името" oneLine={nameBg} setOneLine={setNameBg} />
                <WysiwygEdit
                    editorLabel="Въведете главното съдържание:"
                    setContent={setObituaryBg}
                    content={obituaryBg}
                />
            </div>
        </div>
        <div className="obituary__bottom">
        <input
          className="obituary__submit"
          type="submit"
          value="Save "
        />
        <button
              className="obituary__submit"
              onClick={() => {
                deleteItem(params.id);
              }}
              type="button"
            >
              Delete
            </button>
      </div>
      </form>
    </>
  );
}

export default EditObituary;
