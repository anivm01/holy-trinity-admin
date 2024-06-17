import "./DatetimeInput.scss";

function DatetimeInput({ label, id, name, value, onChange, ...props }) {
  return (
    <div className="datetime">
      <label className="datetime__label" htmlFor={id}>
        {label}
      </label>
      <input
        className="datetime__input"
        type="datetime-local"
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        {...props}
      />
    </div>
  );
}

export default DatetimeInput;
