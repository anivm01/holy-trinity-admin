import React, { useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../../utilities/api";
import { createMarkup } from "../../utilities/createMarkup";
import DeleteButton from "../DeleteButton/DeleteButton";
import DeleteModal from "../DeleteModal/DeleteModal";
import SavedImage from "../SavedImage/SavedImage";
import "./SingleArticle.scss";

function SingleArticle({article}) {
    const [deleteVisible, setDeleteVisible] = useState(false);

  return (
    <>
    {deleteVisible && (
        <DeleteModal
          setVisible={setDeleteVisible}
          url={`${API_URL}/article/en/${article.id}`}
        />
      )}
    <div className="single-article">
    <DeleteButton setDeleteVisible={setDeleteVisible} />
      <Link to={`${article.id}`} className="single-article__link">
        <div className="single-article__left">
        <SavedImage url={`${API_URL}/featured-image/en/${article.id}`} />
        </div>
        <div className="single-article__text">
          <h2 className="single-article__title">{article.title ? article.title : "No Title"}</h2>
          {article.content.length > 0 && <div
          className="single-article__content"
          dangerouslySetInnerHTML={createMarkup(article.content)}
        ></div>}
        {article.content.length < 8 && <p className="single-article__content">No content</p>}
        </div>
      </Link>
    </div>
    </>
  );
}

export default SingleArticle;
