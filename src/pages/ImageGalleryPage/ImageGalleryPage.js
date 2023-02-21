import { useState } from 'react';
import ImageUpload from '../../components/ImageUpload/ImageUpload';
import SavedImages from '../../components/SavedImages/SavedImages';
import './ImageGalleryPage.scss'

function ImageGalleryPage() {
    const [imageUploadVisible, setImageUploadVisible] = useState(false);
    const [newImage, setNewImage] = useState()

  return (
    <section className='image-gallery-page'>
        {imageUploadVisible && (
        <ImageUpload
          setImageId={setNewImage}
          setVisible={setImageUploadVisible}
        />
      )}
        <button onClick={()=>{setImageUploadVisible(true)}} type='button' className='image-gallery-page__button'>Add New</button>
        <div className='image-gallery-page__caution'>
          <h2 className='image-gallery-page__heading'>Caution:</h2>
          <p>Deleting an image from this gallery will result in deleting any post where this image appears.</p>
        </div>
        <SavedImages />
    </section>
  )
}

export default ImageGalleryPage