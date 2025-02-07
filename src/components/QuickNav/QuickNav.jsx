import { NavLink } from "react-router-dom";
import "./QuickNav.scss";
import announcement from "../../assets/announcement.svg";
import video from "../../assets/video.svg";
import event from "../../assets/event.svg";
// import news from "../../assets/news.svg";
// import cross from "../../assets/cross-beige.svg";
import calendar from "../../assets/calendar.svg";
import { useLoggedIn, LoggedInUpdate } from "../../utilities/LoggedInContext";
import Login from "../Login/Login";

function QuickNav() {
  const loggedIn = useLoggedIn();
  const changeLoggedIn = LoggedInUpdate();
  const logout = () => {
    sessionStorage.removeItem("authToken");
    if (loggedIn) {
      changeLoggedIn();
    }
  };
  if (!loggedIn) {
    return <Login />;
  }
  if (loggedIn) {
    return (
      <div className="quick-nav">
        <h2 className="quick-nav__title">
          Welcome to the Holy Trinity Macedono Bulgarian Christian Orthodox
          Church Admin Website
        </h2>
        <button
          onClick={() => {
            logout();
          }}
          className="quick-nav__link"
          to="/login"
        >
          <span className="quick-nav__text">Logout</span>
        </button>
        <ul className="quick-nav__list">
          <li className="quick-nav__item">
            <NavLink
              className="quick-nav__link"
              to="/announcement"
            >
              <img
                className="quick-nav__icon"
                src={announcement}
                alt="announcement icon"
              />
              <span className="quick-nav__text">
                Change the Announcement
              </span>
            </NavLink>
          </li>
          <li className="quick-nav__item">
            <NavLink className="quick-nav__link" to="/broadcasts">
              <img className="quick-nav__icon" src={video} alt="video icon" />
              <span className="quick-nav__text">Add a new Broadcast</span>
            </NavLink>
          </li>
          <li className="quick-nav__item">
            <NavLink className="quick-nav__link" to="/feasts">
              <img className="quick-nav__icon" src={event} alt="event icon" />
              <span className="quick-nav__text">Add a new Feast</span>
            </NavLink>
          </li>
          {/* <li className="quick-nav__item">
            <NavLink className="quick-nav__link" to="/community-news/add-new">
              <img className="quick-nav__icon" src={news} alt="news icon" />
              <span className="quick-nav__text">Add New Community News</span>
            </NavLink>
          </li>
          <li className="quick-nav__item">
            <NavLink className="quick-nav__link" to="/obituaries/add-new">
              <img className="quick-nav__icon" src={cross} alt="cross icon" />
              <span className="quick-nav__text">Add New Obituary</span>
            </NavLink>
          </li> */}
          <li className="quick-nav__item">
            <NavLink className="quick-nav__link" to="/calendar">
              <img className="quick-nav__icon" src={calendar} alt="icon" />
              <span className="quick-nav__text">Update Calendar</span>
            </NavLink>
          </li>
        </ul>
      </div>
    );
  }
}

export default QuickNav;
