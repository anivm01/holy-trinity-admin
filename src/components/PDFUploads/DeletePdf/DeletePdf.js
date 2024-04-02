import "./DeletePdf.scss";
import useDelete from "../../../utilities/useDelete";
import { useState } from "react";
import { API_URL } from "../../../utilities/api";
import ModifyButton from "../../UI/ModifyButton/ModifyButton";
import Button from "../../UI/Button/Button";
import Modal from "../../UI/Modal/Modal";


function DeletePdf({ id }) {
    const [visible, setVisible] = useState()
    const { deleteItem } = useDelete(`${API_URL}/assets/${id}`)

    return (
        <div className="delete-pdf">
            <ModifyButton
                onClick={() => { setVisible(true) }}
                hasText={true}
                hasIcon={true}
                type='delete' />
            <Modal visible={visible} setVisible={setVisible} >
                <div className="delete-pdf__message">
                    <h2 className="delete-pdf__question">
                        Are you sure you want to delete this item?
                    </h2>
                    <div className="delete-pdf__buttons">
                        <Button
                            type="button"
                            onClick={() => { deleteItem() }}
                            text="Delete"
                            variant="primary"
                        />
                        <Button
                            type="button"
                            onClick={() => { setVisible(false) }}
                            text="Cancel"
                            variant="secondary"
                        />
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default DeletePdf;
