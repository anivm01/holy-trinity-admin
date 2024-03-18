import { useState } from "react";
import ErrorModal from "../../ErrorModal/ErrorModal";
import SuccessModal from "../../SuccessModal/SuccessModal";
import axios from "axios";
import { API_URL } from "../../../utilities/api";
import Modal from "../../Modal/Modal";
import Button from "../../UI/Button/Button";
import DragAndDropResources from "../DragAndDropResources/DragAndDropResources";

function ReorderResources({ category, categoryId, resources }) {
    const [visible, setVisible] = useState()
    const [draggableList, setDraggableList] = useState(resources)

    //success and error message states
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [uploadError, setUploadError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");


    const onPublish = (e) => {
        e.preventDefault();
        const reorderedResources = draggableList.map(resource => resource.id);
        const update = {
            order: reorderedResources,
            categoryId: categoryId
        }
        console.log(update)
        const uploadNewOrder = async (update) => {
            const token = sessionStorage.getItem("authToken");
            try {
                await axios.put(`${API_URL}/priest-resources/resource-order`, update, {
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
        uploadNewOrder(update);
    };


    return (
        <div>
            <Button
                onClick={() => {
                    setVisible(true);
                }}
                type="button"
                text="Reorder Resources"
            />
            <Modal visible={visible} setVisible={setVisible} >
                <h3>{category}</h3>
                <DragAndDropResources draggableList={draggableList} setDraggableList={setDraggableList} />
                <Button
                    type="button"
                    text="Save"
                    onClick={onPublish}
                />
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

export default ReorderResources;
