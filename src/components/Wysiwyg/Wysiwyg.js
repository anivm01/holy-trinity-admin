import './Wysiwyg.scss'
import { Editor } from "react-draft-wysiwyg";
import { EditorState} from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useState } from "react";
import { convertToHTML } from 'draft-convert';

function Wysiwyg({editorLabel, setContent }) {
    const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const updateTextDescription = async (state) => {
    //await 
    setEditorState(state);
    await
    setContent(convertToHTML(editorState.getCurrentContent()))
  };
  return (
    <div className='wysiwyg'>
        <label className="wysiwyg__label">{editorLabel}</label>
      <div className="wysiwyg__editor-box">
        <Editor 
          editorState={editorState}
          toolbarClassName="wysiwyg__toolbar"
          wrapperClassName="wysiwyg__wrapper"
          editorClassName="wysiwyg__editor"
          onEditorStateChange={updateTextDescription}
          toolbar={{
            fontFamily: {options: ['El Messiri', 'Arial', 'Georgia', 'Impact', 'Tahoma', 'Times New Roman', 'Verdana']},
          }}
        />
      </div>
    </div>
  )
}

export default Wysiwyg