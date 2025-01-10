import env from '~/config/env';
import { ERROR_MESSAGES, HTTP_STATUS_CODES } from '~/constants/response';

// eslint-disable-next-line no-unused-vars
const errorHandlerMiddleware = (err, req, res, next) => {
  const statusCode = err.status || HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR;
  const errorMessage = err.message || ERROR_MESSAGES.INTERNAL_SERVER_ERROR;
  const errorStack = env.NODE_ENV === 'development' ? err.stack : undefined;
  res.status(statusCode).json({
    status: 'error',
    message: errorMessage,
    ...(errorStack && { stack: errorStack })
  });
};

export default errorHandlerMiddleware;
