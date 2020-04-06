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

function checkEquality(valueOnProperty, lookupValue) {
    return valueOnProperty === lookupValue;
}

function checkInequality(valueOnProperty, lookupValue) {
    return valueOnProperty !== lookupValue;
}

function checkIfGreaterThan(valueOnProperty, lookupValue) {
    if (typeof valueOnProperty !== 'number') {
        return false;
    } else if (!Number(lookupValue)) {
        return false;
    } else {
        return valueOnProperty > Number(lookupValue);
    }
}

function checkIfLessThan(valueOnProperty, lookupValue) {
    if (typeof valueOnProperty !== 'number') {
        return false;
    } else if (!Number(lookupValue)) {
        return false;
    } else {
        return valueOnProperty < Number(lookupValue);
    }

}

module.exports = {
    checkEquality,
    checkInequality,
    checkExclusion,
    checkInclusion,
    checkIfGreaterThan,
    checkIfLessThan
}