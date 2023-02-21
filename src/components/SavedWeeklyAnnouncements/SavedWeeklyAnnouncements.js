import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../../utilities/api";
import { createMarkup } from "../../utilities/createMarkup";
import {
  dateOutputConverter,
  dateShorthandConverter,
} from "../../utilities/dateConverter";
import deleteIcon from "../../assets/delete.svg";

import "./SavedWeeklyAnnouncements.scss";
import { ThreeDots } from "react-loader-spinner";

function SavedWeeklyAnnouncements() {
  const [weeklyAnnouncements, setWeeklyAnnouncements] = useState([]);
  const navigate = useNavigate();

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
  const deleteItem = async (id) => {
    try {
      await axios.delete(`${API_URL}/weekly-announcement/en/${id}`);
      navigate(0);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAnnouncements();
  }, []);

  if (weeklyAnnouncements.length === 0) {
    return <ThreeDots 
    height="80" 
    width="80" 
    radius="9"
    color="#6F0B20" 
    ariaLabel="three-dots-loading"
    wrapperStyle={{justifyContent: "center"}}
    wrapperClassName=""
    visible={true}
     />;
  }
  return (
    <div className="saved-weekly-announcements">
      {weeklyAnnouncements.map((announcement, index) => {
        return (
          <div
            className="saved-weekly-announcements__single"
            to={`${announcement.id}`}
            key={index}
          >
            <button
              className="saved-weekly-announcements__delete"
              onClick={() => {
                deleteItem(announcement.id);
              }}
              type="button"
            >
              <img
                className="saved-weekly-announcements__icon"
                src={deleteIcon}
                alt="delete"
              />
            </button>
            <span className="saved-weekly-announcements__date">
              {dateShorthandConverter(announcement.date)}
            </span>
            <Link
              to={`${announcement.id}`}
              className="saved-weekly-announcements__text"
            >
              <h2 className="saved-weekly-announcements__title">
                {announcement.title}
              </h2>
              <div
                className="saved-weekly-announcements__content"
                dangerouslySetInnerHTML={createMarkup(
                  announcement.announcement
                )}
              ></div>
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default SavedWeeklyAnnouncements;
