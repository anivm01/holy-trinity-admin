import "./WeeklyAnnouncementUpload.scss";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useState } from "react";
import { convertToHTML } from 'draft-convert';

function WeeklyAnnouncementUpload( {title, titleLabel, editorLabel, setTitleToSend, setContentToSend}) {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const updateTextDescription = async (state) => {
    await 
    setEditorState(state);
    setContentToSend(convertToHTML(editorState.getCurrentContent()))
  };


  return (
    <div className="weeklyAnnouncementUpload">
      <label className="weeklyAnnouncementUpload__label" htmlFor="title">{titleLabel}</label>
      <input className="weeklyAnnouncementUpload__input" type="text" id="title" name="title" value={title} onChange={(e)=>setTitleToSend(e.target.value)} />
      <label className="weeklyAnnouncementUpload__label">{editorLabel}</label>
      <div className="weeklyAnnouncementUpload__editor-box">
        <Editor 
          editorState={editorState}
          toolbarClassName="weeklyAnnouncementUpload__toolbar"
          wrapperClassName="weeklyAnnouncementUpload__wrapper"
          editorClassName="weeklyAnnouncementUpload__editor"
          onEditorStateChange={updateTextDescription}
          toolbar={{
            fontFamily: {options: ['El Messiri','Arial', 'Georgia', 'Impact', 'Tahoma', 'Times New Roman', 'Verdana']},
          }}
        />
      </div>
    </div>
    
  );
}

export default WeeklyAnnouncementUpload;
