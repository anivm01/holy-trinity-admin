import "./DeleteModal.scss";
import deleteIcon from "../../assets/delete.svg";
import useDelete from "../../utilities/useDelete";
import { useNavigate } from "react-router-dom";

function DeleteModal({ setVisible, url }) {
const {deleteItem} = useDelete(url)

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
              deleteItem();
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
