import "./DeleteImageModal.scss";
import deleteIcon from "../../assets/delete.svg";
import { API_URL } from "../../utilities/api";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function DeleteImageModal({ imageId, setVisible }) {
  const navigate = useNavigate();

  const [postsList, setPostsList] = useState([]);

  const deleteItem = async (id) => {
    try {
      await axios.delete(`${API_URL}/images/en/${id}`);
      navigate(0);
    } catch (error) {
      console.log(error);
    }
  };

  const imageUsage = async () => {
    try {
      const response = await axios.get(`${API_URL}/posted-images/${imageId}`);

      const articlePostsBgIds = response.data.articles_bg.map(
        (single) => single.id
      );
      const articlePostsEnIds = response.data.articles_en.map(
        (single) => single.id
      );
      const articlePosts = [
        ...new Set([...articlePostsBgIds, ...articlePostsEnIds]),
      ];

      const obituaryPostsBgIds = response.data.obituaries_bg.map(
        (single) => single.id
      );
      const obituaryPostsEnIds = response.data.obituaries_en.map(
        (single) => single.id
      );
      const obituaryPosts = [
        ...new Set([...obituaryPostsBgIds, ...obituaryPostsEnIds]),
      ];

      const worshipOfficePostsBgIds = response.data.worship_offices_bg.map(
        (single) => single.id
      );
      const worshipOfficePostsEnIds = response.data.worship_offices_en.map(
        (single) => single.id
      );
      const worshipOfficePosts = [
        ...new Set([...worshipOfficePostsBgIds, ...worshipOfficePostsEnIds]),
      ];

      const communityNewsPosts = [];

      if (articlePosts.length !== 0) {
        for (let i = 0; i < articlePosts.length; i++) {
          communityNewsPosts.push(`/community-news/${articlePosts[i]}`);
        }
      }

      if (obituaryPosts.length !== 0) {
        for (let i = 0; i < obituaryPosts.length; i++) {
          communityNewsPosts.push(`/obituaries/${obituaryPosts[i]}`);
        }
      }

      if (worshipOfficePosts.length !== 0) {
        for (let i = 0; i < worshipOfficePosts.length; i++) {
          communityNewsPosts.push(`/worship-offices/${worshipOfficePosts[i]}`);
        }
      }

      setPostsList(...postsList, communityNewsPosts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    imageUsage();
  }, []);

  console.log(postsList);

  return (
    <div className="delete-message">
      <div className="delete-message__box">
        <img
          className="delete-message__icon"
          src={deleteIcon}
          alt="delete icon"
        />
        <h2 className="delete-message__title">
          This image is being used in {postsList.length} post(s).
        </h2>
        {postsList.length !== 0 ? (
          <div>
            <p className="delete-message__message">
              You can replace the image by clicking on the link(s) below to go
              to the edit page.
            </p>
            <ul className="delete-message__list">
              {postsList.map((single, index) => {
                return (
                  <li className="delete-message__item" key={index}>
                    <Link className="delete-message__link" to={single}>
                      Post #{index + 1}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : (
          <p className="delete-message__message">
            It is safe to delete this image without affecting any other content.
          </p>
        )}
        <div className="delete-message__confirmation">
          <h2 className="delete-message__title">
            Are you sure you want to delete this image?
          </h2>
          <button
            onClick={() => {
              deleteItem(imageId);
            }}
            className="delete-message__button"
          >
            Delete
          </button>
          <button
            onClick={() => {
              setVisible(false);
            }}
            className="delete-message__button"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteImageModal;
