import Button from "../../UI/Button/Button";
import Modal from "../../UI/Modal/Modal";
import "./CommunityNewsStatusConfirmation.scss";

function CommunityNewsStatusConfirmation({ post, onConfirm, onCancel }) {
  const nextStatus = post?.status === "published" ? "draft" : "published";
  const nextLabel = nextStatus === "published" ? "Published" : "Draft";
  const currentLabel = post?.status === "published" ? "Published" : "Draft";

  return (
    <Modal
      visible={Boolean(post)}
      setVisible={(visible) => !visible && onCancel()}
    >
      {post && (
        <section
          className="community-status-confirmation"
          role="dialog"
          aria-modal="true"
          aria-labelledby="community-status-confirmation-title"
        >
          <h2 id="community-status-confirmation-title">
            Change post status?
          </h2>
          <p>
            Change this post from <strong>{currentLabel}</strong> to{" "}
            <strong>{nextLabel}</strong>?
          </p>
          <div className="community-status-confirmation__actions">
            <Button
              type="button"
              onClick={onConfirm}
              text={`Yes, ${nextStatus === "published" ? "publish" : "move to draft"}`}
              variant="primary"
            />
            <Button
              type="button"
              onClick={onCancel}
              text="Cancel"
              variant="secondary"
            />
          </div>
        </section>
      )}
    </Modal>
  );
}

export default CommunityNewsStatusConfirmation;
