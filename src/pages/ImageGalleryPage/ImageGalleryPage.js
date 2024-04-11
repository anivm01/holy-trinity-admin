import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ImageUpload from '../../components/ImageUpload/ImageUpload';
import NewImageForm from '../../components/NewImageForm/NewImageForm';
import './ImageGalleryPage.scss'
//import SavedImages from '../../components/SavedImages/SavedImages';
import SavedImages from '../../components/UploadedFiles/SavedImages/SavedImages';
import AddImage from '../../components/UploadedFiles/AddImage/AddImage';
import PageHeader from '../../components/UI/PageHeader/PageHeader';

function ImageGalleryPage() {
  // const [newImage, setNewImage] = useState();

  // const [noNewImage, setNoNewImage] = useState(true)
  // const navigate = useNavigate()

  // useEffect(() => {
  //   if (!noNewImage) {
  //     navigate(0)
  //   }
  // }, [noNewImage])

  return (
    <section
    // className='image-gallery-page'
    >
      <PageHeader title="Image Gallery"></PageHeader>
      <AddImage />
      {/* <div className='image-gallery-page__top'>
        <NewImageForm setImageId={setNewImage} setVisible={setNoNewImage} />

      </div> */}
      <SavedImages />

    </section>
  )
}

export default ImageGalleryPage