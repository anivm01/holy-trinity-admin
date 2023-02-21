import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL, eventSlug } from "../../utilities/api";
import { dateShorthandConverter } from "../../utilities/dateConverter";
import { sortNewestToOldest } from "../../utilities/sort";
import "./SavedEvents.scss";
import deleteIcon from "../../assets/delete-beige.svg";

function SavedEvents() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  const getEnvents = async () => {
    try {
      const response = await axios.get(`${API_URL}${eventSlug}/en`);
      setEvents(sortNewestToOldest(response.data));
    } catch (error) {
      console.error(error);
    }
  };
  const deleteItem = async (id) => {
    try {
      await axios.delete(`${API_URL}${eventSlug}/en/${id}`);
      navigate(0);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEnvents();
  }, []);

  if (events.length === 0) {
    return <p>Loading...</p>;
  }
  return (
    <div className="saved-events">
      {events.map((single, index) => {
        return (
          <div className="saved-events__box" key={index}>
            <div className="saved-events__banner">
              <span className="saved-events__date">
                {dateShorthandConverter(single.date)}
              </span>
              <button
                className="saved-events__delete"
                onClick={() => {
                  deleteItem(single.id);
                }}
                type="button"
              >
                <img
                  className="saved-events__icon"
                  src={deleteIcon}
                  alt="delete"
                />
              </button>
            </div>
            <Link className="saved-events__link" to={`${single.id}`}>
                <h2 className="saved-events__title">{single.title}</h2>
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default SavedEvents;
