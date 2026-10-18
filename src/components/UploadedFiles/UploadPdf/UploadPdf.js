import React, { useRef, useState } from 'react';
import axios from 'axios';
import './UploadPdf.scss';
import Input from '../../UI/Input/Input';
import { API_URL } from '../../../utilities/api';
import Button from '../../UI/Button/Button';
import ErrorModal from '../../ErrorModal/ErrorModal';
import SuccessModal from '../../SuccessModal/SuccessModal';

function UploadPdf({ onUploadSuccess }) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [caption, setCaption] = useState("")
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [uploadError, setUploadError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const fileInput = useRef(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!selectedFile) {
            setErrorMessage('Please select a PDF file first!');
            setUploadError(true);
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('caption', caption);
        const token = sessionStorage.getItem("authToken");

        try {
            setUploading(true);

            await axios.post(`${API_URL}/assets/upload`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            });

            setSelectedFile(null);
            setCaption("");
            if (fileInput.current) {
                fileInput.current.value = "";
            }
            onUploadSuccess();
            setUploadSuccess(true);
        } catch (error) {
            console.error('Upload error:', error);
            setErrorMessage(
                error.response?.data?.message ||
                'There was an error with the PDF upload.'
            );
            setUploadError(true);
        } finally {
            setUploading(false);
        }
    }


    return (
        <>
            {uploadError && (
                <ErrorModal
                    errorMessage={errorMessage}
                    setErrorMessage={setErrorMessage}
                    setUploadError={setUploadError}
                />
            )}
            {uploadSuccess && <SuccessModal />}
            <form className="pdf-upload" onSubmit={handleSubmit}>
                <label htmlFor="pdf-upload" className="pdf-upload__label">
                    {selectedFile ? selectedFile.name : "Choose a file"}
                </label>
                <input
                    ref={fileInput}
                    className='pdf-upload__input'
                    type="file"
                    onChange={handleFileChange}
                    id="pdf-upload"
                    name="file"
                    accept="application/pdf"
                />
                <Input label="Write a caption or title for this file" id="pdf-caption" name="caption" value={caption} onChange={(event) => setCaption(event.target.value)} type="text" inputComponent="input" />
                <Button text={uploading ? 'Uploading...' : 'Upload'} type="submit" disabled={uploading} />
            </form>
        </>
    );
}

export default UploadPdf;
