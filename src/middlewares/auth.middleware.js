import { ForbiddenError, UnauthorizedError } from '~/core/error.response';
import jwt from 'jsonwebtoken';
import env from '~/config/env';
import userRepository from '~/repositories/user.repository';

const authMiddleware =
  (isAdmin = false) =>
  async (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) throw new UnauthorizedError('Authorization header is missing');

    const token = authHeader.split(' ')[1];

    if (!token) throw new UnauthorizedError('Bearer token is missing');
    let decodedToken = null;
    jwt.verify(token, env.ACCESS_TOKEN_SECRET, function (err, decoded) {
      if (err) {
        if (err instanceof jwt.TokenExpiredError) throw new UnauthorizedError('Token has expired');
        else throw new UnauthorizedError('Token is invalid');
      }
      decodedToken = decoded;
    });

    const user = await userRepository.findUserById(decodedToken._id).lean();

    if (!user) throw new UnauthorizedError('Token is invalid');

    if (isAdmin === true && user.isAdmin === false) throw new ForbiddenError('');

    req.user = user;

    next();
  };

export default authMiddleware;
