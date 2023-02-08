import axios from "axios"
import { useState } from "react"
import { API_URL } from "../../utilities/api"
import plus from "../../assets/plus.svg"
import "./ImageUpload.scss"

function ImageUpload() {
    const [file, setFile] = useState(null)
    const [description, setDescription] = useState("")
    const [descriptionBG, setDescriptionBG] = useState("")
    const [previewURL, setPreviewURL] = useState(plus)
    const [savedURL, setSavedURL] = useState("")
  
    const submit = async event => {
      event.preventDefault()
  
      // Send the file and description to the server
  
      const formData = new FormData()
      formData.append("image", file)
      formData.append("description", description)
      formData.append("descriptionBG", descriptionBG)
  
      try {
        const result = await axios.post(`${API_URL}/images/en`, formData, { headers: {'Content-Type': 'multipart/form-data'}})
        setSavedURL(result.data.new_image_en[0].url)
        setFile(null)
        setDescription("")
        setDescriptionBG("")
        setPreviewURL(plus)        
      }
      catch (error) {
        console.log(error)
      }      
    }
  
    return (
      <>
        <form onSubmit={submit} className="image-upload">
          <label className="image-upload__add-new">
            Choose an image to add
            <img className="image-upload__preview" src={previewURL} alt="add an image here"/>
            <input
              className="image-upload__input"
              filename={file} 
              onChange={e => {setPreviewURL(URL.createObjectURL(e.target.files[0]));setFile(e.target.files[0]); } }
              type="file" 
              accept="image/png, image/jpg, image/gif, image/jpeg"
            />
          </label>
          <div className="image-upload__descriptions">
            <label className="image-upload__description" htmlFor="enDescription">Enter a short description of the image in English
            <input
              onChange={e => setDescription(e.target.value)} 
              type="text"
              id="enDescription"
              name="enDescription"
              value={description}
              className="image-upload__text"
            />
            </label>
            <label className="image-upload__description" htmlFor="bgDescription">Въведете кратко описание на снимката на Български
            <input
              onChange={e => setDescriptionBG(e.target.value)} 
              type="text"
              id="bgDescription"
              name="bgDescription"
              value={descriptionBG}
              className="image-upload__text"
            />
            </label>
          </div>
          <button className="image-upload__submit" type="submit">Save Image</button>
        </form>
        {savedURL && <img className="image-upload__saved" src={`${API_URL}${savedURL}`} alt={description}/>}
      </>
    )
}

export default ImageUpload