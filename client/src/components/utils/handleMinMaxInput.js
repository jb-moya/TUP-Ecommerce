const handleMinMaxInput = (e, setInputValue, defaultMin = 0) => {
    e.preventDefault();

    const { name, value } = e.target;

    let newValue = defaultMin;
    if (isNaN(parseInt(value))) {
        e.target.value = defaultMin;
    } else {
        newValue = parseInt(value);
    }

    if (newValue < defaultMin) {
        newValue = defaultMin;
        e.target.value = newValue;
    }

    setInputValue((prevState) => {
        if (name === "min") {
            return [newValue, prevState[1]];
        } else if (name === "max") {
            return [prevState[0], newValue];
        }
    });
};

export default handleMinMaxInput;
