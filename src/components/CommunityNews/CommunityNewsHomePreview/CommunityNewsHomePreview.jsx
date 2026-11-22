import DOMPurify from "dompurify";
import { useState } from "react";
import { getCommunityNewsMedia } from "../getCommunityNewsMedia";
import CommunityNewsPostDisplay from "../CommunityNewsPostDisplay/CommunityNewsPostDisplay";
import "./CommunityNewsHomePreview.scss";

function CommunityNewsHomePreview({ post }) {
  const [language, setLanguage] = useState("en");
  const title = post[`title_${language}`]?.trim();
  const body = post[`body_${language}`] || "";
  const hasBody = DOMPurify.sanitize(body, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
  }).trim();
  const media = getCommunityNewsMedia(post);
  const hasPreviewContent = title || hasBody || media.length > 0;

  return (
    <section
      className="community-home-preview"
      aria-labelledby="community-home-preview-title"
    >
      <header className="community-home-preview__header">
        <div>
          <p className="community-home-preview__eyebrow">Live preview</p>
          <h2 id="community-home-preview-title">Home page preview</h2>
          <p>
            Shows how this post will appear in the latest community news area.
          </p>
        </div>
        <div
          className="community-home-preview__languages"
          role="group"
          aria-label="Preview language"
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
      </header>

      <div className="community-home-preview__stage">
        {hasPreviewContent ? (
          <CommunityNewsPostDisplay post={post} language={language} />
        ) : (
          <div className="community-home-preview__empty">
            Add a title, text, image, or video to begin the live preview.
          </div>
        )}
      </div>
    </section>
  );
}

export default CommunityNewsHomePreview;
