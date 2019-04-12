// convertSnakeCase inputs a string with underscored concatenations, capitalizes
// each term, and replaces its underscores with spaces.
// i.e. snake_and_case => Snake and Case
export const convertSnakeCase = (str) => {
    if (typeof str !== 'string') return '';
    return str.replace(/_/g, ' ').replace(/(and)/, '+');
}

// Give the amount and plural form of NOUN
// Singular form if ARR has one item, otherwise plural
// e.g. `0 works`, `1 work`, `2 works`
export const pluralize = (arr, noun) => {
    if (typeof arr !== 'object' || typeof noun !== 'string' || arr.length < 0) return '';
    return `${arr.length} ${noun}${arr.length === 1 ? "" : "s"}`;
}