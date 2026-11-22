import DOMPurify from "dompurify";
import { useState } from "react";
import VideoIcon from "../../../assets/svg/VideoIcon/VideoIcon";
import { createMarkup } from "../../../utilities/createMarkup";
import { getCommunityNewsImageAlt } from "../getCommunityNewsImageAlt";
import { getCommunityNewsMedia } from "../getCommunityNewsMedia";
import "../CommunityNewsHomePreview/CommunityNewsHomePreview.scss";

const labels = {
  en: {
    defaultAuthor: "Holy Trinity Parish",
  },
  bg: {
    defaultAuthor: "Храм „Света Троица“",
  },
};

const EXCERPT_LENGTH = 120;

const formatDate = (value, language) => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat(language === "bg" ? "bg-BG" : "en-CA", {
    dateStyle: "long",
  }).format(date);
};

function CommunityNewsPostDisplay({ post, language = "en", excerpt = false }) {
  const [playingVideoId, setPlayingVideoId] = useState(null);
  const title = post[`title_${language}`]?.trim();
  const body = post[`body_${language}`] || "";
  const plainBody = DOMPurify.sanitize(body, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
  }).trim();
  const hasBody = Boolean(plainBody);
  const allMedia = getCommunityNewsMedia(post);
  const media = excerpt ? allMedia.slice(0, 1) : allMedia;
  const mediaRemainder = media.length % 3;
  const images = allMedia.filter((item) => item.type === "image");
  const copy = labels[language];
  const visibleBody =
    excerpt && plainBody.length > EXCERPT_LENGTH
      ? `${plainBody.slice(0, EXCERPT_LENGTH).trimEnd()}…`
      : plainBody;

  return (
    <article className="community-home-preview__card" lang={language}>
      <div className="community-home-preview__content">
        {title && <h3>{title}</h3>}
      </div>
      <div className="community-home-preview__details">
        <p className="community-home-preview__meta">
          {formatDate(post.publish_date, language) && (
            <time dateTime={post.publish_date}>
              {formatDate(post.publish_date, language)}
            </time>
          )}
        </p>
        <p className="community-home-preview__meta">
          {post.author?.trim() || copy.defaultAuthor}
        </p>
      </div>
      {(hasBody || media.length > 0) && (
        <div
          className={`community-home-preview__post-layout${
            hasBody && media.length > 0
              ? " community-home-preview__post-layout--with-text"
              : ""
          }`}
        >
          {hasBody && (
            <div className="community-home-preview__body">
              {excerpt ? (
                <p>{visibleBody}</p>
              ) : (
                <div dangerouslySetInnerHTML={createMarkup(body)} />
              )}
            </div>
          )}
          {media.length > 0 && (
            <div
              className={`community-home-preview__images community-home-preview__images--remainder-${mediaRemainder}${excerpt ? " community-home-preview__images--excerpt" : ""}`}
              aria-label={media.some((item) => item.type === "video") ? "Post media" : "Post images"}
              tabIndex={0}
            >
              {media.map((item) => {
                const imageIndex = images.findIndex(
                  (image) => image.client_id === item.client_id,
                );
                const comment = item[`comment_${language}`]?.trim();

                return (
                  <figure
                    className="community-home-preview__figure"
                    key={item.client_id}
                  >
                    {item.type === "video" ? (
                      playingVideoId === item.client_id ? (
                        <iframe
                          className="community-home-preview__video-embed"
                          src={`https://www.youtube.com/embed/${item.youtube_video_id}?rel=0&autoplay=1`}
                          title={`${title || "YouTube video"} player`}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                        />
                      ) : (
                        <button
                          className="community-home-preview__video-thumbnail"
                          type="button"
                          onClick={() => setPlayingVideoId(item.client_id)}
                          aria-label={`Play video: ${title || item.youtube_video_id}`}
                        >
                          <img
                            className="community-home-preview__image"
                            src={`https://img.youtube.com/vi/${item.youtube_video_id}/maxresdefault.jpg`}
                            alt=""
                          />
                          <VideoIcon aria-hidden="true" />
                        </button>
                      )
                    ) : (
                      <img
                        className="community-home-preview__image"
                        src={item.url}
                        alt={getCommunityNewsImageAlt(
                          { ...post, images },
                          imageIndex,
                          language,
                        )}
                      />
                    )}
                    <figcaption aria-hidden={!comment}>{comment}</figcaption>
                  </figure>
                );
              })}
            </div>
          )}
        </div>
      )}
    </article>
  );
}

export default CommunityNewsPostDisplay;
