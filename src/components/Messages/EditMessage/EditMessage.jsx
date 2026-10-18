import { useState } from "react";
import "./EditMessage.scss";
import ErrorModal from "../../ErrorModal/ErrorModal";
import SuccessModal from "../../SuccessModal/SuccessModal";
import axios from "axios";
import editIcon from "../../../assets/edit.svg";
import { API_URL } from "../../../utilities/api";
import Modal from "../../UI/Modal/Modal";

function EditMessage({ single, associatedFeasts = [], messageTags = [] }) {
  const [visible, setVisible] = useState();
  const selectedFeast = associatedFeasts.find(
    (feast) => feast.id === single.associated_feast_id,
  );

  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [entry, setEntry] = useState({
    title_en: single.title_en || "",
    title_bg: single.title_bg || "",
    message_en: single.message_en || "",
    message_bg: single.message_bg || "",
    date: single.date || "",
    associated_feast_id: single.associated_feast_id || "",
    associated_feast_name_en: selectedFeast?.name_en || "",
    associated_feast_name_bg: selectedFeast?.name_bg || "",
    tags: Array.isArray(single.tags) ? single.tags : [],
    isVisible: Boolean(single.isVisible),
  });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setEntry((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleTagChange = (event) => {
    const { value, checked } = event.target;

    setEntry((prevState) => ({
      ...prevState,
      tags: checked
        ? [...prevState.tags, value]
        : prevState.tags.filter((tag) => tag !== value),
    }));
  };

  const handleFeastChange = (event) => {
    const { name, value } = event.target;
    const matchedFeast = associatedFeasts.find(
      (feast) => feast.name_en === value || feast.name_bg === value,
    );
    const isEnglishField = name === "associated_feast_name_en";

    setEntry((prevState) => ({
      ...prevState,
      associated_feast_id: matchedFeast?.id || "",
      associated_feast_name_en:
        matchedFeast?.name_en ||
        (isEnglishField
          ? value
          : prevState.associated_feast_id
            ? ""
            : prevState.associated_feast_name_en),
      associated_feast_name_bg:
        matchedFeast?.name_bg ||
        (!isEnglishField
          ? value
          : prevState.associated_feast_id
            ? ""
            : prevState.associated_feast_name_bg),
    }));
  };

  const onPublish = (event) => {
    event.preventDefault();

    if (!entry.title_bg || !entry.message_bg) {
      setUploadError(true);
      setErrorMessage("Make sure to add a Bulgarian title and message.");
      return;
    }

    const uploadEntry = async (message) => {
      const token = sessionStorage.getItem("authToken");
      const post = {
        ...message,
        associated_feast:
          message.associated_feast_name_en || message.associated_feast_name_bg
            ? {
                name_en: message.associated_feast_name_en,
                name_bg: message.associated_feast_name_bg,
              }
            : null,
      };

      try {
        await axios.put(`${API_URL}/messages/${single.id}`, post, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUploadSuccess(true);
        setVisible(false);
      } catch (err) {
        console.log(err.response);
        setVisible(false);
        setUploadError(true);
        setErrorMessage(
          "There was a problem with the connection. Try again later.",
        );
      }
    };

    uploadEntry(entry);
  };

  return (
    <div className="edit-priest-message">
      <button
        className="edit-priest-message__button"
        onClick={() => {
          setVisible(true);
        }}
        type="button"
      >
        <img className="edit-priest-message__icon" src={editIcon} alt="edit" />
      </button>
      <Modal visible={visible} setVisible={setVisible}>
        <form className="message-entry" onSubmit={onPublish}>
          <h2 className="message-entry__heading">Edit Message</h2>

          <div className="message-entry__translations">
            <section className="message-entry__column">
              <p className="message-entry__language">English</p>
              <label
                className="message-entry__field"
                htmlFor="message-title-en"
              >
                Title
                <input
                  id="message-title-en"
                  name="title_en"
                  value={entry.title_en}
                  onChange={handleChange}
                  type="text"
                />
              </label>

              <label
                className="message-entry__field"
                htmlFor="message-feast-en"
              >
                Associated Feast
                <input
                  id="message-feast-en"
                  list="message-feasts-en"
                  name="associated_feast_name_en"
                  value={entry.associated_feast_name_en}
                  onChange={handleFeastChange}
                  type="text"
                />
              </label>

              <label className="message-entry__field" htmlFor="message-text-en">
                Message
                <textarea
                  id="message-text-en"
                  name="message_en"
                  value={entry.message_en}
                  onChange={handleChange}
                />
              </label>
            </section>

            <section className="message-entry__column">
              <p className="message-entry__language">Bulgarian</p>
              <label
                className="message-entry__field"
                htmlFor="message-title-bg"
              >
                Title
                <input
                  id="message-title-bg"
                  name="title_bg"
                  value={entry.title_bg}
                  onChange={handleChange}
                  type="text"
                />
              </label>

              <label
                className="message-entry__field"
                htmlFor="message-feast-bg"
              >
                Associated Feast
                <input
                  id="message-feast-bg"
                  list="message-feasts-bg"
                  name="associated_feast_name_bg"
                  value={entry.associated_feast_name_bg}
                  onChange={handleFeastChange}
                  type="text"
                />
              </label>

              <label className="message-entry__field" htmlFor="message-text-bg">
                Message
                <textarea
                  id="message-text-bg"
                  name="message_bg"
                  value={entry.message_bg}
                  onChange={handleChange}
                />
              </label>
            </section>
          </div>

          <datalist id="message-feasts-en">
            {associatedFeasts.map((feast) => (
              <option key={feast.id} value={feast.name_en} />
            ))}
          </datalist>
          <datalist id="message-feasts-bg">
            {associatedFeasts.map((feast) => (
              <option key={feast.id} value={feast.name_bg} />
            ))}
          </datalist>

          <div className="message-entry__row">
            <label className="message-entry__field" htmlFor="message-date">
              Date
              <input
                id="message-date"
                name="date"
                value={entry.date}
                onChange={handleChange}
                type="date"
              />
            </label>
          </div>

          <fieldset className="message-entry__tags">
            <legend className="message-entry__tags-title">Tags</legend>
            <div className="message-entry__tag-options">
              {messageTags.map((tag) => (
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
            </div>
          </fieldset>

          <label className="message-entry__checkbox" htmlFor="message-visible">
            <input
              id="message-visible"
              name="isVisible"
              checked={entry.isVisible}
              onChange={handleChange}
              type="checkbox"
            />
            Visible
          </label>

          <button className="message-entry__submit" type="submit">
            Update
          </button>
        </form>
      </Modal>
      {uploadError && (
        <ErrorModal
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
          setUploadError={setUploadError}
        />
      )}
      {uploadSuccess && <SuccessModal />}
    </div>
  );
}

export default EditMessage;
