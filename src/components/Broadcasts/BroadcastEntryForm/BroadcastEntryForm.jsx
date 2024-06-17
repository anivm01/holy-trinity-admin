import DatetimeInput from "../../UI/DatetimeInput/DatetimeInput";
import { FormBox } from "../../UI/FormBox/FormBox";
import Input from "../../UI/Input/Input";
import "./BroadcastEntryForm.scss";
function BroadcastEntryFrom({ formTitle, entry, handleChange, onPublish }) {
  return (
    <FormBox formTitle={formTitle} onPublish={onPublish}>
      <div className="broadcast-form__top">
        <DatetimeInput
          label="Broadcast Time:"
          id={`broadcastTime`}
          name="broadcast_time"
          value={entry.broadcast_time}
          onChange={handleChange}
        />
        <Input
          label="Enter the Youtube Video ID"
          id="broadcast-youtube-id"
          name="youtube_video_id"
          value={entry.youtube_video_id}
          onChange={handleChange}
          type="text"
          inputComponent="input"
        />
      </div>
      <div className="broadcast-form__main">
        <div className="broadcast-form__titles">
          <Input
            label="Enter the title"
            id="broadcast-title"
            name="title"
            value={entry.title}
            onChange={handleChange}
            type="text"
            inputComponent="input"
          />
          <Input
            label="Заглавие на видеото"
            id="broadcast-title-bg"
            name="title_bg"
            value={entry.title_bg}
            onChange={handleChange}
            type="text"
            inputComponent="input"
          />
        </div>
        <div className="broadcast-form__titles">
          <Input
            label="Enter the heading for the home page"
            id="broadcast-heading"
            name="heading"
            value={entry.heading}
            onChange={handleChange}
            type="text"
            inputComponent="input"
          />
          <Input
            label="Въведете заглавието за началната страница"
            id="broadcast-heading-bg"
            name="heading_bg"
            value={entry.heading_bg}
            onChange={handleChange}
            type="text"
            inputComponent="input"
          />
        </div>
      </div>
    </FormBox>
  );
}

export default BroadcastEntryFrom;
