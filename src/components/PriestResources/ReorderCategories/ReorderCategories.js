import { useState } from "react";
import ErrorModal from "../../ErrorModal/ErrorModal";
import SuccessModal from "../../SuccessModal/SuccessModal";
import axios from "axios";
import { API_URL } from "../../../utilities/api";
import Modal from "../../Modal/Modal";
import Button from "../../UI/Button/Button";
import DragAndDropCategories from "../DragAndDropCategories/DragAndDropCategories";

function ReorderCategories({ categories }) {
    const [visible, setVisible] = useState()
    const [draggableList, setDraggableList] = useState(categories)

    //success and error message states
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [uploadError, setUploadError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");


    const onPublish = (e) => {
        e.preventDefault();
        const orderedCategories = draggableList.map(category => category.id);
        const uploadNewOrder = async (orderedCategories) => {
            const token = sessionStorage.getItem("authToken");
            try {
                await axios.put(`${API_URL}/priest-resources/category/order`, orderedCategories, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUploadSuccess(true);
                setVisible(false)
            } catch (err) {
                console.log(err.response);
                setVisible(false)
                setUploadError(true);
                setErrorMessage(
                    "There was a problem with the connection. Try again later."
                );
            }
        };
        uploadNewOrder(orderedCategories);
    };


    return (
        <div className="reorder-categories">
            <Button
                onClick={() => {
                    setVisible(true);
                }}
                type="button"
                text="Reorder Categories"
            />
            <Modal visible={visible} setVisible={setVisible} >
                <DragAndDropCategories draggableList={draggableList} setDraggableList={setDraggableList} />
                <Button
                    type="button"
                    text="Save"
                    onClick={onPublish} />
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

export default ReorderCategories;
