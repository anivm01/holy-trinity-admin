import "./CalendarEntryForm.scss";
import DatetimeInput from "../../UI/DatetimeInput/DatetimeInput";
import { FormBox } from "../../UI/FormBox/FormBox";
import Input from "../../UI/Input/Input";

function CalendarEntryForm({
  formType,
  formTitle,
  entry,
  handleChange,
  onPublish,
}) {
  return (
    <FormBox formTitle={formTitle} onPublish={onPublish}>
      <DatetimeInput
        label="Input the date of the feast"
        id={`calendar-event-time-${formType}`}
        name="date"
        value={entry.date}
        onChange={handleChange}
      />
      <section className="calendar-form__type">
        <input
          id={`crossBool${formType}`}
          type="checkbox"
          name="cross"
          checked={entry.cross}
          onChange={handleChange}
        />
        <label htmlFor={`crossBool${formType}`}>†</label>
        <input
          id={`starBool${formType}`}
          type="checkbox"
          name="star"
          checked={entry.star}
          onChange={handleChange}
        />
        <label htmlFor={`starBool${formType}`}>*</label>
        <input
          id={`boldBool${formType}`}
          type="checkbox"
          name="bold"
          checked={entry.bold}
          onChange={handleChange}
        />
        <label htmlFor={`boldBool${formType}`}>Bold</label>
        <input
          id={`redBool${formType}`}
          type="checkbox"
          name="red"
          checked={entry.red}
          onChange={handleChange}
        />
        <label htmlFor={`redBool${formType}`}>Red</label>
      </section>
      <Input
        label="English Entry"
        id={`${formType}-title-en`}
        name="title"
        value={entry.title}
        onChange={handleChange}
        type="text"
        inputComponent="input"
      />
      <Input
        label="На Български"
        id={`${formType}-title-en`}
        name="title_bg"
        value={entry.title_bg}
        onChange={handleChange}
        type="text"
        inputComponent="input"
      />
    </FormBox>
  );
}

export default CalendarEntryForm;
