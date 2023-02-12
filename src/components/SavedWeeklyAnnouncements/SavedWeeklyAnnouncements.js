import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../../utilities/api";
import { createMarkup } from "../../utilities/createMarkup";
import { dateOutputConverter, dateShorthandConverter } from "../../utilities/dateConverter";
import "./SavedWeeklyAnnouncements.scss";

function SavedWeeklyAnnouncements() {
  const [weeklyAnnouncements, setWeeklyAnnouncements] = useState([]);

  const getAnnouncements = async () => {
    try {
      const announcementsData = await axios.get(
        `${API_URL}/weekly-announcement/en`
      );
      const announcements = announcementsData.data;
      const sortedAnnouncements = announcements.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      });
      setWeeklyAnnouncements(sortedAnnouncements);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAnnouncements();
  }, []);

  if (weeklyAnnouncements.length === 0) {
    return <p>Loading...</p>;
  }
  return (
    <div className="saved-weekly-announcements">
      {weeklyAnnouncements.map((announcement, index) => {
        return (
          <Link
            className="saved-weekly-announcements__link"
            to={`${announcement.id}`}
            key={index}
          >
            <span className="saved-weekly-announcements__date">
              {dateShorthandConverter(announcement.date)}
            </span>
            <div className="saved-weekly-announcements__text">
              <h2 className="saved-weekly-announcements__title">
                {announcement.title}
              </h2>
              <div
                className="saved-weekly-announcements__content"
                dangerouslySetInnerHTML={createMarkup(announcement.announcement)}
              ></div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default SavedWeeklyAnnouncements;
