// Express 4 doesn't catch errors thrown by async functions.
// Wrapping a controller passes any error on to errorHandler instead of crashing the server.
export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
