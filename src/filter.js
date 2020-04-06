const logicalTreeBuilder = require('./logical-tree-builder');
const testElementForLogicalTree = require('./test-element-for-logical-tree');

function testElementAgainstQuery(element, queryString) {
    const logicalTree = logicalTreeBuilder.build(queryString);

    return testElementForLogicalTree(element, logicalTree);
}

function filter (arrayOfElements, queryString) {
    const logicalTree = logicalTreeBuilder.build(queryString);

    return arrayOfElements.filter(element => testElementForLogicalTree(element, logicalTree))
}

module.exports = {
    filter,
    testElementAgainstQuery
}