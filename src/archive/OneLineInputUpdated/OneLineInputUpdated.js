import './OneLineInputUpdated.scss'

function OneLineInputUpdated({ label, name, oneLine, setOneLine }) {
  return (
    <div className='one-line-input'>
      <label className="one-line-input__label" htmlFor={name}>{label}</label>
      <input className="one-line-input__input" type="text" id={name} name={name} value={oneLine} onChange={setOneLine} />
    </div>
  )
}

export default OneLineInputUpdated