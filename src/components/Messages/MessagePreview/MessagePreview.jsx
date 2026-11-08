import { useId, useState } from "react";
import { createMessageMarkup } from "../../../utilities/createMarkup";
import "./MessagePreview.scss";

const languageOptions = [
  { code: "en", label: "English", shortLabel: "EN" },
  { code: "bg", label: "Bulgarian", shortLabel: "BG" },
];

function MessagePreview({ entry }) {
  const [activeLanguage, setActiveLanguage] = useState("en");
  const titleId = useId();
  const title = entry[`title_${activeLanguage}`] || "";
  const message = entry[`message_${activeLanguage}`] || "";
  const feastName =
    entry[`associated_feast_name_${activeLanguage}`]?.trim() || "";
  const activeLanguageLabel = languageOptions.find(
    ({ code }) => code === activeLanguage,
  ).label;
  const introduction =
    activeLanguage === "bg"
      ? `Послание от отец Михайлов${
          feastName ? ` за празника ${feastName}` : ""
        }.`
      : `A message from Father Mihaylov${
          feastName ? ` for the feast of ${feastName}` : ""
        }.`;

  return (
    <section className="message-preview" aria-labelledby={titleId}>
      <div className="message-preview__header">
        <div>
          <h3 id={titleId}>Message Preview</h3>
          <p>Updates as you type</p>
        </div>
        <div
          className="message-preview__language-toggle"
          role="group"
          aria-label="Preview language"
        >
          {languageOptions.map(({ code, label, shortLabel }) => (
            <button
              type="button"
              key={code}
              aria-label={`Preview in ${label}`}
              aria-pressed={activeLanguage === code}
              onClick={() => setActiveLanguage(code)}
            >
              {shortLabel}
            </button>
          ))}
        </div>
      </div>

      <article className="message-preview__card" lang={activeLanguage}>
        <p className="message-preview__introduction">{introduction}</p>
        <div className="message-preview__body">
          <h2>{title.trim() || `${activeLanguageLabel} message title`}</h2>
          {message.trim() ? (
            <div
              className="message-preview__content"
              dangerouslySetInnerHTML={createMessageMarkup(message)}
            />
          ) : (
            <p className="message-preview__placeholder">
              The {activeLanguageLabel.toLowerCase()} message will appear here.
            </p>
          )}
        </div>
      </article>
    </section>
  );
}

export default MessagePreview;
