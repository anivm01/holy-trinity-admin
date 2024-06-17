import "./SingleBroadcast.scss"

import React from "react";
import LinkWithIcon from "../../UI/LinkWithIcon/LinkWithIcon";
import { wholeDateObjectConverter } from "../../../utilities/dateConverter";
import EditBroadcast from "../EditBroadcast/EditBroadcast";
import DeleteBroadcast from "../DeleteBroadcast/DeleteBroadcast";

function SingleBroadcast({ single }) {
    const localTime = new Date(single.broadcast_time)
    const date = wholeDateObjectConverter(localTime)

    return (
        <div className="single-broadcast" key={single.id}>
            <div className="single-broadcast__header">
                <span>
                    {date.month} {date.date}
                </span>
                <span>{date.day}</span>
                <span>{date.year}</span>
            </div>
            <div className="single-broadcast__main">
                <img className="single-broadcast__image"
                    src={`https://img.youtube.com/vi/${single.youtube_video_id}/maxresdefault.jpg`}
                    alt={single.title} />
                <div className="single-broadcast__content">
                    <h3>{single.title}</h3>
                    <h3>{single.title_bg}</h3>
                    <p>Time: {date.time}</p>
                    <LinkWithIcon text="Youtube Link" href={`https://www.youtube.com/watch?v=${single.youtube_video_id}`} className />
                </div>
                <div className="single-broadcast__buttons">
                    <EditBroadcast single={single} />
                    <DeleteBroadcast id={single.id} />
                </div>
            </div>
        </div>
    );
}

export default SingleBroadcast;
