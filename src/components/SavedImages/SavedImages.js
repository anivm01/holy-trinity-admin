import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { API_URL } from '../../utilities/api'
import Masonry from "react-responsive-masonry"
import './SavedImages.scss';
import deleteIcon from "../../assets/delete.svg"
import { ThreeDots } from 'react-loader-spinner'


function SavedImages() {
    const [images, setImages] = useState([])
    const navigate = useNavigate()

    const getImages = async () => {
        try{
            const response = await axios.get(`${API_URL}/images/en`)
            setImages(response.data)
        }
        catch (error) {
            console.error(error)
        }
    }
    const deleteItem = async (id) => {
        try {
            const response = await axios.delete(`${API_URL}/images/en/${id}`);
            navigate(0)
            
        }
        catch (error) {
            console.log(error)
        }
    }
    
    useEffect(()=> {
        getImages()
    }, [])


    if(images.length === 0) {
        return <ThreeDots
        height="80" 
        width="80" 
        radius="9"
        color="#6F0B20" 
        ariaLabel="three-dots-loading"
        wrapperStyle={{justifyContent: "center"}}
        wrapperClassName=""
        visible={true}
         />
    }
  return (
    <div className='saved-images'>
        <Masonry columnsCount={4} gutter="2rem">
        {images.map((image) => { return (
        <div className='saved-images__box' key={image.id}>
            <img className='saved-images__img' src={`http://localhost:8080${image.url}`} alt={image.description} />
            <button className='saved-images__delete' onClick={()=>{deleteItem(image.id)}} type='button'>
                <img className='saved-images__icon' src={deleteIcon} alt="delete" />
            </button>
        </div>
        )})}
        </Masonry>
    </div>
  )
}

export default SavedImages