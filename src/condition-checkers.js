const getValueOnPropertyPath = require('./get-value-on-property-path');

function checkInclusion(valueOnProperty, lookupValue, isNegated) {
    if (valueOnProperty) {
        if (Array.isArray(valueOnProperty) || typeof valueOnProperty === 'string') {
            const includes = valueOnProperty.includes(lookupValue);

            return isNegated ? !includes : includes;
        } else {
            return !!isNegated;
        }
    } else {
        return !!isNegated;
    }
}

function checkExclusion(valueOnProperty, lookupValue) {
    return checkInclusion(valueOnProperty, lookupValue, true);
}

function checkEquality() {

}

function checkInequality() {

}

function checkIfGreaterThan() {

}

function checkIfLessThan() {

}

module.exports = {
    checkEquality,
    checkInequality,
    checkExclusion,
    checkInclusion,
    checkIfGreaterThan,
    checkIfLessThan
}