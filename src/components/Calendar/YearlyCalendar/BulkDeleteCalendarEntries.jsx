import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import deleteIcon from "../../../assets/delete.svg";
import { API_URL } from "../../../utilities/api";
import Modal from "../../UI/Modal/Modal";

function BulkDeleteCalendarEntries({ selectedEntryIds }) {
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const selectedCount = selectedEntryIds.size;

  const deleteSelectedEntries = async () => {
    const token = sessionStorage.getItem("authToken");
    setIsDeleting(true);
    setErrorMessage("");

    const results = await Promise.allSettled(
      [...selectedEntryIds].map((id) =>
        axios.delete(`${API_URL}/calendar/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ),
    );
    const failedDeletes = results.filter(
      (result) => result.status === "rejected",
    ).length;

    if (failedDeletes > 0) {
      setErrorMessage(
        `${failedDeletes} ${
          failedDeletes === 1 ? "entry could" : "entries could"
        } not be deleted. Refresh the page before trying again.`,
      );
      setIsDeleting(false);
      return;
    }

    navigate(0);
  };

  return (
    <div className="yearly-calendar__bulk-actions">
      <button
        className="yearly-calendar__bulk-delete"
        type="button"
        disabled={selectedCount === 0}
        onClick={() => setIsConfirmationVisible(true)}
      >
        <img src={deleteIcon} alt="" aria-hidden="true" />
        Delete selected{selectedCount > 0 ? ` (${selectedCount})` : ""}
      </button>

      <Modal
        visible={isConfirmationVisible}
        setVisible={setIsConfirmationVisible}
      >
        <div className="yearly-calendar__delete-confirmation">
          <h2>Delete selected calendar entries?</h2>
          <p>
            You are about to permanently delete {selectedCount}{" "}
            {selectedCount === 1 ? "entry" : "entries"}.
          </p>
          {errorMessage && (
            <p className="yearly-calendar__delete-error" role="alert">
              {errorMessage}
            </p>
          )}
          <div className="yearly-calendar__delete-buttons">
            <button
              type="button"
              className="yearly-calendar__confirm-delete"
              disabled={isDeleting}
              onClick={deleteSelectedEntries}
            >
              {isDeleting ? "Deleting…" : "Delete"}
            </button>
            <button
              type="button"
              className="yearly-calendar__cancel-delete"
              disabled={isDeleting}
              onClick={() => setIsConfirmationVisible(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default BulkDeleteCalendarEntries;
