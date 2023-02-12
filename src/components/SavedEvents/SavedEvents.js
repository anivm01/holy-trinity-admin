import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {API_URL, eventSlug} from '../../utilities/api'
import { dateOutputConverter, dateShorthandConverter } from '../../utilities/dateConverter'
import { sortNewestToOldest } from '../../utilities/sort'
import './SavedEvents.scss'

function SavedEvents( ) {

    const [events, setEvents] = useState([])
    
    const getEnvents = async () => {
        try{
            const response = await axios.get(`${API_URL}${eventSlug}/en`)
            setEvents(sortNewestToOldest(response.data))
        }
        catch (error) {
            console.error(error)
        }
    }
    
    useEffect(()=> {
        getEnvents()
    }, [])


    if(events.length === 0) {
        return <p>Loading...</p>
    }
  return (
    <div className='saved-events'>
        {events.map((single, index) => {
        return (
            <Link className='saved-events__link' to={`${single.id}`} key={index}>
                <span className='saved-events__date'>{dateShorthandConverter(single.date)}</span>
                <h2 className='saved-events__title'>{single.title}</h2>
            </Link>
        )
    })}
    </div>
    
  )
}

export default SavedEvents