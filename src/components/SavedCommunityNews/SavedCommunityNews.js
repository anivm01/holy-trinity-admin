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


function SavedCommuityNews() {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();

  const getArticles = async () => {
    try {
      const response = await axios.get(`${API_URL}${communityNewsSlug}/en`);
      setArticles(sortNewestToOldest(response.data));
    } catch (error) {
      console.error(error);
    }
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete(`${API_URL}${communityNewsSlug}/en/${id}`);
      navigate(0);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getArticles();
  }, []);

  if (articles.length === 0) {
    return <ThreeDots 
    height="80" 
    width="80" 
    radius="9"
    color="#6F0B20" 
    ariaLabel="three-dots-loading"
    wrapperStyle={{justifyContent: "center"}}
    wrapperClassName=""
    visible={true}
     />
  }
  return (
    <div className="saved-community-news">
      {articles.map((single, index) => {
        return (
          <div className="saved-community-news__single" key={index}>
            <Link to={`${single.id}`} className="saved-community-news__link">
              <div className="saved-community-news__left">
                <ImagePreview imageId={single.featured_img_id} />
              </div>
              <div className="saved-community-news__text">
                <h2 className="saved-community-news__title">{single.title}</h2>
                <div
                  className="saved-community-news__content"
                  dangerouslySetInnerHTML={createMarkup(single.content)}
                ></div>
              </div>
            </Link>
            <button
              className="saved-community-news__delete"
              onClick={() => {
                deleteItem(single.id);
              }}
              type="button"
            >
              <img
                className="saved-community-news__icon"
                src={deleteIcon}
                alt="delete"
              />
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default SavedCommuityNews;
