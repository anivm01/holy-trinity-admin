import { useState } from "react";
import eyeIcon from "../../../assets/eye-solid.svg";
import CommunityNewsPostDisplay from "../CommunityNewsPostDisplay/CommunityNewsPostDisplay";
import { getCommunityNewsMedia } from "../getCommunityNewsMedia";
import Button from "../../UI/Button/Button";
import ModifyButton from "../../UI/ModifyButton/ModifyButton";
import "./CommunityNewsPostCard.scss";

function CommunityNewsPostCard({
  post,
  onEdit = () => {},
  onDelete = () => {},
  onStatusChange = () => {},
}) {
  const [language, setLanguage] = useState("en");
  const [isFullView, setIsFullView] = useState(false);
  const media = getCommunityNewsMedia(post);
  const hasExpandableContent = Boolean(
    post.body_en?.trim() || post.body_bg?.trim() || media.length,
  );

  return (
    <article className="community-post-card">
      <div className="community-post-card__admin-toolbar">
        <div
          className="community-home-preview__languages"
          role="group"
          aria-label="Post display language"
        >
          <button
            type="button"
            onClick={() => setLanguage("en")}
            aria-pressed={language === "en"}
          >
            English
          </button>
          <button
            type="button"
            onClick={() => setLanguage("bg")}
            aria-pressed={language === "bg"}
          >
            Български
          </button>
        </div>

        <div className="community-post-card__actions">
          <Button
            type="button"
            className={`community-post-card__status community-post-card__status--${post.status}`}
            onClick={() => onStatusChange(post)}
            aria-label={`Change status from ${post.status} to ${post.status === "published" ? "draft" : "published"}`}
            title="Change post status"
            text={post.status === "published" ? "Published" : "Draft"}
            variant={post.status === "published" ? "primary" : "secondary"}
          />
          {hasExpandableContent && (
            <button
              className="modify-button community-post-card__preview-button"
              type="button"
              onClick={() => setIsFullView((isOpen) => !isOpen)}
              aria-expanded={isFullView}
              aria-label={isFullView ? "Hide full post preview" : "Preview full post"}
              title={isFullView ? "Hide full post preview" : "Preview full post"}
            >
              <img src={eyeIcon} alt="" aria-hidden="true" />
            </button>
          )}
          <ModifyButton
            onClick={() => onEdit(post)}
            hasText={false}
            type="edit"
          />
          <ModifyButton
            onClick={() => onDelete(post)}
            hasText={false}
            type="delete"
          />
        </div>
      </div>

      <CommunityNewsPostDisplay
        post={post}
        language={language}
        excerpt={!isFullView}
      />
    </article>
  );
}

export default CommunityNewsPostCard;
