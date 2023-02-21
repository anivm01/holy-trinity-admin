import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { API_URL, worshipOfficeSlug } from '../../utilities/api'
import { dateShorthandConverter } from '../../utilities/dateConverter'
import { sortNewestToOldest } from '../../utilities/sort'
import ImagePreview from '../ImagePreview/ImagePreview'
import './SavedWorshipOffices.scss'
import deleteIcon from "../../assets/delete.svg"


function SavedWorshipOffices() {
    const [worshipOffices, setWorshipOffices] = useState([])

    const navigate = useNavigate()

    const getWorshipOffices = async () => {
        try{
            const response = await axios.get(`${API_URL}${worshipOfficeSlug}/en`)
            console.log(response.data)
            setWorshipOffices(sortNewestToOldest(response.data))
        }
        catch (error) {
            console.error(error)
        }
    }
    
    const deleteItem = async (id) => {
        try {
            await axios.delete(`${API_URL}${worshipOfficeSlug}/en/${id}`);
            navigate(0)            
        }
        catch (error) {
            console.log(error)
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
        {worshipOffices.map((single, index) => {
            return (
                <div className='saved-worship-office__single' key={index}>
                    <Link to={`${single.id}`} className='saved-worship-office__link'>
                        <ImagePreview imageId={single.thumbnail_id} />
                    </Link>
                    <span className='saved-worship-office__date'>{dateShorthandConverter(single.date)}</span>
                    <button className='saved-worship-office__delete' onClick={()=>{deleteItem(single.id)}} type='button'>
                        <img className='saved-worship-office__icon' src={deleteIcon} alt="delete" />
                    </button>
                </div>
            )
        })}
    </div>
  )
}

export default SavedWorshipOffices