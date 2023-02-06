import './WeeklyAnnouncementsPage.scss'
import { Link } from "react-router-dom"
import SavedWeeklyAnnouncements from '../../components/SavedWeeklyAnnouncements/SavedWeeklyAnnouncements'

function WeeklyAnnouncementsPage() {

    
  return (
    <section className='weekly-announcements-page'>
    <Link className='weekly-announcements-page__link' to="/weekly-announcements/add-new">Add New</Link>
    <SavedWeeklyAnnouncements />
    </section>
    )
}

export default WeeklyAnnouncementsPage