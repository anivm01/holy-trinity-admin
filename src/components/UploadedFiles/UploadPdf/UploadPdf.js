import React, { useState } from 'react';
import axios from 'axios';
import './UploadPdf.scss';
import Input from '../../UI/Input/Input';
import { API_URL } from '../../../utilities/api';
import Button from '../../UI/Button/Button';

function UploadPdf() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [caption, setCaption] = useState("")

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSubmit = async () => {
        if (!selectedFile) {
            alert('Please select a PDF file first!');
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('caption', caption);
        const token = sessionStorage.getItem("authToken");

        try {
            const response = await axios.post(`${API_URL}/assets/upload`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response) {
                setSelectedFile(null)
            }
            setUploading(false);
            alert('PDF uploaded successfully!');
            console.log(response.data);

        } catch (error) {
            setUploading(false);
            console.error('Upload error:', error);
            alert('Error uploading PDF.');
        }
    }


    return (
        <form className="pdf-upload">
            <label htmlFor="pdf-upload" className="pdf-upload__label">
                {selectedFile ? selectedFile.name : "Choose a file"}
            </label>
            <input
                className='pdf-upload__input'
                type="file"
                onChange={handleFileChange}
                id="pdf-upload"
                name="file"
                accept="application/pdf"
            />
            <Input label="Write a caption or title for this file" id="pdf-caption" name="caption" value={caption} onChange={(event) => setCaption(event.target.value)} type="text" inputComponent="input" />
            <Button onClick={() => handleSubmit()} text={uploading ? 'Uploading...' : 'Upload'} type="submit" disabled={uploading} />
        </form>
    );
}

export default UploadPdf;
