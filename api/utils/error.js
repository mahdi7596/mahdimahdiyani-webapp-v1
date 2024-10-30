export const errorHandler = (statusCode, message) => {
  const error = new Error();
  error.statusCode = statusCode; // Set the status code
  error.message = message; // Create a new error with the message
  return error;
};
