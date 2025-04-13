import DatetimeInput from "../../UI/DatetimeInput/DatetimeInput";
import { FormBox } from "../../UI/FormBox/FormBox";
import Input from "../../UI/Input/Input";
import Wysiwyg from "../../UI/Wysiwyg/Wysiwyg";
import "./VideoEntryForm.scss";

function VideoEntryFrom({
  formTitle,
  entry,
  handleChange,
  onPublish,
  setCommentary,
  commentary,
}) {
  return (
    <FormBox formTitle={formTitle} onPublish={onPublish}>
      <div className="video-form__top">
        <DatetimeInput
          label="Date:"
          id={`uploadDate`}
          name="upload_date"
          value={entry.upload_date}
          onChange={handleChange}
        />
        <Input
          label="Enter the Youtube Video ID"
          id="video-youtube-id"
          name="youtube_video_id"
          value={entry.youtube_video_id}
          onChange={handleChange}
          type="text"
          inputComponent="input"
        />
      </div>
      <div className="video-form__main">
        <div className="video-form__titles">
          <Input
            label="Enter the title"
            id="video-title"
            name="title"
            value={entry.title}
            onChange={handleChange}
            type="text"
            inputComponent="input"
          />
        </div>
        <Wysiwyg
          editorLabel="Enter commentary (optional) - Don't use emojis"
          setContent={setCommentary}
          content={commentary}
        />
      </div>
    </FormBox>
  );
}

export default VideoEntryFrom;
