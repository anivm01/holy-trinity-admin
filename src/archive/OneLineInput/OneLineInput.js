import './OneLineInput.scss'

function OneLineInput({label, oneLine, setOneLine}) {
  return (
    <div className='one-line-input'>
        <label className="one-line-input__label" htmlFor="one-line">{label}</label>
        <input className="one-line-input__input" type="text" id="one-line" name="one-line" value={oneLine} onChange={(e)=>setOneLine(e.target.value)} />
    </div>
  )
}

export default OneLineInput