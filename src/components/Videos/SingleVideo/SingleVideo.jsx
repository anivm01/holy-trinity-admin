import "./SingleVideo.scss";
import React, { useState } from "react";
import LinkWithIcon from "../../UI/LinkWithIcon/LinkWithIcon";
import EditVideo from "../EditVideo/EditVideo";
import DeleteVideo from "../DeleteVideo/DeleteVideo";
import { createMarkup } from "../../../utilities/createMarkup";
import Button from "../../UI/Button/Button";

function SingleVideo({ single }) {
  const [commentaryVisible, setCommentaryVisible] = useState(false);
  return (
    <div className="single-video" key={single.id}>
      <div className="single-video__main">
        <img
          className="single-video__image"
          src={`https://img.youtube.com/vi/${single.youtube_video_id}/maxresdefault.jpg`}
          alt={single.title}
        />
        <div className="single-video__content">
          <h3>{single.title}</h3>
          <LinkWithIcon
            text="Youtube Link"
            href={`https://www.youtube.com/watch?v=${single.youtube_video_id}`}
            className
          />
        </div>
        <div className="single-video__buttons">
          <EditVideo single={single} />
          <DeleteVideo id={single.id} />
        </div>
      </div>
      {single.commentary && (
        <div>
          <Button
            type="button"
            onClick={() => setCommentaryVisible((prev) => !prev)}
            text={commentaryVisible ? "Hide Commentary" : "Show Commentary"}
          />
        </div>
      )}
      {commentaryVisible && (
        <div
          className="single-video__commentary"
          dangerouslySetInnerHTML={createMarkup(single.commentary)}
        ></div>
      )}
    </div>
  );
}

export default SingleVideo;
