import './Input.scss';

function Input({ label, id, name, value, onChange, type = "text", inputComponent = "input", ...props }) {
    // Determine which component to use, input or textarea
    const InputOrTextarea = inputComponent === "textarea" ? "textarea" : "input";

    return (
        <div className='input'>
            <label className="input__label" htmlFor={id}>{label}</label>
            <InputOrTextarea
                className="input__field"
                id={id}
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                {...props}
            />
        </div>
    );
}

export default Input;