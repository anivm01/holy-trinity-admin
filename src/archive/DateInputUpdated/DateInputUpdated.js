import './DateInputUpdated.scss'

function DateInputUpdated({ label, date, setDate }) {
  return (
    <div className="date-input">
      <label className="date-input__label" htmlFor="date">
        {label}
      </label>
      <input
        className="date-input__date"
        type="date"
        id="date"
        name="date"
        value={date}
        onChange={setDate}
      />
    </div>
  )
}

export default DateInputUpdated