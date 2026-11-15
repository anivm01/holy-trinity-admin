import { useEffect, useState } from "react";
import "./FeastEntryForm.scss";
import WysiwygEdit from "../../WysiwygEdit/WysiwygEdit";
import { FormBox } from "../../UI/FormBox/FormBox";
import Input from "../../UI/Input/Input";
import DatetimeInput from "../../UI/DatetimeInput/DatetimeInput";
import { getCalendarTitleExcerpt } from "./calendarTitle";

function FeastEntryForm({
  formType,
  formTitle,
  entry,
  setEntry,
  selectedCalendarEntry,
  onPublish,
}) {
  const [inputs, setInputs] = useState({
    event_date: entry.event_date,
    title: entry.title,
    title_bg: entry.title_bg,
    is_default: entry.is_default ? true : false,
  });
  const [eventDetailsEn, setEventDetailsEn] = useState(entry.event_details);
  const [eventDetailsBg, setEventDetailsBg] = useState(entry.event_details_bg);

  useEffect(() => {
    if (!selectedCalendarEntry) {
      return;
    }

    setInputs((currentInputs) => {
      const selectedDate = String(selectedCalendarEntry.date || "").split(
        /[T ]/,
      )[0];

      if (!selectedDate) {
        return currentInputs;
      }

      const currentTime = currentInputs.event_date?.split("T")[1] || "10:30";
      const eventDate = `${selectedDate}T${currentTime}`;
      const title = getCalendarTitleExcerpt(selectedCalendarEntry.title);
      const titleBg = getCalendarTitleExcerpt(selectedCalendarEntry.title_bg);

      if (
        currentInputs.event_date === eventDate &&
        currentInputs.title === title &&
        currentInputs.title_bg === titleBg
      ) {
        return currentInputs;
      }

      return {
        ...currentInputs,
        event_date: eventDate,
        title,
        title_bg: titleBg,
      };
    });
  }, [selectedCalendarEntry]);

  useEffect(() => {
    setEntry({
      event_date: inputs.event_date,
      title: inputs.title,
      title_bg: inputs.title_bg,
      is_default: inputs.is_default,
      event_details: !inputs.is_default ? eventDetailsEn : "",
      event_details_bg: !inputs.is_default ? eventDetailsBg : "",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputs, eventDetailsEn, eventDetailsBg]);

  const handleChangeInputs = (event) => {
    const { name, value, type } = event.target;
    let finalValue = value;
    if (type === "radio") {
      finalValue = value === "true";
    }
    setInputs((prevState) => ({
      ...prevState,
      [name]: finalValue,
    }));
  };

  return (
    <FormBox formTitle={formTitle} onPublish={onPublish}>
      <DatetimeInput
        label="Input the date of the event"
        id={`feast-date-${formType}`}
        name="event_date"
        value={inputs.event_date}
        onChange={handleChangeInputs}
      />
      <section className="feast-form__titles">
        <Input
          label="Enter the Event Title in English"
          id={`${formType}-title-en`}
          name="title"
          value={inputs.title}
          onChange={handleChangeInputs}
          type="text"
          inputComponent="input"
        />
        <Input
          label="Въведете заглавието на Български"
          id={`${formType}-title-bg`}
          name="title_bg"
          value={inputs.title_bg}
          onChange={handleChangeInputs}
          type="text"
          inputComponent="input"
        />
      </section>
      <section className="feast-form__content">
        <label
          className={`feast-form__content-option ${
            inputs.is_default === true ? "selected" : ""
          }`}
          htmlFor="default-event"
        >
          Divine Liturgy | Света Литургия
        </label>
        <input
          className="feast-form__content-radio"
          type="radio"
          name="is_default"
          id="default-event"
          value={true}
          checked={inputs.is_default === true}
          onChange={handleChangeInputs}
        />
        <label
          className={`feast-form__content-option ${
            inputs.is_default === false ? "selected" : ""
          }`}
          htmlFor="custom-event"
        >
          Custom
        </label>
        <input
          className="feast-form__content-radio"
          type="radio"
          name="is_default"
          id="custom-event"
          value={false}
          checked={inputs.is_default === false}
          onChange={handleChangeInputs}
        />

        {!inputs.is_default && (
          <div>
            <WysiwygEdit
              editorLabel="Enter the main content:"
              setContent={setEventDetailsEn}
              content={eventDetailsEn}
            />

            <WysiwygEdit
              editorLabel="Въведете основното съдържание:"
              setContent={setEventDetailsBg}
              content={eventDetailsBg}
            />
          </div>
        )}
      </section>
    </FormBox>
  );
}

export default FeastEntryForm;
