import Input from "../../UI/Input/Input";
import { FormBox } from "../../UI/FormBox/FormBox";
import Wysiwyg from "../../UI/Wysiwyg/Wysiwyg";
import ObituaryImageSelector from "../ObituaryImageSelector/ObituaryImageSelector";
import "./ObituaryEntryForm.scss";

function ObituaryEntryForm({ formType, formTitle, entry, setEntry, onPublish }) {
  const handleChange = (event) => {
    const { name, value } = event.target;
    setEntry((previousEntry) => ({
      ...previousEntry,
      [name]: value,
    }));
  };

  const setContent = (field) => (content) => {
    setEntry((previousEntry) => ({
      ...previousEntry,
      [field]: content,
    }));
  };

  return (
    <div className="obituary-form">
      <FormBox formTitle={formTitle} onPublish={onPublish}>
        <div className="obituary-form__details">
          <Input
            label="Name in English"
            id={`${formType}-obituary-name`}
            name="name"
            value={entry.name}
            onChange={handleChange}
          />
          <Input
            label="Име на български"
            id={`${formType}-obituary-name-bg`}
            name="name_bg"
            value={entry.name_bg}
            onChange={handleChange}
          />
          <Input
            label="Years"
            id={`${formType}-obituary-years`}
            name="years"
            value={entry.years}
            onChange={handleChange}
            placeholder="For example: 1942 – 2024"
          />
        </div>

        <ObituaryImageSelector
          idPrefix={formType}
          imageUrl={entry.image_url}
          imageAlt={entry.name || entry.name_bg || "Obituary"}
          onSelect={setContent("image_url")}
        />

        <div className="obituary-form__editors">
          <Wysiwyg
            editorLabel="Obituary in English"
            content={entry.obituary}
            setContent={setContent("obituary")}
          />
          <Wysiwyg
            editorLabel="Некролог на български"
            content={entry.obituary_bg}
            setContent={setContent("obituary_bg")}
          />
        </div>
      </FormBox>
    </div>
  );
}

export default ObituaryEntryForm;
