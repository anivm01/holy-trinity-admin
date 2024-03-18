import "./PriestResourceEntryForm.scss";
import Input from "../../UI/Input/Input";
import CategoryPicker from "../CategoryPicker/CategoryPicker";

function PriestResourceEntryForm({ formTitle, entry, handleChange, onPublish }) {
    return (
        <form className="priest-resources-form">
            <h1 className="priest-resources-form__heading">{formTitle}</h1>
            <section className="priest-resources-form__main">
                <CategoryPicker entry={entry} handleChange={handleChange} />
                <Input
                    label="Title"
                    id="pr-title"
                    name="title"
                    value={entry.title}
                    onChange={handleChange}
                    type="text"
                    inputComponent="input" />

                <Input
                    label="Link"
                    id="pr-link"
                    name="link"
                    value={entry.link}
                    onChange={handleChange}
                    type="url"
                    inputComponent="input"
                    placeholder="https://example.com"
                    pattern="https://.*" />

                <Input
                    label="Description"
                    id="pr-description"
                    name="description"
                    value={entry.description}
                    onChange={handleChange}
                    inputComponent="textarea"
                    rows="5" />



            </section>
            <div className="priest-resources-form__end">
                <input
                    className="priest-resources-form__submit"
                    type="submit"
                    value="Save"
                    onClick={onPublish}
                />
            </div>
        </form>
    );
}

export default PriestResourceEntryForm;
