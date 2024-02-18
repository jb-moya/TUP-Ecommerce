const InputField = ({ type, name, value, onChange, placeholder, validator, setError }) => {
    return (
        <div className="input-field">
            <input
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