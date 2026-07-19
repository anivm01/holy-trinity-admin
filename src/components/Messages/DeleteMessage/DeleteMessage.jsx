import "./DeleteMessage.scss";
import deleteIcon from "../../../assets/delete.svg";
import useDelete from "../../../utilities/useDelete";
import Modal from "../../UI/Modal/Modal";
import { useState } from "react";
import { API_URL } from "../../../utilities/api";

function DeleteMessage({ id }) {
  const [visible, setVisible] = useState();
  const { deleteItem } = useDelete(`${API_URL}/messages/${id}`);

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
              onClick={() => {
                deleteItem();
              }}
              className="button"
              type="button"
            >
              Delete
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
    </div>
  );
}

export default DeleteMessage;
