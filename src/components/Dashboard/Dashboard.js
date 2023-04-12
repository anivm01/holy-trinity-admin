import { NavLink } from "react-router-dom";
import "./Dashboard.scss";
import logo from "../../assets/church-logo.png";
import announcement from "../../assets/announcement.svg";
import video from "../../assets/video.svg";
import event from "../../assets/event.svg";
import news from "../../assets/news.svg";
import cross from "../../assets/cross-beige.svg";
import gallery from "../../assets/gallery.svg";
import { useLoggedIn } from "../../utilities/LoggedInContext";

function Dashboard() {
  const loggedIn = useLoggedIn();
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
          <NavLink className="dashboard__link" to="/image-gallery">
            <img className="dashboard__icon" src={gallery} alt="video icon" />
            <span className="dashboard__text">Image Gallery</span>
          </NavLink>
        </li>
      </ul>
    </section>
  );
}

export default Dashboard;
