import { useEffect, useState } from "react";
import { API_URL } from "../../utilities/api";
import "./ImagePreview.scss";
import axios from "axios";

function ImagePreview( { imageId } ) {
  const [imageData, setImageData] = useState(null);

  useEffect(() => {
    try {
      const getImageData = async () => {
        const response = await axios.get(`${API_URL}/images/en/${imageId}`);
        setImageData(response.data);
      };
      getImageData();
    } catch (error) {
      console.error(error);
    }
  }, [imageId]);

  if (!imageData) {
    return <p>Loading</p>;
  }

  return (
      <img
        className="image-preview"
        src={`${API_URL}${imageData.url}`}
        alt={imageData.description}
      />
  );
}

export default ImagePreview;
