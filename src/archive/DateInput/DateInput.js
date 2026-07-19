import './DateInput.scss'

function DateInput({date, setDate}) {
  return (
    <div className="date-input">
        <label className="date-input__label" htmlFor="date">
          Choose the date on which you want this entry to be posted
        </label>
        <input
          className="date-input__date"
          type="date"
          id="date"
          name="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
  )
}

export default DateInput