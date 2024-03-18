import "./DeletePriestResource.scss";
import deleteIcon from "../../../assets/delete.svg";
import useDelete from "../../../utilities/useDelete";
import Modal from "../../Modal/Modal";
import { useState } from "react";
import { API_URL } from "../../../utilities/api";


function DeletePriestResource({ id }) {
    const [visible, setVisible] = useState()
    const { deleteItem } = useDelete(`${API_URL}/priest-resources/${id}`)

    return (
        <div className="delete-priest-resource">
            <button
                className="delete-priest-resource__button"
                onClick={() => {
                    setVisible(true);
                }}
                type="button"
            >
                <img
                    className="delete-priest-resource__icon"
                    src={deleteIcon}
                    alt="delete"
                />
            </button>
            <Modal visible={visible} setVisible={setVisible} >
                <div className="delete-priest-resource__message">
                    <h2 className="delete-priest-resource__question">
                        Are you sure you want to delete this item?
                    </h2>
                    <div className="delete-priest-resource__buttons">
                        <button
                            onClick={() => {
                                deleteItem();
                            }}
                            className="button"
                        >
                            Delete
                        </button>
                        <button
                            onClick={() => {
                                setVisible(false);
                            }}
                            className="button"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default DeletePriestResource;
