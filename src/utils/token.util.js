import jwt from 'jsonwebtoken';
import { BadRequestError, UnauthorizedError } from '~/core/error.response';

export const generateToken = ({ payload = {}, secretKey, expiresIn }) => {
  if (!secretKey) {
    throw new BadRequestError('Missing secret key');
  }
  if (!expiresIn) {
    throw new BadRequestError('Missing expiration time');
  }
  return jwt.sign(payload, secretKey, { expiresIn });
};

export const decodeToken = (token, secretKey) => {
  if (!token) {
    throw new BadRequestError('Missing token');
  }
  if (!secretKey) {
    throw new BadRequestError('Missing secret key');
  }
  try {
    return jwt.verify(token, secretKey);
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      throw new UnauthorizedError('Token has expired');
    }
    if (err instanceof jwt.JsonWebTokenError) {
      throw new UnauthorizedError('Invalid token');
    }
    throw new BadRequestError(err.message);
  }
};
