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

// splitCommaSeparatedArray inputs an array containing one comma separated string and
// splits the string into multiple elements.
export const splitCommaSeparatedArray = (arr) => {
    if (typeof arr !== 'object') return [];
    else if (arr.length > 1) return arr;
    return arr[0].split(",");
}

// addSpaceAfterCommas takes an array containing a comma separated string and adds spaces
// after the commas for display formatting purposes.
export const addSpaceAfterCommas = (arr) => {
    if (typeof arr !== 'object' || arr.length != 1) return;
    return arr[0].split(',').join(', ');
}

// takes an array of programs, applies convertSnakCase and joins with commas
export const reformatPrograms = (p) => {
    var programs = p;
    if (programs.length == 0) {
      return programs;
    }
    programs = splitCommaSeparatedArray(programs).sort();
    for (var i = 0; i < programs.length; i++) {
      programs[i] = convertSnakeCase(programs[i]);
    }
    return programs.join(", ")
  }