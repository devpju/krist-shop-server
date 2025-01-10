import { HTTP_STATUS_CODES, SUCCESS_MESSAGES } from '~/constants/response';

class SuccessResponse {
  constructor({ statusCode, message, data = {}, metadata = {} }) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.metadata = metadata;
  }

  send(res) {
    const response = {
      message: this.message,
      data: this.data,
      metadata: this.metadata
    };

    return res.status(this.statusCode).json(response);
  }
}

class OKResponse extends SuccessResponse {
  constructor({ message = SUCCESS_MESSAGES.OK, data = {}, metadata = {} }) {
    super({ statusCode: HTTP_STATUS_CODES.OK, message, data, metadata });
  }
}

class CreatedResponse extends SuccessResponse {
  constructor({ message = SUCCESS_MESSAGES.CREATED, data = {}, metadata = {} }) {
    super({ statusCode: HTTP_STATUS_CODES.CREATED, message, data, metadata });
  }
}

export { SuccessResponse, OKResponse, CreatedResponse };
