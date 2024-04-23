const InputField = ({ type, name, value, onChange, placeholder, validator, setError }) => {
    return (
        <div className="pb-4">
            <input
                className="rounded-lg bg-[#EFEFEF] p-[16px] border border-gray-400 w-[530px]"
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />
            {setError && <div>{setError}</div>}
        </div>
    );
}

export default InputField;