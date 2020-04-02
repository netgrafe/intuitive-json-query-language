const { LEFT, RIGHT, SUB_EXPRESSION_PREFIX } = require('./constants');

function findSubExpressions(queryString) {
    const foundParensPositionsAtFirstLevel = [];
    const parensStack = [];

    queryString.split('').forEach((char, index) => {
        if (char === LEFT) {
            parensStack.push(index);
        } else if (char === RIGHT) {
            const starterPosition = parensStack.pop();

            // we're not in the middle of multiple parens deeply, but closed a first level one with pop() above
            if (parensStack.length === 0) {
                foundParensPositionsAtFirstLevel.push({
                    start: starterPosition,
                    end: index
                });
            }
        }
    });

    return foundParensPositionsAtFirstLevel.map(({ start, end }) => {
        return queryString.substring(start + 1, end);
    })
}

function processSubExpressionOrLeaveAsIs(snippet, knownSubExpressions) {
    if (snippet.startsWith(SUB_EXPRESSION_PREFIX)) {
        const subExpressionIndex = Number(snippet.replace(SUB_EXPRESSION_PREFIX, ''));
        const subExpression = knownSubExpressions[subExpressionIndex]

        // going recursive
        return build(subExpression);
    } else {
        // terminating recursion
        return snippet;
    }
}

function checkForAndOperands(expression, knownSubExpressions) {
    if (expression.includes(` ${AND} `)) {
        const andOperands = expression.split(` ${AND} `).map(e => e.trim());

        return {
            AND: andOperands.map(andOperand => processSubExpressionOrLeaveAsIs(andOperand, knownSubExpressions))
        };
    } else {
        return processSubExpressionOrLeaveAsIs(expression, knownSubExpressions);
    }
}

function build(queryString) {
    // find the top level statement by finding its sub-expressions wrapped into parens
    const subExpressions = findSubExpressions(queryString);

    // temporarily substitue sub-expressions for easier parsing - it is only containing same-level OR / AND statement
    const simplified = subExpressions.reduce((acc, curr, index) => {
        return acc.replace(`(${curr})`, `${SUB_EXPRESSION_PREFIX}${index}`);
    }, queryString);

    // as OR is lower level operator and the last to evaluate, we break-up the term by the 'OR's first
    if (simplified.includes(` ${OR} `)) {
        orOperands = simplified.split(` ${OR} `).map(elem => elem.trim());

        return {
            OR: orOperands.map((orOperand) => checkForAndOperands(orOperand, subExpressions))
        }
    } else {
        return checkForAndOperands(simplified, subExpressions);
    }
}


module.exports = {
    build
};