import { useState } from "react";
import "./EditMessage.scss";
import ErrorModal from "../../ErrorModal/ErrorModal";
import editIcon from "../../../assets/edit.svg";
import Modal from "../../UI/Modal/Modal";
import MessageEntryForm from "../MessageEntryForm/MessageEntryForm";
import MessagePreview from "../MessagePreview/MessagePreview";

function EditMessage({
  single,
  associatedFeasts = [],
  messageTags = [],
  onUpdateMessage,
  onAddTag,
}) {
  const [visible, setVisible] = useState(false);
  const [entry, setEntry] = useState({
    title_en: single.title_en || "",
    title_bg: single.title_bg || "",
    message_en: single.message_en || "",
    message_bg: single.message_bg || "",
    associated_feast_name_en: single.associated_feast_name_en || "",
    associated_feast_name_bg: single.associated_feast_name_bg || "",
    tags: Array.isArray(single.tags) ? single.tags : [],
    isVisible: Boolean(single.isVisible),
  });
  const [uploadError, setUploadError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const onPublish = async (event) => {
    event.preventDefault();

    if (!entry.title_bg.trim() || !entry.message_bg.trim()) {
      setErrorMessage("Make sure to add a Bulgarian title and message.");
      setUploadError(true);
      return;
    }

    try {
      setIsSaving(true);
      const updatedMessage = await onUpdateMessage(single.id, entry);
      setEntry({
        title_en: updatedMessage.title_en || "",
        title_bg: updatedMessage.title_bg || "",
        message_en: updatedMessage.message_en || "",
        message_bg: updatedMessage.message_bg || "",
        associated_feast_name_en:
          updatedMessage.associated_feast_name_en || "",
        associated_feast_name_bg:
          updatedMessage.associated_feast_name_bg || "",
        tags: Array.isArray(updatedMessage.tags) ? updatedMessage.tags : [],
        isVisible: Boolean(updatedMessage.isVisible),
      });
      setVisible(false);
    } catch (error) {
      setErrorMessage(error.message || "Unable to update the message.");
      setUploadError(true);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="edit-priest-message">
      <button
        className="edit-priest-message__button"
        onClick={() => setVisible(true)}
        aria-label="Edit message"
        type="button"
      >
        <img
          className="edit-priest-message__icon"
          src={editIcon}
          alt=""
          aria-hidden="true"
        />
      </button>
      <Modal visible={visible} setVisible={setVisible} size="wide">
        <MessageEntryForm
          formType={`edit-${single.id}`}
          formTitle="Edit Message"
          entry={entry}
          setEntry={setEntry}
          onPublish={onPublish}
          associatedFeasts={associatedFeasts}
          messageTags={messageTags}
          onAddTag={onAddTag}
          submitLabel={isSaving ? "Saving…" : "Update"}
          isSubmitting={isSaving}
        />
        <MessagePreview entry={entry} />
      </Modal>
      {uploadError && (
        <ErrorModal
          errorMessage={errorMessage}
          setUploadError={setUploadError}
        />
      )}
    </div>
  );
}

export default EditMessage;
