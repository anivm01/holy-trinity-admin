import { NavLink, useNavigate } from "react-router-dom";
import "./Dashboard.scss";
import logo from "../../assets/church-logo.png";
import announcement from "../../assets/announcement.svg";
import video from "../../assets/video.svg";
import event from "../../assets/event.svg";
import calendar from "../../assets/calendar.svg";
import resources from "../../assets/resources.svg"
import news from "../../assets/news.svg";
import cross from "../../assets/cross-beige.svg";
import gallery from "../../assets/gallery.svg";
import { LoggedInUpdate, useLoggedIn } from "../../utilities/LoggedInContext";

function Dashboard() {
  const loggedIn = useLoggedIn();
  const navigate = useNavigate();
  const changeLoggedIn = LoggedInUpdate();
  const logout = () => {
    sessionStorage.removeItem("authToken");
    if (loggedIn) {
      changeLoggedIn();
      navigate("/");
    }
  };
  if (!loggedIn) {
    return (
      <section className="dashboard">
        <NavLink className="dashboard__home" to="/">
          <img className="dashboard__logo" src={logo} alt="logo" />
        </NavLink>
      </section>
    );
  }
  return (
    <section className="dashboard">
      <NavLink className="dashboard__home" to="/">
        <img className="dashboard__logo" src={logo} alt="logo" />
      </NavLink>
      <ul className="dashboard__list">
        <li className="dashboard__item">
          <NavLink className="dashboard__link" to="/weekly-announcements">
            <img
              className="dashboard__icon"
              src={announcement}
              alt="announcement icon"
            />
            <span className="dashboard__text">Weekly Announcements</span>
          </NavLink>
        </li>
        <li className="dashboard__item">
          <NavLink className="dashboard__link" to="/worship-offices">
            <img className="dashboard__icon" src={video} alt="video icon" />
            <span className="dashboard__text">Worship Offices</span>
          </NavLink>
        </li>
        <li className="dashboard__item">
          <NavLink className="dashboard__link" to="/events">
            <img className="dashboard__icon" src={event} alt="video icon" />
            <span className="dashboard__text">Events</span>
          </NavLink>
        </li>
        <li className="dashboard__item">
          <NavLink className="dashboard__link" to="/calendar">
            <img className="dashboard__icon" src={calendar} alt="video icon" />
            <span className="dashboard__text">Calendar</span>
          </NavLink>
        </li>
        <li className="dashboard__item">
          <NavLink className="dashboard__link" to="/community-news">
            <img className="dashboard__icon" src={news} alt="video icon" />
            <span className="dashboard__text">Community News</span>
          </NavLink>
        </li>
        <li className="dashboard__item">
          <NavLink className="dashboard__link" to="/obituaries">
            <img className="dashboard__icon" src={cross} alt="video icon" />
            <span className="dashboard__text">Obituaries</span>
          </NavLink>
        </li>
        <li className="dashboard__item">
          <NavLink className="dashboard__link" to="/resources">
            <img className="dashboard__icon" src={resources} alt="video icon" />
            <span className="dashboard__text">Resources</span>
          </NavLink>
        </li>
        <li className="dashboard__item">
          <NavLink className="dashboard__link" to="/image-gallery">
            <img className="dashboard__icon" src={gallery} alt="video icon" />
            <span className="dashboard__text">Image Gallery</span>
          </NavLink>
        </li>
        <li className="dashboard__item">
          <button
            onClick={() => {
              logout();
            }}
            className="dashboard__button"
          >
            <span className="dashboard__text">Logout</span>
          </button>
        </li>
      </ul>
      <a href="https://ourholytrinitymbc.com" className="button">
        Live Site
      </a>
    </section>
  );
}

export default Dashboard;
