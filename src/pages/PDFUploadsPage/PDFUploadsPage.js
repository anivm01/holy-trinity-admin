
import SavedPdfs from '../../components/UploadedFiles/SavedPdfs/SavedPdfs'
import UploadPdf from '../../components/UploadedFiles/UploadPdf/UploadPdf'
import PageHeader from '../../components/UI/PageHeader/PageHeader'
import './PDFUploadsPage.scss'

function PDFUploadsPage() {

    return (
        <main className='pdf-uplaods-page'>
            <PageHeader title="Upload PDF Resources" />
            <UploadPdf />
            <SavedPdfs />
        </main>
    )
}

export default PDFUploadsPage