import jwt from 'jsonwebtoken';

export const generateToken = ({ payload = {}, secretKey, expiresIn }) => {
  return jwt.sign(payload, secretKey, {
    expiresIn
  });
};
