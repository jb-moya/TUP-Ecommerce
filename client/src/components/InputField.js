const InputField = ({ type, name, value, onChange, placeholder, validator, setError, title}) => {
    return (
        <div className="input-frames">
            <b className="titles">{title}</b> 
            <input
                className="input-field"
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />
            {setError && <div>{setError}</div>}
        </div>
    );
}

export default InputField;