import "./DeleteMessage.scss";
import deleteIcon from "../../../assets/delete.svg";
import ErrorModal from "../../ErrorModal/ErrorModal";
import Modal from "../../UI/Modal/Modal";
import { useState } from "react";

function DeleteMessage({ id, onDeleteMessage }) {
  const [visible, setVisible] = useState();
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const deleteMessage = async () => {
    try {
      setIsDeleting(true);
      await onDeleteMessage(id);
      setVisible(false);
    } catch (error) {
      setErrorMessage(error.message || "Unable to delete the message.");
      setDeleteError(true);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="delete-priest-message">
      <button
        className="delete-priest-message__button"
        onClick={() => {
          setVisible(true);
        }}
        type="button"
      >
        <img
          className="delete-priest-message__icon"
          src={deleteIcon}
          alt="delete"
        />
      </button>
      <Modal visible={visible} setVisible={setVisible}>
        <div className="delete-priest-message__message">
          <h2 className="delete-priest-message__question">
            Are you sure you want to delete this message?
          </h2>
          <div className="delete-priest-message__buttons">
            <button
              onClick={deleteMessage}
              className="button"
              type="button"
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting…" : "Delete"}
            </button>
            <button
              onClick={() => {
                setVisible(false);
              }}
              className="button"
              type="button"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
      {deleteError && (
        <ErrorModal
          errorMessage={errorMessage}
          setUploadError={setDeleteError}
        />
      )}
    </div>
  );
}

export default DeleteMessage;
