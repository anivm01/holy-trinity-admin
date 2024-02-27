import React from "react";

function SingleCalendarEntryTitles({ red, cross, star, title }) {

    return (
        <div className={`calendar-single__entry ${red ? "calendar-single__red" : ""}`}>
            <p className="calendar-single__title">
                <span className="calendar-single__prefix">{cross ? "† " : ""}</span>
                <span className="calendar-single__prefix">{star ? "* " : ""}</span>
                {title}</p>
        </div>
    );
}

export default SingleCalendarEntryTitles;
