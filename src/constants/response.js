export const HTTP_STATUS_CODES = {
  OK: 200,
  CREATED: 201,

  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500
};

export const ERROR_MESSAGES = {
  NOT_FOUND: 'Resource not found',
  UNAUTHORIZED: 'Unauthorized access',
  FORBIDDEN: 'Forbidden access',
  BAD_REQUEST: 'Bad request',
  CONFLICT: 'Conflict detected',
  INTERNAL_SERVER_ERROR: 'Internal server error'
};

export const SUCCESS_MESSAGES = {
  OK: 'Request successful',
  CREATED: 'Resource successfully created'
};
