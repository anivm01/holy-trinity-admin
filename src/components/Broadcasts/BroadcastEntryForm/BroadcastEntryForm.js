import Button from "../../UI/Button/Button";
import FormHeading from "../../UI/FormHeading/FormHeading";
import Input from "../../UI/Input/Input";
import "./BroadcastEntryForm.scss"
function BroadcastEntryFrom({ formTitle, entry, handleChange, onPublish }) {

    return (
        <form className="broadcast-form">
            <FormHeading title={formTitle} />
            <div className="broadcast-form__time">
                <label htmlFor="broadcastTime">Broadcast Time:</label>
                <input
                    type="datetime-local"
                    id="broadcastTime"
                    name="broadcast_time"
                    value={entry.broadcast_time}
                    onChange={handleChange}
                />
            </div>
            <div className="broadcast-form__main">
                <Input
                    label="Enter the title"
                    id="broadcast-title"
                    name="title"
                    value={entry.title}
                    onChange={handleChange}
                    type="text"
                    inputComponent="input" />
                <Input
                    label="Заглавие на видеото"
                    id="broadcast-title-bg"
                    name="title_bg"
                    value={entry.title_bg}
                    onChange={handleChange}
                    type="text"
                    inputComponent="input" />
                <Input
                    label="Enter the Youtube Video ID"
                    id="broadcast-youtube-id"
                    name="youtube_video_id"
                    value={entry.youtube_video_id}
                    onChange={handleChange}
                    type="text"
                    inputComponent="input" />
                <Input
                    label="Enter the like for the Thumbnail"
                    id="broadcast-thumbnail"
                    name="featured_image_url"
                    value={entry.featured_image_url}
                    onChange={handleChange}
                    type="text"
                    inputComponent="input" />
            </div>

            <Button
                text="Save"
                type="submit"
                onClick={onPublish}
            />
        </form>
    );
}

export default BroadcastEntryFrom;
