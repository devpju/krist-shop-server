import jwt from 'jsonwebtoken';
import env from '~/config/env';

import { ForbiddenError, UnauthorizedError } from '~/core/error.response';
import userRepository from '~/repositories/user.repository';

const authMiddleware =
  (isAdmin = false) =>
  async (req, res, next) => {
    try {
      const authHeader = req.headers['authorization'];
      if (!authHeader) throw new UnauthorizedError('Authorization header is missing');

      const token = authHeader.split(' ')[1];
      if (!token) throw new UnauthorizedError('Bearer token is missing');

      const decodedToken = jwt.verify(token, env.ACCESS_TOKEN_SECRET);

      const user = await userRepository.findUserById(decodedToken.id).lean();
      if (!user) throw new UnauthorizedError('Token is invalid');

      if (isAdmin && !user.isAdmin) throw new ForbiddenError('Access denied');

      req.user = user;
      next();
    } catch (err) {
      if (err instanceof jwt.TokenExpiredError) {
        return next(new UnauthorizedError('Token has expired'));
      }
      next(err);
    }
  };

export default authMiddleware;
