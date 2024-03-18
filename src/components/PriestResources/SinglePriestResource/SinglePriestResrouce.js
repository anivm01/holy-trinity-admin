import React from "react";
import "./SinglePriestResource.scss";
import { Link } from "react-router-dom";
import EditPriestResource from "../EditPriestResource/EditPriestResource";
import DeletePriestResource from "../DeletePriestResource/DeletePriestResource";


function SinglePriestResource({ resource }) {

    return (
        <div className="single-priest-resource">
            <div className="single-priest-resource__container">
                <Link className="single-priest-resource__title-link" to={resource.link} target="_blank" rel="noopener noreferrer">
                    <h4 className="single-priest-resource__title">{resource.title}</h4>
                </Link>
                <p className="single-priest-resource__description">{resource.description}</p>
                {/* <Link className="single-priest-resource__link" to={resource.link} target="_blank" rel="noopener noreferrer">Learn More</Link> */}
            </div>
            <div className="single-priest-resource__change">
                <EditPriestResource single={resource} />
                <DeletePriestResource id={resource.id} />
            </div>
        </div>
    );
}

export default SinglePriestResource;
