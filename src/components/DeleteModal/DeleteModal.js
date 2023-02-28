import "./DeleteModal.scss";
import deleteIcon from "../../assets/delete.svg";

function DeleteModal({ imageId, setVisible, deleteFunction }) {

  return (
    <div className="delete-message">
      <div className="delete-message__box">
        <img
          className="delete-message__icon"
          src={deleteIcon}
          alt="delete icon"
        />
        <div className="delete-message__confirmation">
          <h2 className="delete-message__title">
            Are you sure you want to delete this item?
          </h2>
          <button
            onClick={() => {
              deleteFunction(imageId);
            }}
            className="delete-message__button"
          >
            Delete
          </button>
          <button
            onClick={() => {
              setVisible(false);
            }}
            className="delete-message__button"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
