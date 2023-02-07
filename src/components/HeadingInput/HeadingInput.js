import './HeadingInput.scss'

function HeadingInput({titleLabel, title, setTitle}) {
  return (
    <div className='heading-input'>
        <label className="heading-input__label" htmlFor="title">{titleLabel}</label>
        <input className="heading-input__input" type="text" id="title" name="title" value={title} onChange={(e)=>setTitle(e.target.value)} />
    </div>
  )
}

export default HeadingInput