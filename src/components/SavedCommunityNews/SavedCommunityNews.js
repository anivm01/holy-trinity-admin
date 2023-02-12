import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { API_URL, communityNewsSlug } from '../../utilities/api'
import { createMarkup } from '../../utilities/createMarkup'
import { sortNewestToOldest } from '../../utilities/sort'
import ImagePreview from '../ImagePreview/ImagePreview'
import './SavedCommunityNews.scss'

function SavedCommuityNews() {
    const [articles, setArticles] = useState([])

    const getArticles = async () => {
        try{
            const response = await axios.get(`${API_URL}${communityNewsSlug}/en`)
            setArticles(sortNewestToOldest(response.data))
        }
        catch (error) {
            console.error(error)
        }
    }
    
    useEffect(()=> {
        getArticles()
    }, [])


    if(articles.length === 0) {
        return <p>Loading...</p>
    }
  return (
    <div className='saved-community-news'>
        {articles.map((single, index)=> {
            return (
                <Link to={`${single.id}`} className='saved-community-news__link' key={index}>
                    <div className='saved-community-news__left'>
                        <ImagePreview imageId={single.featured_img_id} />
                    </div>
                    <div className='saved-community-news__text'>
                        <h2 className='saved-community-news__title'>{single.title}</h2>
                        <div className='saved-community-news__content' dangerouslySetInnerHTML={createMarkup(single.content)}></div>
                    </div>
                </Link>
            )
        })}
    </div>
  )
}

export default SavedCommuityNews