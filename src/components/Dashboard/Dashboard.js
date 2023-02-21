import { NavLink } from 'react-router-dom'
import './Dashboard.scss'
import logo from '../../assets/church-logo.png'

function Dashboard() {
  return (
    <section className='dashboard'>
        <NavLink className='dashboard__home' to="/">
            <img className='dashboard__logo' src={logo} alt="logo" />
        </NavLink>
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
            <li className='dashboard__item'>
                <NavLink className='dashboard__link' to="/image-gallery">Image Gallery</NavLink>
            </li>
        </ul>
    </section>
  )
}

export default Dashboard