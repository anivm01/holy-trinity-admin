import React, { useState, useEffect, useRef } from "react";
import "./CalendarDisplay.scss";
import CalendarDisplayEntry from "../CalendarDisplayEntry/CalendarDisplayEntry";
import ArrowIcon from "../../../assets/svg/ArrowIcon/ArrowIcon";

const CalendarDisplay = ({ data }) => {
  const [currentMonthIndex, setCurrentMonthIndex] = useState(
    new Date().getMonth()
  );
  const currentDateRef = useRef(null);

  useEffect(() => {
    // Scroll to the current date when the component mounts
    if (currentDateRef.current) {
      currentDateRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [currentMonthIndex, data]);

  const handleNextMonth = () => {
    setCurrentMonthIndex((prevIndex) => (prevIndex + 1) % 12); // Cycle to the next month
  };

  const handlePrevMonth = () => {
    setCurrentMonthIndex((prevIndex) => (prevIndex - 1 + 12) % 12); // Cycle to the previous month
  };

  const currentMonthData = data[currentMonthIndex] || []; // Data for the current month
  const currentDate = new Date().getDate();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div className="calendar-carousel">
      <div className="calendar-carousel__header">
        <button className="calendar-carousel__button" onClick={handlePrevMonth}>
          <ArrowIcon className="calendar-carousel__arrow-left" />
        </button>
        <h2 className="calendar-carousel__month">
          {monthNames[currentMonthIndex]}
        </h2>
        <button className="calendar-carousel__button" onClick={handleNextMonth}>
          <ArrowIcon className="calendar-carousel__arrow-right" />
        </button>
      </div>
      <div className="calendar-carousel__content">
        {currentMonthData.length > 0 ? (
          <div className="calendar-carousel__list">
            {currentMonthData.map((day, index) => (
              <CalendarDisplayEntry
                key={index}
                single={day}
                ref={
                  currentDate === new Date(day.date).getDate()
                    ? currentDateRef
                    : null
                }
              />
            ))}
          </div>
        ) : (
          <p>No data for this month.</p>
        )}
      </div>
    </div>
  );
};

export default CalendarDisplay;
