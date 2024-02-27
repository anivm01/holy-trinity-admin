import { useEffect, useState } from "react";
import "./EventEntryForm.scss";
import { API_URL } from "../../../utilities/api";
import {
    dateInputConverter,
    dateOutputConverter,
} from "../../../utilities/dateConverter";
import WysiwygEdit from "../../WysiwygEdit/WysiwygEdit";
import OneLineInputUpdated from "../../OneLineInputUpdated/OneLineInputUpdated";
import axios from "axios";
import SingleCalendarEntryTitles from "../../Calendar/SingleCalendarEntryTitles/SingleCalendarEntryTitles";


function EventEntryForm({ formType, formTitle, entry, setEntry, onPublish }) {
    const [date, setDate] = useState(entry.event_date);
    const [calendarEntry, setCalendarEntry] = useState(null)
    const [inputs, setInputs] = useState(
        {
            title: entry.title,
            title_bg: entry.title_bg,
            is_default: entry.is_default ? true : false,

        }
    )
    const [eventDetailsEn, setEventDetailsEn] = useState(entry.event_details)
    const [eventDetailsBg, setEventDetailsBg] = useState(entry.event_details_bg)

    useEffect(() => {
        (async function () {
            try {
                const response = await axios.get(`${API_URL}/calendar/bydate/${date}`);
                setCalendarEntry(response.data);
            } catch (err) {
                console.log(err)
            }
        })()
    }, [date])

    useEffect(() => {
        setEntry({
            event_date: date,
            title: inputs.title,
            title_bg: inputs.title_bg,
            is_default: inputs.is_default,
            event_details: !inputs.is_default ? eventDetailsEn : "",
            event_details_bg: !inputs.is_default ? eventDetailsBg : ""
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [date, inputs, eventDetailsEn, eventDetailsBg])



    const handleChangeInputs = (event) => {
        const { name, value, type } = event.target;
        let finalValue = value;
        if (type === 'radio') {
            finalValue = value === 'true';
        }
        setInputs((prevState) => ({
            ...prevState,
            [name]: finalValue,
        }));
    };


    console.log(entry)

    return (
        <form className="event-form">
            <h1 className="event-form__heading">{formTitle}</h1>
            <section className="event-form__set-date">
                <label className="event-form__subheading" htmlFor={`event-date-${formType}`}>
                    Input the date of the event
                </label>
                <input
                    className="event-form__date-input"
                    type="date"
                    id={`event-date-${formType}`}
                    name="event_date"
                    value={dateOutputConverter(date)}
                    onChange={(e) => setDate(dateInputConverter(e.target.value))}
                />
            </section>
            {calendarEntry && <section className="event-form__calendar-entry">
                <h2 className="event-form__subheading">Calendar entry for this date</h2>
                <div className="event-form__single-calendar-entry">
                    <SingleCalendarEntryTitles red={calendarEntry.red} cross={calendarEntry.cross} star={calendarEntry.star} title={calendarEntry.title} />
                    <SingleCalendarEntryTitles red={calendarEntry.red} cross={calendarEntry.cross} star={calendarEntry.star} title={calendarEntry.title_bg} />
                </div>
            </section>}
            <section className="event-form__titles">
                <OneLineInputUpdated
                    label="Enter the Event Title in English"
                    name="title"
                    oneLine={inputs.title}
                    setOneLine={handleChangeInputs}
                />
                <OneLineInputUpdated
                    label="Въведете заглавието на Български"
                    name="title_bg"
                    oneLine={inputs.title_bg}
                    setOneLine={handleChangeInputs}
                />
            </section>
            <section className="event-form__content">
                <label
                    className={`event-form__content-option ${inputs.is_default === true ? "selected" : ""}`}
                    htmlFor="default-event">
                    Divine Liturgy - 10:00 am | Света Литургия - 10:00 ч.
                </label>
                <input
                    className="event-form__content-radio"
                    type="radio"
                    name="is_default"
                    id="default-event"
                    value={true}
                    checked={inputs.is_default === true}
                    onChange={handleChangeInputs}
                />

                <label
                    className={`event-form__content-option ${inputs.is_default === false ? "selected" : ""}`}
                    htmlFor="custom-event">
                    Custom
                </label>
                <input
                    className="event-form__content-radio"
                    type="radio"
                    name="is_default"
                    id="custom-event"
                    value={false}
                    checked={inputs.is_default === false}
                    onChange={handleChangeInputs}
                />

                {!inputs.is_default && <div>
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
                </div>}
            </section>
            <section className="event-form__bottom">
                <input
                    className="event-form__submit"
                    type="submit"
                    value="Publish"
                    onClick={onPublish}
                />
            </section>
        </form>
    );
}

export default EventEntryForm;
