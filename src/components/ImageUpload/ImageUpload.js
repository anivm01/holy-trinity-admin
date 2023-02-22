import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../../utilities/api";
import "./ImageUpload.scss";
import close from "../../assets/close.svg";
import { ThreeDots } from "react-loader-spinner";
import Masonry from "react-responsive-masonry";
import NewImageForm from "../NewImageForm/NewImageForm";

function ImageUpload({ setImageId, setVisible }) {
  const [images, setImages] = useState([]);
  const [chosenId, setChosenId] = useState("");

  const getImages = async () => {
    try {
      const response = await axios.get(`${API_URL}/images/en`);
      const sortedArray = response.data.sort((a, b) => {
        return b.id - a.id;
      });
      setImages(sortedArray);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getImages();
  }, []);

  const chooseImage = (id) => {
    setImageId(id);
    setChosenId(id);
  };
  console.log(images);

  return (
    <div className="image-upload">
      <div className="image-upload__modal">
        <img
          onClick={() => {
            setVisible(false);
          }}
          className="image-upload__close"
          src={close}
          alt="close icon"
        />
        <span>Upload a new image</span>
        <NewImageForm setImageId={setImageId} setVisible={setVisible} />
        <span>Or choose a previously uploaded image</span>
        {images.length === 0 ? (
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
        ) : (
          <div className="image-upload__bottom">
            <div className="image-upload__saved">
              <Masonry columnsCount={4} gutter="1rem">
                {images.map((image) => {
                  return (
                    <div
                      onClick={() => {
                        chooseImage(image.id);
                      }}
                      className="image-upload__choice"
                      key={image.id}
                    >
                      <img
                        className={
                          image.id === chosenId
                            ? "image-upload__single chosen"
                            : "image-upload__single"
                        }
                        src={`http://localhost:8080${image.url}`}
                        alt={image.description}
                      />
                    </div>
                  );
                })}
              </Masonry>
            </div>
            <button
              type="button"
              className="image-upload__submit"
              onClick={() => {
                setVisible(false);
              }}
            >
              OK
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ImageUpload;
