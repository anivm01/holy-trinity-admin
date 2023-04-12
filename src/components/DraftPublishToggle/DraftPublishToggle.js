import React from 'react'
import "./DraftPublishToggle.scss"

function DraftPublishToggle({setDraft}) {
  return (
    <div className="toggle">
    <input onChange={()=>{setDraft(current => !current)}} className="toggle__checkbox" type="checkbox"></input>
    <label className="toggle__label" htmlFor=""><span className="toggle__span">Draft</span></label>
</div>
  )
}

export default DraftPublishToggle