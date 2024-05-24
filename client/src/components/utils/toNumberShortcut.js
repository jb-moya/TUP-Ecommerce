function toNumberShortcut(number) {
    if (number >= 1000000) {
        return (number / 1000000).toFixed(number % 1000000 === 0 ? 0 : 1) + "m";
    } else if (number >= 1000) {
        return (number / 1000).toFixed(number % 1000 === 0 ? 0 : 1) + "k";
    } else {
        return number.toString();
    }
}

export default toNumberShortcut;