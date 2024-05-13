const formatPrice = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const formattedNumber = formatPrice(30000);
console.log("formatted price", formattedNumber);

export default formatPrice;