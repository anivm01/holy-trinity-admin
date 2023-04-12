import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL, communityNewsSlug } from "../../utilities/api";
import { createMarkup } from "../../utilities/createMarkup";
import { sortNewestToOldest } from "../../utilities/sort";
import ImagePreview from "../ImagePreview/ImagePreview";
import "./SavedCommunityNews.scss";
import deleteIcon from "../../assets/delete.svg";
import { ThreeDots } from "react-loader-spinner";
import DeleteModal from "../DeleteModal/DeleteModal";
import SingleArticle from "../SingleArticle/SingleArticle";
import useFetch from "../../utilities/useFetch";
import NoData from "../NoData/NoData";


function SavedCommuityNews({url}) {

  const { data, error, loading } = useFetch(
    url
  );
 
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
  if (error) {
    return <NoData/>;
  }
  if (data) {
    return (
      <div className="saved-community-news">
      {data.map((single, index) => {
        return (
          <SingleArticle key={index} article={single} />
        );
      })}
    </div>
    );
  }
  return (
    <NoData/>
  )

  
}

export default SavedCommuityNews;
