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
  constructor(message = ERROR_MESSAGES.NOT_FOUND) {
    super(HTTP_STATUS_CODES.NOT_FOUND, message);
  }
}

// UnauthorizedError (401)
export class UnauthorizedError extends ErrorResponse {
  constructor(message = ERROR_MESSAGES.UNAUTHORIZED) {
    super(HTTP_STATUS_CODES.UNAUTHORIZED, message);
  }
}

// ForbiddenError (403)
export class ForbiddenError extends ErrorResponse {
  constructor(message = ERROR_MESSAGES.FORBIDDEN) {
    super(HTTP_STATUS_CODES.FORBIDDEN, message);
  }
}

// BadRequestError (400)
export class BadRequestError extends ErrorResponse {
  constructor(message = ERROR_MESSAGES.BAD_REQUEST) {
    super(HTTP_STATUS_CODES.BAD_REQUEST, message);
  }
}

// ConflictError (409)
export class ConflictError extends ErrorResponse {
  constructor(message = ERROR_MESSAGES.CONFLICT) {
    super(HTTP_STATUS_CODES.CONFLICT, message);
  }
}
