function isObject (value) {
    return value && typeof value === 'object' && value.constructor === Object;
}

function isString (value) {
    return typeof value === 'string' || value instanceof String;
}

function getValueOnPropertyPath(object, propertyPath) {
    if (!isObject(object) || !isString(propertyPath)) {
        return null;
    }

    if (propertyPath.includes('.')) {
        const firstDotIndex = propertyPath.indexOf('.');
        const firstChunk    = propertyPath.substr(0, firstDotIndex);
        const remainderPath = propertyPath.substr(firstDotIndex + 1);


        if (object[firstChunk]) {
            return getValueOnPropertyPath(object[firstChunk], remainderPath)
        } else {
        return null;
        }
    } else {
        return object[propertyPath] || null;
    }
}

module.exports = getValueOnPropertyPath;