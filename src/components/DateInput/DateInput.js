import './DateInput.scss'

function DateInput({date, setDate}) {
  return (
    <div className="date-input">
        <label className="date-input__label" htmlFor="date">
          Enter the date on which you want the announcement to be posted
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