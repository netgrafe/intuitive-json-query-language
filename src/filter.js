const { AND, OR } = require('./constants');
const logicalTreeBuilder = require('./logical-tree-builder');
const checkCondition = require('./check-condition');

function checkCondition(objectToCheck, condition) {

}

function testElementForLogicalTree(element, logicalTree, operator) {
    if (Array.isArray(logicalTree) && operator) {
        const processed = logicalTree.map(operand => evalueate(operand));

        if (operator === AND) {
            return processed.every((condition) => checkCondition(element, condition));
        } else if (operator === OR) {
            return processed.some((condition) => checkCondition(element, condition));
        }
    } else if (typeof logicalTree === 'object') {
        if (logicalTree.AND) {
            return testElementForLogicalTree(logicalTree[AND], AND);
        } else if (logicalTree.OR) {
            return testElementForLogicalTree(logicalTree[OR], OR);
        }
    } else if (typeof logicalTree === 'string') {
        return logicalTree;
    }
}

function testElementAgainstQuery(element, queryString) {
    const logicalTree = logicalTreeBuilder.build(queryString);

    return testElementForLogicalTree(element, logicalTree);
}

function filter (arrayOfElements, queryString) {
    const logicalTree = logicalTreeBuilder.build(queryString);

    arrayOfElements.filter(element => testElementForLogicalTree(element, logicalTree, queryString))
}

module.exports = {
    filter,
    testElementAgainstQuery
}