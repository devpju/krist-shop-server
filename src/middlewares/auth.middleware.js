import env from '~/config/env';

import { ForbiddenError, UnauthorizedError } from '~/core/error.response';
import userRepository from '~/repositories/user.repository';
import { decodeToken } from '~/utils/token.util';

const authMiddleware =
  (isAdmin = false) =>
  async (req, res, next) => {
    try {
      const authHeader = req.headers['authorization'];
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthorizedError('Invalid authorization header format');
      }

      const token = authHeader.split(' ')[1];
      if (!token) throw new UnauthorizedError('Bearer token is missing');
      const decodedToken = decodeToken(token, env.ACCESS_TOKEN_SECRET);

      const user = await userRepository.findUserById(decodedToken.userId);
      if (!user) {
        throw new UnauthorizedError('Token is invalid');
      }

      if (user.status !== 'verified') {
        throw new UnauthorizedError('Account is inactive');
      }

      if (isAdmin && !user.isAdmin) {
        throw new ForbiddenError('Access denied for non-admin users');
      }

      req.user = user;
      next();
    } catch (err) {
      next(err);
    }
  };

export default authMiddleware;
