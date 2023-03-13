import React from "react";
import "./SavedImage.scss"
import { ThreeDots } from "react-loader-spinner";
import defaultImage from '../../assets/placeholder.svg'
import { API_URL } from "../../utilities/api";
import useFetch from "../../utilities/useFetch";
import ImagePreview from "../ImagePreview/ImagePreview";

function SavedImage({ url }) {
  const { data, loading, error } = useFetch(url);

  if (loading) {
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
  if(error) {
    return (
        <img className="placeholder" src={defaultImage} alt="placeholder"/>
    )
  }

  if(data) {
    return (
        <ImagePreview imageId={data.image_id}/>
      );
  }
  return (
    <img className="placeholder" src={defaultImage} alt="placeholder"/>
)


}

export default SavedImage;
