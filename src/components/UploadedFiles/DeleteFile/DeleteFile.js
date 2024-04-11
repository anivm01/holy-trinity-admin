import "./DeleteFile.scss";
import useDelete from "../../../utilities/useDelete";
import { useState } from "react";
import { API_URL } from "../../../utilities/api";
import ModifyButton from "../../UI/ModifyButton/ModifyButton";
import Modal from "../../UI/Modal/Modal";
import { DeletePopup } from "../../UI/DeletePopup/DeletePopup";


function DeleteFile({ id }) {
    const [visible, setVisible] = useState()
    const { deleteItem } = useDelete(`${API_URL}/assets/${id}`)

    return (
        <div className="delete-file">
            <ModifyButton
                onClick={() => { setVisible(true) }}
                hasText={true}
                hasIcon={true}
                type='delete' />
            <Modal visible={visible} setVisible={setVisible} >
                <DeletePopup deleteItem={deleteItem} setVisible={setVisible} />
            </Modal>
        </div>
    );
}

export default DeleteFile;
