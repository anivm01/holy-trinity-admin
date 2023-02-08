import './AddImage.scss'
import plus from "../../assets/plus.svg"

function AddImage( {setImageUploadVisible, } ) {
  return (
    <div onClick={()=>{setImageUploadVisible(true)}} className='add-image'>
        <label className="add-image__label">
            Choose an image to add
        </label>
        <img className='add-image__placeholder' src={plus} alt="add image icon"/>
    </div>
  )
}

export default AddImage