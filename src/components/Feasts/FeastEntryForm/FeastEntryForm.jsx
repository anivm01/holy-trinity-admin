import { useEffect, useState } from "react";
import "./FeastEntryForm.scss";
import { API_URL } from "../../../utilities/api";
import WysiwygEdit from "../../WysiwygEdit/WysiwygEdit";
import axios from "axios";
import SingleCalendarEntryTitles from "../../Calendar/SingleCalendarEntryTitles/SingleCalendarEntryTitles";
import { FormBox } from "../../UI/FormBox/FormBox";
import Input from "../../UI/Input/Input";
import moment from "moment";
import DatetimeInput from "../../UI/DatetimeInput/DatetimeInput";

function FeastEntryForm({ formType, formTitle, entry, setEntry, onPublish }) {
  //   const [date, setDate] = useState(entry.event_date);
  const [calendarEntry, setCalendarEntry] = useState(null);
  const [inputs, setInputs] = useState({
    event_date: entry.event_date,
    title: entry.title,
    title_bg: entry.title_bg,
    is_default: entry.is_default ? true : false,
  });
  const [eventDetailsEn, setEventDetailsEn] = useState(entry.event_details);
  const [eventDetailsBg, setEventDetailsBg] = useState(entry.event_details_bg);

  useEffect(() => {
    (async function () {
      const datetime = moment(inputs.event_date).format("YYYY-MM-DD");
      try {
        const response = await axios.get(`${API_URL}/calendar/bydate`, {
          params: {
            datetime: datetime,
          },
        });
        setCalendarEntry(response.data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [inputs.event_date]);

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
      {/* <section className="feast-form__set-date">
        <label
          className="feast-form__subheading"
          htmlFor={`event-date-${formType}`}
        >
          Input the date of the event
        </label>
        <input
          className="feast-form__date-input"
          type="datetime-local"
          id={`feast-date-${formType}`}
          name="event_date"
          value={inputs.event_date}
          onChange={handleChangeInputs}
        />
      </section> */}
      <DatetimeInput
        label="Input the date of the event"
        id={`feast-date-${formType}`}
        name="event_date"
        value={inputs.event_date}
        onChange={handleChangeInputs}
      />
      {calendarEntry && (
        <section className="feast-form__calendar-entry">
          <h2 className="feast-form__subheading">
            Calendar entry for this date
          </h2>
          <div className="feast-form__single-calendar-entry">
            <SingleCalendarEntryTitles
              red={calendarEntry.red}
              cross={calendarEntry.cross}
              star={calendarEntry.star}
              title={calendarEntry.title}
            />
            <SingleCalendarEntryTitles
              red={calendarEntry.red}
              cross={calendarEntry.cross}
              star={calendarEntry.star}
              title={calendarEntry.title_bg}
            />
          </div>
        </section>
      )}
      <section className="feast-form__titles">
        <Input
          label="Enter the Event Title in English"
          id={`${formType}-title-en`}
          name="title"
          value={entry.title}
          onChange={handleChangeInputs}
          type="text"
          inputComponent="input"
        />
        <Input
          label="Въведете заглавието на Български"
          id={`${formType}-title-bg`}
          name="title_bg"
          value={entry.title_bg}
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
