import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import { API_URL } from "../../../utilities/api";
import useFetch from "../../../utilities/useFetch";
import plus from "../../../assets/plus.svg";
import "./ObituaryImageSelector.scss";

function ImageLibrary({ currentUrl, onChoose }) {
  const { data, error, loading } = useFetch(`${API_URL}/assets/images`);

  if (loading) {
    return (
      <div className="obituary-image-selector__library-status">
        <ThreeDots
          height="50"
          width="50"
          radius="9"
          color="#6F0B20"
          ariaLabel="Loading saved images"
          visible
        />
      </div>
    );
  }

  if (error) {
    return (
      <p className="obituary-image-selector__library-status" role="alert">
        The saved images could not be loaded.
      </p>
    );
  }

  const images = data?.data || [];

  if (!images.length) {
    return (
      <p className="obituary-image-selector__library-status">
        No saved images were found.
      </p>
    );
  }

  return (
    <div className="obituary-image-selector__library">
      {images.map((image) => (
        <button
          className={`obituary-image-selector__library-item${
            image.url === currentUrl
              ? " obituary-image-selector__library-item--selected"
              : ""
          }`}
          key={image.id}
          type="button"
          onClick={() => onChoose(image.url)}
          aria-pressed={image.url === currentUrl}
        >
          <img
            src={image.url}
            alt={image.caption || image.fileName}
            loading="lazy"
          />
          <span>{image.caption || "No caption"}</span>
        </button>
      ))}
    </div>
  );
}

function ObituaryImageSelector({ idPrefix, imageUrl, imageAlt, onSelect }) {
  const [showLibrary, setShowLibrary] = useState(false);
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const fileInput = useRef(null);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files?.[0];

    setErrorMessage("");
    setStatusMessage("");

    if (!selectedFile) {
      setFile(null);
      setPreviewUrl("");
      return;
    }

    if (!selectedFile.type.startsWith("image/")) {
      setFile(null);
      setPreviewUrl("");
      setErrorMessage("Choose an image file to upload.");
      return;
    }

    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));
  };

  const uploadImage = async () => {
    if (!file) {
      setErrorMessage("Choose an image before uploading.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("caption", caption);
    const token = sessionStorage.getItem("authToken");

    try {
      setUploading(true);
      setErrorMessage("");
      setStatusMessage("");

      const response = await axios.post(`${API_URL}/assets/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      const uploadedImage = response.data?.upload?.[0];

      if (!uploadedImage?.url) {
        throw new Error("The upload response did not include an image URL.");
      }

      onSelect(uploadedImage.url);
      setFile(null);
      setPreviewUrl("");
      setCaption("");
      if (fileInput.current) {
        fileInput.current.value = "";
      }
      setStatusMessage(
        "The image was uploaded and selected. Save the obituary to apply it.",
      );
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message ||
          error.message ||
          "The image could not be uploaded.",
      );
    } finally {
      setUploading(false);
    }
  };

  const chooseExistingImage = (url) => {
    onSelect(url);
    setFile(null);
    setPreviewUrl("");
    setCaption("");
    if (fileInput.current) {
      fileInput.current.value = "";
    }
    setShowLibrary(false);
    setErrorMessage("");
    setStatusMessage("Image selected. Save the obituary to apply it.");
  };

  const displayedImage = previewUrl || imageUrl || plus;
  const previewLabel = previewUrl
    ? "New image preview"
    : imageUrl
      ? "Change the image"
      : "Choose an image";

  return (
    <section className="obituary-image-selector">
      <h3 className="obituary-image-selector__heading">Obituary image</h3>

      <div className="obituary-image-selector__uploader">
        <div className="obituary-image-selector__preview-column">
          <label
            className="obituary-image-selector__preview-box"
            htmlFor={`${idPrefix}-obituary-image-upload`}
          >
            <img
              className="obituary-image-selector__preview"
              src={displayedImage}
              alt={previewUrl ? "New obituary upload preview" : imageAlt}
            />
            <span>{previewLabel}</span>
          </label>
          <input
            ref={fileInput}
            className="obituary-image-selector__file-input"
            id={`${idPrefix}-obituary-image-upload`}
            type="file"
            accept="image/png,image/jpeg,image/gif,image/webp"
            onChange={handleFileChange}
          />
        </div>

        <div className="obituary-image-selector__controls">
          <p className="obituary-image-selector__instructions">
            Click the image to upload a new one, or choose one from the saved
            image gallery.
          </p>
          {file && (
            <p className="obituary-image-selector__file-name">
              Selected: {file.name}
            </p>
          )}

          <label htmlFor={`${idPrefix}-obituary-image-caption`}>
            Image caption (optional)
          </label>
          <input
            className="obituary-image-selector__caption"
            id={`${idPrefix}-obituary-image-caption`}
            type="text"
            value={caption}
            onChange={(event) => setCaption(event.target.value)}
          />

          <div className="obituary-image-selector__buttons">
            <button
              className="obituary-image-selector__button"
              type="button"
              onClick={uploadImage}
              disabled={!file || uploading}
            >
              {uploading ? "Uploading…" : "Upload and select"}
            </button>
            <button
              className="obituary-image-selector__button obituary-image-selector__button--secondary"
              type="button"
              onClick={() => setShowLibrary((isVisible) => !isVisible)}
            >
              {showLibrary ? "Close saved images" : "Choose a saved image"}
            </button>
          </div>

          {imageUrl && (
            <a href={imageUrl} target="_blank" rel="noreferrer">
              Open full image
            </a>
          )}

          {errorMessage && (
            <p
              className="obituary-image-selector__message obituary-image-selector__message--error"
              role="alert"
            >
              {errorMessage}
            </p>
          )}
          {statusMessage && (
            <p className="obituary-image-selector__message" role="status">
              {statusMessage}
            </p>
          )}
        </div>
      </div>

      {showLibrary && (
        <ImageLibrary currentUrl={imageUrl} onChoose={chooseExistingImage} />
      )}
    </section>
  );
}

export default ObituaryImageSelector;
