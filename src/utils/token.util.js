import jwt from 'jsonwebtoken';
import { BadRequestError, UnauthorizedError } from '~/core/error.response';

export const generateToken = ({ payload = {}, secretKey, expiresAt }) => {
  if (!secretKey) {
    throw new BadRequestError('Missing secret key');
  }
  if (!expiresAt) {
    throw new BadRequestError('Missing expiration time');
  }
  return jwt.sign({ ...payload, exp: expiresAt }, secretKey);
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
