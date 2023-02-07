import './WysiwygEdit.scss'
import { Editor } from "react-draft-wysiwyg";
import { EditorState, ContentState, convertFromHTML } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useEffect, useState } from "react";
import { convertToHTML } from 'draft-convert';
import {stateFromHTML} from 'draft-js-import-html';


function WysiwygEdit({editorLabel, setContent, content }) {
    let contentState = stateFromHTML(content);
    const [editorState, setEditorState] = useState(() =>
    EditorState.createWithContent(contentState));

  const updateTextDescription = async (state) => {
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

export default WysiwygEdit