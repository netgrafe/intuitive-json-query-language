const { INCLUDES, NOT_INCLUDES, IS, IS_NOT, GT, LT }= require('./constants');
const conditionCheckers                             = require('./condition-checkers');
const getValueOnPropertyPath                        = require('./get-value-on-property-path');

const possibleOperatorInOrder = [ NOT_INCLUDES, IS_NOT, INCLUDES, IS, GT, LT ];

function findOperator(condition) {
    return possibleOperatorInOrder.find(operator => condition.includes(` ${operator} `));
}

const checkerMap = {
    [INCLUDES]:         conditionCheckers.checkInclusion,
    [NOT_INCLUDES]:     conditionCheckers.checkExclusion,
    [IS]:               conditionCheckers.checkEquality,
    [IS_NOT]:           conditionCheckers.checkInequality,
    [GT]:               conditionCheckers.checkIfGreaterThan,
    [LT]:               conditionCheckers.checkIfLessThan
}

function evaluateCondition(objectToCheck, condition) {
    const operator = findOperator(condition);

    const [ propertyPath, lookupValue ] = condition.split(` ${operator} `).map(sides => sides.trim());

    const valueOfProperty = getValueOnPropertyPath(objectToCheck, propertyPath);

    if (!operator) {
        throw new Error(`No operator found in condition: "${condition}". Please use on of the followings: '${possibleOperatorInOrder.join('\', \'')}'`)
    }

    if (!lookupValue) {
        throw new Error(`You haven't specified what to look for in condition: "${condition}"`);
    }

    return !!operator && !!valueOfProperty && !!lookupValue && checkerMap[operator](valueOfProperty, lookupValue);
}

module.exports = function (objectToCheck, condition) {
    // if it is not already evaluated portion of a condition, so it is not a boolean yet
    if (typeof condition === 'string') {
        return evaluateCondition(objectToCheck, condition);
    } else if (typeof condition === 'boolean') {
        return condition;
    } else {
        return false;
    }
}