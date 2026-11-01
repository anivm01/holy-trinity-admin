import { useState } from "react";
import eyeIcon from "../../../assets/eye-solid.svg";
import Modal from "../../UI/Modal/Modal";
import MessagePreview from "../MessagePreview/MessagePreview";
import "./ViewMessage.scss";

function ViewMessage({ message }) {
  const [visible, setVisible] = useState();

  return (
    <div className="view-priest-message">
      <button
        className="view-priest-message__button"
        onClick={() => {
          setVisible(true);
        }}
        aria-label="View message"
        type="button"
      >
        <img
          className="view-priest-message__icon"
          src={eyeIcon}
          alt=""
          aria-hidden="true"
        />
      </button>

      <Modal visible={visible} setVisible={setVisible} size="wide">
        <div className="view-priest-message__modal">
          <MessagePreview entry={message} />
        </div>
      </Modal>
    </div>
  );
}

export default ViewMessage;
