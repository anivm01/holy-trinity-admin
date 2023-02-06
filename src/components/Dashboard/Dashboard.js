import { NavLink } from 'react-router-dom'
import './Dashboard.scss'

function Dashboard() {
  return (
    <section className='dashboard'>
        <ul className='dashboard__list'>
            <li className='dashboard__item'>
                <NavLink className='dashboard__link' to="/weekly-announcements">Weekly Announcements</NavLink>
            </li>
            <li className='dashboard__item'>
                <NavLink className='dashboard__link' to="/worship-offices">Worship Offices</NavLink>
            </li>
            <li className='dashboard__item'>
                <NavLink className='dashboard__link' to="/events">Events</NavLink>
            </li>
            <li className='dashboard__item'>
                <NavLink className='dashboard__link' to="/community-news">Community News</NavLink>
            </li>
            <li className='dashboard__item'>
                <NavLink className='dashboard__link' to="/obituaries">Obituaries</NavLink>
            </li>
        </ul>
    </section>
  )
}

export default Dashboard