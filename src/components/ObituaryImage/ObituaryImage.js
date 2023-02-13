import { useEffect, useState } from 'react'
import { API_URL } from '../../utilities/api'
import './ObituaryImage.scss'
import axios from 'axios'


function ObituaryImage ( {imageId} ) {
    const [imageData, setImageData] = useState(null)

    useEffect(()=>{
        try {
            const getImageData = async () => {
                const response = await axios.get(`${API_URL}/images/en/${imageId}`)
                setImageData(response.data)
                
            }
            getImageData()
        }
        catch (error) {
            console.error(error)
        }
    },[imageId])

    if(!imageData) {
        return <p>Loading</p>
    }

  return (
    <div className='obituary-image'>
        <img className='obituary-image__image' src={`${API_URL}${imageData.url}`} alt={imageData.description}/>
    </div>
  )
}

export default ObituaryImage