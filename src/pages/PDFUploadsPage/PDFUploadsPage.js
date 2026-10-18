
import { useState } from 'react'
import SavedPdfs from '../../components/UploadedFiles/SavedPdfs/SavedPdfs'
import UploadPdf from '../../components/UploadedFiles/UploadPdf/UploadPdf'
import PageHeader from '../../components/UI/PageHeader/PageHeader'
import './PDFUploadsPage.scss'

function PDFUploadsPage() {
    const [savedPdfsVersion, setSavedPdfsVersion] = useState(0)

    return (
        <main className='pdf-uplaods-page'>
            <PageHeader title="Upload PDF Resources" />
            <UploadPdf onUploadSuccess={() => setSavedPdfsVersion((version) => version + 1)} />
            <SavedPdfs key={savedPdfsVersion} />
        </main>
    )
}

export default PDFUploadsPage
