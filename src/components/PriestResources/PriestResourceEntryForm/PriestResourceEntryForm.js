import "./PriestResourceEntryForm.scss";
import Input from "../../UI/Input/Input";
import CategoryPicker from "../CategoryPicker/CategoryPicker";
import Button from "../../UI/Button/Button";

function PriestResourceEntryForm({ formTitle, entry, handleChange, onPublish }) {
    return (
        <form className="priest-resources-form">
            <h2 className="priest-resources-form__heading">{formTitle}</h2>
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
                <Button
                    text="Save"
                    type="submit"
                    onClick={onPublish}
                />
            </div>
        </form>
    );
}

export default PriestResourceEntryForm;
