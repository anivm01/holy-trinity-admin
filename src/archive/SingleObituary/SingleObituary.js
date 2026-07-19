import React from "react";
import "./SingleObituary.scss";
import cross from '../../assets/cross.svg'
import { Link } from "react-router-dom";
import { createMarkup } from "../../utilities/createMarkup";


function SingleObituary({obituary}) {
  return (
    <Link to={`${obituary.id}`} className="single-obituary">
      <img className="single-obituary__icon" src={cross} alt="cross" />
      <h2 className="single-obituary__title">{obituary.name ? obituary.name : "No Name" }</h2>
      <h2 className="single-obituary__title">{obituary.years}</h2>
      {obituary.obituary.length > 0 && <div
        className="single-obituary__content"
        dangerouslySetInnerHTML={createMarkup(obituary.obituary)}
      ></div>}
      {obituary.obituary.length < 8 && <p className="single-obituary__content">No Content</p>}
    </Link>
  );
}

export default SingleObituary;
