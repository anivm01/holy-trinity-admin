import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { API_URL, obituarySlug } from '../../utilities/api'
import { createMarkup } from '../../utilities/createMarkup'
import { sortNewestToOldest } from '../../utilities/sort'
import cross from '../../assets/cross.svg'
import './SavedObituaries.scss'

function SavedObituaries() {
    const [obituaries, setObituaries] = useState([])

    const getObituaries = async () => {
        try{
            const response = await axios.get(`${API_URL}${obituarySlug}/en`)
            setObituaries(sortNewestToOldest(response.data))
        }
        catch (error) {
            console.error(error)
        }
    }
    
    useEffect(()=> {
        getObituaries()
    }, [])


    if(obituaries.length === 0) {
        return <p>Loading...</p>
    }
  return (
    <div className='saved-obituaries'>
        {obituaries.map((single, index)=> {
            return (
                <Link to={`${single.id}`} className='saved-obituaries__link' key={index}>
                    <img className='saved-obituaries__icon' src={cross} alt='cross' />
                    <h2 className='saved-obituaries__title'>{single.name}</h2>
                    <h2 className='saved-obituaries__title'>{single.years}</h2>
                    <div className='saved-obituaries__content' dangerouslySetInnerHTML={createMarkup(single.obituary)}></div>
                </Link>
            )
        })}
    </div>
  )
}

export default SavedObituaries