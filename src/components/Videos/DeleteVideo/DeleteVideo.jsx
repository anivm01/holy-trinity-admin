import useDelete from "../../../utilities/useDelete";
import { useState } from "react";
import { API_URL } from "../../../utilities/api";
import ModifyButton from "../../UI/ModifyButton/ModifyButton";
import { DeletePopup } from "../../UI/DeletePopup/DeletePopup";
import Modal from "../../UI/Modal/Modal";

function DeleteVideo({ id }) {
  const [visible, setVisible] = useState();
  const { deleteItem } = useDelete(`${API_URL}/videos/${id}`);

  return (
    <div>
      <ModifyButton
        onClick={() => {
          setVisible(true);
        }}
        hasText={true}
        hasIcon={true}
        type="delete"
      />
      <Modal visible={visible} setVisible={setVisible}>
        <DeletePopup deleteItem={deleteItem} setVisible={setVisible} />
      </Modal>
    </div>
  );
}

export default DeleteVideo;
