import { useState } from "react";
import eyeIcon from "../../../assets/eye-solid.svg";
import Modal from "../../UI/Modal/Modal";
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

      <Modal visible={visible} setVisible={setVisible}>
        <div className="view-priest-message__modal">
          <section className="view-priest-message__column">
            <p className="view-priest-message__language">English</p>
            <h2 className="view-priest-message__title">
              {message.title_en || "Untitled message"}
            </h2>
            <p className="view-priest-message__content">
              {message.message_en || "No English message text yet."}
            </p>
          </section>

          <section className="view-priest-message__column">
            <p className="view-priest-message__language">Bulgarian</p>
            <h2 className="view-priest-message__title">
              {message.title_bg || "Untitled message"}
            </h2>
            <p className="view-priest-message__content">
              {message.message_bg || "No Bulgarian message text yet."}
            </p>
          </section>
        </div>
      </Modal>
    </div>
  );
}

export default ViewMessage;
