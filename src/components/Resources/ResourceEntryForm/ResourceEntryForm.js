import "./ResourceEntryForm.scss";
import Input from "../../UI/Input/Input";

function ResourceEntryForm({ formTitle, entry, handleChange, onPublish }) {
    return (
        <form className="resources-form">
            <h1 className="resources-form__heading">{formTitle}</h1>
            <section className="resources-form__main">
                <div className="resources-form__column">
                    <Input
                        label="Text"
                        id="text"
                        name="text"
                        value={entry.text}
                        onChange={handleChange}
                    />
                </div>
                <div className="resources-form__column">
                    <Input
                        label="url"
                        id="url"
                        name="url"
                        value={entry.url}
                        onChange={handleChange}
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
