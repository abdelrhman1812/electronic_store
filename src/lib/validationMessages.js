const customMessages = (fieldName = "", limit = 0) => ({
  "string.empty": `${fieldName} cannot be empty.`,
  "string.min": `${fieldName} must be at least ${limit} characters long.`,
  "string.max": `${fieldName} must not exceed ${limit} characters.`,
  "any.required": `${fieldName} is required.`,
  "string.hex": `${fieldName} must be a valid hexadecimal string.`,
  "string.length": `${fieldName} must be exactly ${limit} characters long.`,
  "string.base": `${fieldName} must be a type of string.`,
  "string.pattern.base": `${fieldName} does not match the required pattern.`,
  "string.email": `${fieldName} must be a valid email address.`,
  "string.uri": `${fieldName} must be a valid URI.`,
  "string.guid": `${fieldName} must be a valid GUID.`,
  "string.alphanum": `${fieldName} must only contain alpha-numeric characters.`,
  "string.creditCard": `${fieldName} must be a valid credit card number.`,
  "string.token": `${fieldName} must be a valid token.`,
  "string.insensitive": `${fieldName} is case insensitive.`,

  "number.base": `${fieldName} must be a number.`,
  "number.min": `${fieldName} must be at least ${limit}.`,
  "number.max": `${fieldName} must not exceed ${limit}.`,
  "number.integer": `${fieldName} must be an integer.`,
  "number.positive": `${fieldName} must be a positive number.`,
  "number.negative": `${fieldName} must be a negative number.`,
  "number.precision": `${fieldName} must have ${limit} decimal places.`,

  "array.base": `${fieldName} must be an array.`,
  "array.min": `${fieldName} must contain at least ${limit} items.`,
  "array.max": `${fieldName} must contain no more than ${limit} items.`,
  "array.length": `${fieldName} must contain exactly ${limit} items.`,

  "date.base": `${fieldName} must be a valid date.`,
  "date.min": `${fieldName} must be later than ${limit}.`,
  "date.max": `${fieldName} must be earlier than ${limit}.`,

  "boolean.base": `${fieldName} must be a boolean.`,

  "object.base": `${fieldName} must be an object.`,
  "object.unknown": `${fieldName} contains an unknown key.`,

  "symbol.base": `${fieldName} must be a symbol.`,

  "alternatives.all": `${fieldName} does not match any of the allowed types.`,
  "any.only": `${fieldName} must be one of the allowed values.`,
  "any.invalid": `${fieldName} contains an invalid value.`,
  "any.allowOnly": `${fieldName} must match one of the allowed values.`,
});

export default customMessages;
