import { useEffect, useState } from "react";
import ImageUpload from "../ImageUpload/ImageUpload";
import OneLineInput from "../OneLineInput/OneLineInput";
import "./EditObituary.scss";
import ImagePreview from "../ImagePreview/ImagePreview";
import AddImage from "../AddImage/AddImage";
import { API_URL, obituarySlug } from "../../utilities/api";
import axios from "axios";
import ErrorModal from "../ErrorModal/ErrorModal";
import SuccessModal from "../SuccessModal/SuccessModal";
import WysiwygEdit from "../WysiwygEdit/WysiwygEdit";
import { useNavigate, useParams } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import DeleteModal from "../DeleteModal/DeleteModal";
import { dateInputConverter, dateOutputConverter } from "../../utilities/dateConverter";
import DateInput from "../DateInput/DateInput";
import { updateItem } from "../../utilities/send";
import BgVersionConfirmation from "../BgVersionConfirmation/BgVersionConfirmation";

function EditObituary() {
  const [imageId, setImageId] = useState("");
  const [years, setYears] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [nameBg, setNameBg] = useState("");
  const [obituaryEn, setObituaryEn] = useState("");
  const [obituaryBg, setObituaryBg] = useState("");
  const [date, setDate] = useState("");
  const [bgVersion, setBgVersion] = useState("yes");
  const [isDraft, setIsDraft] = useState(true);

  const [dataLoaded, setDataLoaded] = useState(false);

  const [imageUploadVisible, setImageUploadVisible] = useState(false);
  const [imageReplaceVisible, setImageReplaceVisible] = useState(false);

  //states responsible for the option to add a different image on the bulgarian version of the site
  const [imageIdBg, setImageIdBg] = useState("");
  const [imageUploadVisibleBg, setImageUploadVisibleBg] = useState(false);
  const [imageReplaceVisibleBg, setImageReplaceVisibleBg] = useState(false);

  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  //delete associated states
  const [deleteVisible, setDeleteVisible] = useState(false)
  const [deleteId, setDeleteId] = useState("")

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContent = async () => {
      const enData = await axios.get(
        `${API_URL}${obituarySlug}/en/${params.id}`
      );
      setImageId(enData.data.image_id);
      setYears(enData.data.years);
      setNameEn(enData.data.name);
      setObituaryEn(enData.data.obituary);
      setDate(dateOutputConverter(enData.data.date))
      setIsDraft(enData.data.is_draft)
      const bgData = await axios.get(
        `${API_URL}${obituarySlug}/bg/${params.id}`
      );
      setNameBg(bgData.data.name);
      setObituaryBg(bgData.data.obituary);
      setBgVersion(bgData.data.bg_version ? "yes" : "no");
      setDataLoaded(true);

      if (enData.data.image_id !== bgData.data.image_id) {
        setImageIdBg(bgData.data.image_id);
      }
    };
    fetchContent();
  }, [params.id]);

  const createPosts = (draft) => {
    const newObituaryEN = {
      name: nameEn,
      obituary: obituaryEn,
      years: years,
      date: dateInputConverter(date),
      image_id: imageId,
      is_draft: draft
    };

    let newObituaryBG = {
      name: nameBg,
      obituary: obituaryBg,
      years: years,
      date: dateInputConverter(date),
      image_id: imageId,
      bg_version: bgVersion === "yes" ? true : false
    };

    if (imageIdBg) {
      newObituaryBG = {
        ...newObituaryBG,
        image_id: imageIdBg,
      };
    }
    return { en: newObituaryEN, bg: newObituaryBG };
  };

  const onSave = (e) => {
    e.preventDefault();

    //save draft
    const posts = createPosts(true);
    const response = updateItem(posts, `${API_URL}/obituary`, params.id);
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
    if (!nameEn || obituaryEn.length < 8 || !years) {
      setUploadError(true);
      setErrorMessage(
        "Make sure to provide the date of the event, the event title, and the event description before publishing this item to the public. If you wish to return and edit the content later click the Save as Draft button above"
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
    if (!imageId) {
      setUploadError(true);
      setErrorMessage("Make sure to upload an image before publishing this item.");
      return;
    }
    if (bgVersion === "yes" && !nameBg && obituaryBg.length < 8) {
      setUploadError(true);
      setErrorMessage(
        "You've requested to make the Bulgarian version of this item public but no Bulgarian translations have been provided. Please fill out correct fields in Bulgarian or choose the option not to display the Bulgarian version."
      );
      return;
    }
    if (bgVersion === "yes" && !nameBg) {
      setUploadError(true);
      setErrorMessage(
        "You've requested to make the Bulgarian version of this item public but there is no Bulgarian title. Please fill out the title in Bulgarian or choose the option not to display the Bulgarian version."
      );
      return;
    }
    if (bgVersion === "yes" && obituaryBg.length < 8) {
      setUploadError(true);
      setErrorMessage(
        "You've requested to make the Bulgarian version of this item public but the obituary content is empty. Please fill out the obituary content in Bulgarian or choose the option not to display the Bulgarian version."
      );
      return;
    }

    //publish
    const posts = createPosts(false);
    const response = updateItem(posts, `${API_URL}/obituary`, params.id);
    setUploadSuccess(response);
    if (response === false) {
      setUploadError(true);
      setErrorMessage(
        "There was a problem with the connection. Try again later."
      );
    }
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete(`${API_URL}${obituarySlug}/en/${id}`);
      navigate(-1);
    } catch (error) {
      console.log(error);
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
      {imageUploadVisibleBg && (
        <ImageUpload
          setImageId={setImageIdBg}
          setVisible={setImageUploadVisibleBg}
        />
      )}
      {imageReplaceVisibleBg && (
        <ImageUpload
          setImageId={setImageIdBg}
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
      {deleteVisible && <DeleteModal imageId={deleteId} setVisible={setDeleteVisible} deleteFunction={deleteItem}/>}
      <form className="obituary">
        <h1 className="obituary__title">Edit Obituary</h1>
        {isDraft ? (
          <p>This item is currently saved as a draft</p>
        ) : (
          <p>This item is published to the live site.</p>
        )}
        <div className="obituary__top">
          {imageId ? (
            <div className="obituary__images">
              <div className="obituary__image-preview">
                <ImagePreview
                  imageId={imageId}
                  setVisible={setImageUploadVisible}
                />
                <button
                  type="button"
                  className="obituary__button"
                  onClick={() => setImageReplaceVisible(true)}
                >
                  Replace
                </button>
                {!imageIdBg && (
                  <button
                    type="button"
                    className="obituary__special-button"
                    onClick={() => {
                      setImageReplaceVisibleBg(true);
                    }}
                  >
                    Special BG Image
                  </button>
                )}
              </div>
              {imageIdBg && (
                <div className="obituary__image-preview">
                  <ImagePreview
                    imageId={imageIdBg}
                    setVisible={setImageUploadVisibleBg}
                  />
                  <button
                    type="button"
                    className="obituary__button"
                    onClick={() => setImageReplaceVisibleBg(true)}
                  >
                    Replace
                  </button>
                  <button
                    type="button"
                    className="obituary__special-button"
                    onClick={() => {
                      setImageIdBg("");
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
          <OneLineInput
            label="Enter the years of birth and death"
            oneLine={years}
            setOneLine={setYears}
          />
        </div>
        <div className="obituary__middle">
          <div className="obituary__language">
            <h2 className="obituary__subtitle">English</h2>
            <OneLineInput
              label="Enter the name"
              oneLine={nameEn}
              setOneLine={setNameEn}
            />
            <WysiwygEdit
              editorLabel="Enter the main content:"
              setContent={setObituaryEn}
              content={obituaryEn}
            />
          </div>
          <div className="obituary__language">
            <h2 className="obituary__subtitle">Български</h2>
            <OneLineInput
              label="Въведете името"
              oneLine={nameBg}
              setOneLine={setNameBg}
            />
            <WysiwygEdit
              editorLabel="Въведете главното съдържание:"
              setContent={setObituaryBg}
              content={obituaryBg}
            />
          </div>
        </div>
        <input
          className="obituary__submit"
          type="submit"
          value={isDraft ? "Update Draft" : "Revert to Draft and Save Changes"}
          onClick={onSave}
        />
        <DateInput date={date} setDate={setDate}/>
        <BgVersionConfirmation
          bgVersion={bgVersion}
          setBgVersion={setBgVersion}
        />
        <div className="obituary__bottom">
          <input
            className="obituary__submit"
            type="submit"
            value={isDraft ? "Publish" : "Update Live Content"}
            onClick={onPublish}
          />
          <button
            className="obituary__submit"
            onClick={() => {
              setDeleteId(params.id)
                  setDeleteVisible(true)
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
