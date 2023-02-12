import './CommunityNewsPage.scss'
import { Link } from "react-router-dom"
import SavedCommuityNews from '../../components/SavedCommunityNews/SavedCommunityNews'

function CommunityNewsPage() {

    
  return (
    <section className='community-news-page'>
      <Link className='community-news-page__link' to="/community-news/add-new">Add New</Link>
      <SavedCommuityNews />
    </section>
    )
}

export default CommunityNewsPage