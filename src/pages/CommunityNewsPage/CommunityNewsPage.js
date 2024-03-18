import './CommunityNewsPage.scss'
import { Link } from "react-router-dom"
import SavedCommuityNews from '../../components/SavedCommunityNews/SavedCommunityNews'
import { useState } from 'react';
import PageHeader from "../../components/UI/PageHeader/PageHeader";
import DraftPublishToggle from '../../components/DraftPublishToggle/DraftPublishToggle';
import { API_URL } from '../../utilities/api';

function CommunityNewsPage() {
  const [draft, setDraft] = useState(false);

  return (
    <section className='community-news-page'>
      <PageHeader title="Community News">
        <DraftPublishToggle setDraft={setDraft} />
        <Link className='community-news-page__link' to="/community-news/add-new">Add New</Link>
      </PageHeader>
      {draft && (
        <SavedCommuityNews url={`${API_URL}/drafts/en/articles`} />
      )}
      {!draft && (
        <SavedCommuityNews
          url={`${API_URL}/published/en/articles`}
        />
      )}
    </section>
  )
}

export default CommunityNewsPage