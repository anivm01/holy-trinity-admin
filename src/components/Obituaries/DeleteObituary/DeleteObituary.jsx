import { useState } from "react";
import { API_URL } from "../../../utilities/api";
import useDelete from "../../../utilities/useDelete";
import { DeletePopup } from "../../UI/DeletePopup/DeletePopup";
import Modal from "../../UI/Modal/Modal";
import ModifyButton from "../../UI/ModifyButton/ModifyButton";

function DeleteObituary({ id }) {
  const [visible, setVisible] = useState(false);
  const { deleteItem } = useDelete(`${API_URL}/obituaries/${id}`);

  return (
    <div>
      <ModifyButton
        onClick={() => setVisible(true)}
        hasText={false}
        hasIcon
        type="delete"
      />
      <Modal visible={visible} setVisible={setVisible}>
        <DeletePopup deleteItem={deleteItem} setVisible={setVisible} />
      </Modal>
    </div>
  );
}

export default DeleteObituary;
