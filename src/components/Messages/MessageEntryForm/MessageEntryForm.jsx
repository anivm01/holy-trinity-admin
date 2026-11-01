import { useState } from "react";
import Wysiwyg from "../../UI/Wysiwyg/Wysiwyg";
import "./MessageEntryForm.scss";

const getTagLanguage = (tag) =>
  tag.language || (/\p{Script=Cyrillic}/u.test(tag.label) ? "bg" : "en");

function MessageEntryForm({
  formType,
  formTitle,
  entry,
  setEntry,
  onPublish,
  associatedFeasts = [],
  messageTags = [],
  onAddTag,
  submitLabel = "Save",
  showHeading = true,
  isSubmitting = false,
}) {
  const [tagLanguageBeingAdded, setTagLanguageBeingAdded] = useState(null);
  const [newTagLabel, setNewTagLabel] = useState("");
  const hasFeastName =
    entry.associated_feast_name_en.trim() ||
    entry.associated_feast_name_bg.trim();
  const hasCustomFeast =
    hasFeastName &&
    !associatedFeasts.some(
      (feast) =>
        (entry.associated_feast_name_en.trim() &&
          feast.name_en.toLocaleLowerCase() ===
            entry.associated_feast_name_en.trim().toLocaleLowerCase()) ||
        (entry.associated_feast_name_bg.trim() &&
          feast.name_bg.toLocaleLowerCase() ===
            entry.associated_feast_name_bg.trim().toLocaleLowerCase()),
    );
  const tagGroups = [
    {
      language: "en",
      label: "English",
      tags: messageTags.filter((tag) => getTagLanguage(tag) === "en"),
    },
    {
      language: "bg",
      label: "Bulgarian",
      tags: messageTags.filter((tag) => getTagLanguage(tag) === "bg"),
    },
  ];

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setEntry((previousEntry) => ({
      ...previousEntry,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleTagChange = (event) => {
    const { value, checked } = event.target;

    setEntry((previousEntry) => ({
      ...previousEntry,
      tags: checked
        ? [...previousEntry.tags, value]
        : previousEntry.tags.filter((tag) => tag !== value),
    }));
  };

  const setMessageContent = (field) => (content) => {
    setEntry((previousEntry) => ({
      ...previousEntry,
      [field]: content,
    }));
  };

  const addTag = () => {
    const newTag = onAddTag(newTagLabel.trim(), tagLanguageBeingAdded);

    if (!newTag) {
      return;
    }

    setEntry((previousEntry) => ({
      ...previousEntry,
      tags: previousEntry.tags.includes(newTag.id)
        ? previousEntry.tags
        : [...previousEntry.tags, newTag.id],
    }));
    setNewTagLabel("");
    setTagLanguageBeingAdded(null);
  };

  const cancelAddTag = () => {
    setNewTagLabel("");
    setTagLanguageBeingAdded(null);
  };

  const handleNewTagKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addTag();
    }

    if (event.key === "Escape") {
      cancelAddTag();
    }
  };

  const handleFeastChange = (event) => {
    const { name, value } = event.target;
    const matchedFeast = associatedFeasts.find(
      (feast) => feast.name_en === value || feast.name_bg === value,
    );
    const isEnglishField = name === "associated_feast_name_en";

    setEntry((previousEntry) => ({
      ...previousEntry,
      associated_feast_name_en:
        matchedFeast?.name_en ||
        (isEnglishField
          ? value
          : previousEntry.associated_feast_name_en),
      associated_feast_name_bg:
        matchedFeast?.name_bg ||
        (!isEnglishField
          ? value
          : previousEntry.associated_feast_name_bg),
    }));
  };

  return (
    <form className="message-entry" onSubmit={onPublish}>
      {showHeading && (
        <h2 className="message-entry__heading">{formTitle}</h2>
      )}

      <div className="message-entry__translations">
        <section className="message-entry__column">
          <p className="message-entry__language">English</p>
          <label
            className="message-entry__field"
            htmlFor={`${formType}-message-title-en`}
          >
            Title
            <input
              id={`${formType}-message-title-en`}
              name="title_en"
              value={entry.title_en}
              onChange={handleChange}
              type="text"
            />
          </label>

          <label
            className="message-entry__field"
            htmlFor={`${formType}-message-feast-en`}
          >
            Associated Feast
            <input
              id={`${formType}-message-feast-en`}
              list={`${formType}-message-feasts-en`}
              name="associated_feast_name_en"
              value={entry.associated_feast_name_en}
              onChange={handleFeastChange}
              type="text"
            />
          </label>
          {hasCustomFeast && entry.associated_feast_name_en.trim() && (
            <p className="message-entry__new-feast-note" role="status">
              This associated feast is new and will be added when the message
              is saved.
            </p>
          )}

          <div className="message-entry__editor">
            <Wysiwyg
              editorLabel="Message"
              content={entry.message_en}
              setContent={setMessageContent("message_en")}
            />
          </div>
        </section>

        <section className="message-entry__column">
          <p className="message-entry__language">Bulgarian</p>
          <label
            className="message-entry__field"
            htmlFor={`${formType}-message-title-bg`}
          >
            Title
            <input
              id={`${formType}-message-title-bg`}
              name="title_bg"
              value={entry.title_bg}
              onChange={handleChange}
              type="text"
            />
          </label>

          <label
            className="message-entry__field"
            htmlFor={`${formType}-message-feast-bg`}
          >
            Associated Feast
            <input
              id={`${formType}-message-feast-bg`}
              list={`${formType}-message-feasts-bg`}
              name="associated_feast_name_bg"
              value={entry.associated_feast_name_bg}
              onChange={handleFeastChange}
              type="text"
            />
          </label>
          {hasCustomFeast &&
            !entry.associated_feast_name_en.trim() &&
            entry.associated_feast_name_bg.trim() && (
              <p className="message-entry__new-feast-note" role="status">
                This associated feast is new and will be added when the message
                is saved.
              </p>
            )}

          <div className="message-entry__editor">
            <Wysiwyg
              editorLabel="Message"
              content={entry.message_bg}
              setContent={setMessageContent("message_bg")}
            />
          </div>
        </section>
      </div>

      <datalist id={`${formType}-message-feasts-en`}>
        {associatedFeasts.map((feast) => (
          <option key={feast.id} value={feast.name_en} />
        ))}
      </datalist>
      <datalist id={`${formType}-message-feasts-bg`}>
        {associatedFeasts.map((feast) => (
          <option key={feast.id} value={feast.name_bg} />
        ))}
      </datalist>

      <fieldset className="message-entry__tags">
        <legend className="message-entry__tags-title">Tags</legend>
        <div className="message-entry__tag-groups">
          {tagGroups.map(({ language, label, tags }) => {
            const isAddingToGroup = tagLanguageBeingAdded === language;
            const newTagId = `${formType}-${language}-new-message-tag`;

            return (
              <section
                className="message-entry__tag-group"
                key={language}
                lang={language}
              >
                <p className="message-entry__tag-language">{label}</p>
                <div className="message-entry__tag-options">
                  {tags.map((tag) => (
                    <label className="message-entry__tag" key={tag.id}>
                      <input
                        name="tags"
                        value={tag.id}
                        checked={entry.tags.includes(tag.id)}
                        onChange={handleTagChange}
                        type="checkbox"
                      />
                      {tag.label}
                    </label>
                  ))}
                  {!isAddingToGroup && (
                    <button
                      className="message-entry__add-tag-toggle"
                      type="button"
                      aria-expanded="false"
                      aria-controls={newTagId}
                      onClick={() => {
                        setNewTagLabel("");
                        setTagLanguageBeingAdded(language);
                      }}
                    >
                      + Add tag
                    </button>
                  )}
                </div>
                {isAddingToGroup && (
                  <div className="message-entry__new-tag" id={newTagId}>
                    <label
                      className="message-entry__new-tag-label"
                      htmlFor={`${newTagId}-input`}
                    >
                      Tag name
                    </label>
                    <input
                      className="message-entry__new-tag-input"
                      id={`${newTagId}-input`}
                      value={newTagLabel}
                      onChange={(event) => setNewTagLabel(event.target.value)}
                      onKeyDown={handleNewTagKeyDown}
                      autoFocus
                      type="text"
                    />
                    <button
                      className="message-entry__new-tag-action"
                      type="button"
                      disabled={!newTagLabel.trim()}
                      onClick={addTag}
                    >
                      Add
                    </button>
                    <button
                      className="message-entry__new-tag-cancel"
                      type="button"
                      onClick={cancelAddTag}
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </section>
            );
          })}
        </div>
      </fieldset>

      <label
        className="message-entry__checkbox"
        htmlFor={`${formType}-message-visible`}
      >
        <input
          id={`${formType}-message-visible`}
          name="isVisible"
          checked={entry.isVisible}
          onChange={handleChange}
          type="checkbox"
        />
        Visible
      </label>

      <button
        className="message-entry__submit"
        type="submit"
        disabled={isSubmitting}
      >
        {submitLabel}
      </button>
    </form>
  );
}

export default MessageEntryForm;
