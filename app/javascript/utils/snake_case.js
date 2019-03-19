// convertSnakeCase inputs a string with underscored concatenations, capitalizes
// each term, and replaces its underscores with spaces.
// i.e. snake_and_case => Snake and Case
export const convertSnakeCase = (str) => {
    if (typeof str !== 'string') return '';
    return str.replace(/_/g, ' ').replace(/(and)/, '+');
}