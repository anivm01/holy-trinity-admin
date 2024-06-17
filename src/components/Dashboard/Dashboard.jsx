import { NavLink } from "react-router-dom";
import "./Dashboard.scss";
import logo from "../../assets/church-logo.png";
import { useLoggedIn } from "../../utilities/LoggedInContext";
import { DashboardContnet } from "./DashboardContent";

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
        {DashboardContnet.map((single, index) => {
          return (
            <NavLink key={index} className="dashboard__link" to={single.slug}>
              <div className="dashboard__icon">
                <single.svg />
              </div>
              <span className="dashboard__text">{single.item}</span>
            </NavLink>
          );
        })}
      </ul>

      <a href="https://ourholytrinitymbc.com" className="button">
        Live Site
      </a>
    </section>
  );
}

export default Dashboard;
