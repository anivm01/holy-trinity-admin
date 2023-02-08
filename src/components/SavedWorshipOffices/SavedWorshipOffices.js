import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { API_URL, worshipOfficeSlug } from '../../utilities/api'
import { dateShorthandConverter } from '../../utilities/dateConverter'
import ImagePreview from '../ImagePreview/ImagePreview'
import './SavedWorshipOffices.scss'

function SavedWorshipOffices() {
    const [worshipOffices, setWorshipOffices] = useState([])

    const getWorshipOffices = async () => {
        try{
            const response = await axios.get(`${API_URL}${worshipOfficeSlug}/en`)
            const worshipOfficesArray = response.data
            const sortedArray = worshipOfficesArray.sort( (a,b) => {
                return new Date(b.date) - new Date(a.date);
            })
            setWorshipOffices(sortedArray)
        }
        catch (error) {
            console.error(error)
        }
    }
    
    useEffect(()=> {
        getWorshipOffices()
    }, [])


    if(worshipOffices.length === 0) {
        return <p>Loading...</p>
    }
  return (
    <div className='saved-worship-office'>
        {worshipOffices.map((single, index)=> {
            return (
                <div className='saved-worship-office__link' key={index}>
                    <span className='saved-worship-office__date'>{dateShorthandConverter(single.date)}</span>
                    <ImagePreview imageId={single.thumbnail_id} />
                    <div className='saved-worship-office__bottom'>
                        <h2 className='saved-worship-office__title'>{single.title}</h2>
                    </div>
                </div>
            )
        })}
    </div>
  )
}

export default SavedWorshipOffices