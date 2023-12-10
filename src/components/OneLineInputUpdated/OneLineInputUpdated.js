import './OneLineInputUpdated.scss'

function OneLineInputUpdated({ label, name, oneLine, setOneLine }) {
  return (
    <div className='one-line-input'>
      <label className="one-line-input__label" htmlFor="one-line">{label}</label>
      <input className="one-line-input__input" type="text" id="one-line" name={name} value={oneLine} onChange={setOneLine} />
    </div>
  )
}

export default OneLineInputUpdated