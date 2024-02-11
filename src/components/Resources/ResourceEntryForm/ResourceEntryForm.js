import "./ResourceEntryForm.scss";
import OneLineInputUpdated from "../../OneLineInputUpdated/OneLineInputUpdated";

function ResourceEntryForm({ formTitle, entry, handleChange, onPublish }) {
    console.log(entry)

    return (
        <form className="resources-form">
            <h1 className="resources-form__heading">{formTitle}</h1>
            <section className="resources-form__main">
                <div className="resources-form__column">
                    <OneLineInputUpdated
                        label="Text"
                        name="text"
                        oneLine={entry.text}
                        setOneLine={handleChange}
                    />
                </div>
                <div className="resources-form__column">
                    <OneLineInputUpdated
                        label="url"
                        name="url"
                        oneLine={entry.url}
                        setOneLine={handleChange}
                    />
                </div>
            </section>
            <div className="resources-form__end">
                <input
                    className="resources-form__submit"
                    type="submit"
                    value="Save"
                    onClick={onPublish}
                />
            </div>
        </form>
    );
}

export default ResourceEntryForm;
