import "./DeleteCategory.scss";
import useDelete from "../../../utilities/useDelete";
import Modal from "../../Modal/Modal";
import { useState } from "react";
import { API_URL } from "../../../utilities/api";
import Button from "../../UI/Button/Button";


function DeleteCategory({ id }) {
    const [visible, setVisible] = useState()
    const { deleteItem } = useDelete(`${API_URL}/priest-resources/category/${id}`)

    return (
        <div className="delete-category">
            <Button
                text="Delete"
                type="button"
                onClick={() => {
                    setVisible(true);
                }}
            />
            <Modal visible={visible} setVisible={setVisible} >
                <div className="delete-category__message">
                    <h2 className="delete-category__question">
                        Are you sure you want to delete this item?
                    </h2>
                    <div className="delete-category__buttons">
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

export default DeleteCategory;
