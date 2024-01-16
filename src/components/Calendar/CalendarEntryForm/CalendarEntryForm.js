import "./CalendarEntryForm.scss";
import DateInputUpdated from "../../DateInputUpdated/DateInputUpdated";
import OneLineInputUpdated from "../../OneLineInputUpdated/OneLineInputUpdated";

function CalendarEntryForm({ formType, formTitle, entry, handleChange, onPublish }) {
    console.log(entry)

    return (
        <form className="calendar-form">
            <h1 className="calendar-form__heading">{formTitle}</h1>
            <DateInputUpdated label="Input the date of the entry" date={entry.date} setDate={handleChange} />
            <section className="calendar-form__type">
                <input
                    id={`crossBool${formType}`}
                    type="checkbox"
                    name="cross"
                    checked={entry.cross}
                    onChange={handleChange}
                />
                <label htmlFor={`crossBool${formType}`}>
                    †
                </label>
                <input
                    id={`starBool${formType}`}
                    type="checkbox"
                    name="star"
                    checked={entry.star}
                    onChange={handleChange}
                />
                <label htmlFor={`starBool${formType}`}>
                    *
                </label>
                <input
                    id={`boldBool${formType}`}
                    type="checkbox"
                    name="bold"
                    checked={entry.bold}
                    onChange={handleChange}
                />
                <label htmlFor={`boldBool${formType}`}>
                    Bold
                </label>
                <input
                    id={`redBool${formType}`}
                    type="checkbox"
                    name="red"
                    checked={entry.red}
                    onChange={handleChange}
                />
                <label htmlFor={`redBool${formType}`}>
                    Red
                </label>
            </section>
            <section className="calendar-form__main">
                <div className="calendar-form__column">
                    <OneLineInputUpdated
                        label="English Entry"
                        name="title"
                        oneLine={entry.title}
                        setOneLine={handleChange}
                    />
                </div>
                <div className="calendar-form__column">
                    <OneLineInputUpdated
                        label="На Български"
                        name="title_bg"
                        oneLine={entry.title_bg}
                        setOneLine={handleChange}
                    />
                </div>
            </section>
            <div className="calendar-form__end">
                <input
                    className="calendar-form__submit"
                    type="submit"
                    value="Publish"
                    onClick={onPublish}
                />
            </div>
        </form>
    );
}

export default CalendarEntryForm;
