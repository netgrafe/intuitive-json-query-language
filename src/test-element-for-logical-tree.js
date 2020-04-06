const checkCondition = require('./check-condition');

function testElementForLogicalTree(element, logicalTree) {
    if (typeof logicalTree === 'object') {
        const operands = logicalTree.AND ? logicalTree.AND : logicalTree.OR;

        const processedOperands = operands.map(operand => testElementForLogicalTree(element, operand));

        if (logicalTree.AND) {
            return processedOperands.every((condition) => condition);
        } else {
            return processedOperands.some((condition) => condition);
        }
    } else if (typeof logicalTree === 'string') {
        return checkCondition(element, logicalTree);
    } else {
        return false;
    }
}

module.exports = testElementForLogicalTree;