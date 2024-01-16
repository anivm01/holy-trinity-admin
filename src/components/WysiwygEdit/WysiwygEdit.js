import "./WysiwygEdit.scss";
import Editor from "react-simple-wysiwyg";

function WysiwygEdit({ editorLabel, setContent, content }) {
  function onChange(e) {
    setContent(e.target.value);
  }

  return (
    <div className="wysiwyg">
      <label className="wysiwyg__label">{editorLabel}</label>
      <Editor
        containerProps={{
          style: {
            resize: "vertical",
            minHeight: "200px",
            minWidth: "500px",
            backgroundColor: "white",
            border: "1px solid #6F0B20",
          },
        }}
        value={content}
        onChange={onChange}
      />
    </div>
  );
}

export default WysiwygEdit;
