import { ERROR_MESSAGES, HTTP_STATUS_CODES } from '~/constants/response';

// ErrorResponse cơ sở
class ErrorResponse extends Error {
  constructor(statusCode, message) {
    super(message);
    this.status = statusCode;
  }
}

// NotFoundError (404)
export class NotFoundError extends ErrorResponse {
  constructor(statusCode = HTTP_STATUS_CODES.NOT_FOUND, message = ERROR_MESSAGES.NOT_FOUND) {
    super(statusCode, message);
  }
}

// UnauthorizedError (401)
export class UnauthorizedError extends ErrorResponse {
  constructor(statusCode = HTTP_STATUS_CODES.UNAUTHORIZED, message = ERROR_MESSAGES.UNAUTHORIZED) {
    super(statusCode, message);
  }
}

// ForbiddenError (403)
export class ForbiddenError extends ErrorResponse {
  constructor(statusCode = HTTP_STATUS_CODES.FORBIDDEN, message = ERROR_MESSAGES.FORBIDDEN) {
    super(statusCode, message);
  }
}

// BadRequestError (400)
export class BadRequestError extends ErrorResponse {
  constructor(statusCode = HTTP_STATUS_CODES.BAD_REQUEST, message = ERROR_MESSAGES.BAD_REQUEST) {
    super(statusCode, message);
  }
}

// ConflictError (409)
export class ConflictError extends ErrorResponse {
  constructor(statusCode = HTTP_STATUS_CODES.CONFLICT, message = ERROR_MESSAGES.CONFLICT) {
    super(statusCode, message);
  }
}
