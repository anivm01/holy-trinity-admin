import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ImageUpload from '../../components/ImageUpload/ImageUpload';
import NewImageForm from '../../components/NewImageForm/NewImageForm';
import SavedImages from '../../components/SavedImages/SavedImages';
import './ImageGalleryPage.scss'

function ImageGalleryPage() {
    const [newImage, setNewImage] = useState();

    const [noNewImage, setNoNewImage] = useState(true)
    const navigate = useNavigate()

    useEffect(()=>{
      if (!noNewImage) {
        navigate(0)
      }
    },[noNewImage])

  return (
    <section className='image-gallery-page'>
      <div className='image-gallery-page__top'>
        <NewImageForm setImageId={setNewImage} setVisible={setNoNewImage} />
      </div>
        <SavedImages />
    </section>
  )
}

export default ImageGalleryPage