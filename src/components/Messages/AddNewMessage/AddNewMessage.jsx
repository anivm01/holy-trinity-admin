import { useId, useState } from "react";
import ErrorModal from "../../ErrorModal/ErrorModal";
import MessageEntryForm from "../MessageEntryForm/MessageEntryForm";
import MessagePreview from "../MessagePreview/MessagePreview";
import "./AddNewMessage.scss";

const createEmptyMessage = () => ({
  title_en: "",
  title_bg: "",
  message_en: "",
  message_bg: "",
  associated_feast_name_en: "",
  associated_feast_name_bg: "",
  tags: [],
  isVisible: false,
});

function AddNewMessage({
  associatedFeasts = [],
  messageTags = [],
  onAddMessage,
  onAddTag,
}) {
  const [entry, setEntry] = useState(createEmptyMessage);
  const [uploadError, setUploadError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const panelId = useId();

  const onPublish = async (event) => {
    event.preventDefault();

    if (!entry.title_bg.trim() || !entry.message_bg.trim()) {
      setErrorMessage("Make sure to add a Bulgarian title and message.");
      setUploadError(true);
      return;
    }

    try {
      setIsSaving(true);
      await onAddMessage(entry);
      setEntry(createEmptyMessage());
      setStatusMessage("Message saved successfully.");
      setIsExpanded(false);
    } catch (error) {
      setErrorMessage(error.message || "Unable to save the message.");
      setUploadError(true);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <section className="add-priest-message">
      {uploadError && (
        <ErrorModal
          errorMessage={errorMessage}
          setUploadError={setUploadError}
        />
      )}
      <h2 className="add-priest-message__heading">
        <button
          className="add-priest-message__toggle"
          type="button"
          aria-expanded={isExpanded}
          aria-controls={panelId}
          onClick={() => {
            if (!isExpanded) {
              setStatusMessage("");
            }
            setIsExpanded(!isExpanded);
          }}
        >
          <span>Add New Message</span>
          <span className="add-priest-message__indicator" aria-hidden="true" />
        </button>
      </h2>
      {isExpanded && (
        <div className="add-priest-message__panel" id={panelId}>
          <MessageEntryForm
            formType="add"
            formTitle="Add New Message"
            showHeading={false}
            entry={entry}
            setEntry={setEntry}
            onPublish={onPublish}
            associatedFeasts={associatedFeasts}
            messageTags={messageTags}
            onAddTag={onAddTag}
            submitLabel={isSaving ? "Saving…" : "Add Message"}
            isSubmitting={isSaving}
          />
          <MessagePreview entry={entry} />
        </div>
      )}
      {statusMessage && (
        <p className="add-priest-message__status" role="status">
          {statusMessage}
        </p>
      )}
    </section>
  );
}

export default AddNewMessage;
