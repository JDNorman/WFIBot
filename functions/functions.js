// Rounding Function
function rounding(input) {
    const number = parseFloat(input);
    const roundedNumber = Math.round(number * 100) / 100;
    return roundedNumber.toFixed(2);
}

module.exports = rounding;