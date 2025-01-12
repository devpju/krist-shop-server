import env from '~/config/env';
import { accountStatus } from '~/constants/status';
import { tokenTimeExpiration } from '~/constants/token';
import {
  BadRequestError,
  ConflictError,
  NotFoundError,
  UnauthorizedError
} from '~/core/error.response';
import tokenRepository from '~/repositories/token.repository';
import userRepository from '~/repositories/user.repository';
import generateSlug from '~/utils/generator.util';
import { pick } from '~/utils/object.util';
import { generateToken } from '~/utils/token.util';

class AuthService {
  async signup(reqBody) {
    const { firstName, lastName, email, password } = reqBody;

    const user = await userRepository.findUserByEmail(email);

    if (user) throw new ConflictError('This account already exists');

    const newUser = await userRepository.createNewUser({ firstName, lastName, email, password });

    newUser.slug = generateSlug(`${newUser.firstName} ${newUser.lastName} u${newUser._id}`);

    await newUser.save();

    return pick(newUser, ['firstName', 'lastName', 'email']);
  }

  async login(reqBody) {
    const { email, password } = reqBody;
    const user = await userRepository.findUserByEmail(email);

    if (!user) throw new NotFoundError('This account does not exist');

    if (!(await user.comparePassword(password)))
      throw new UnauthorizedError('Password is incorrect');

    if (user.status === accountStatus.UNVERIFIED)
      throw new UnauthorizedError('Your account is not verified');

    const accessToken = generateToken({
      payload: { id: user._id },
      secretKey: env.ACCESS_TOKEN_SECRET,
      expiresIn: tokenTimeExpiration.ACCESS_TOKEN_AGE
    });

    const refreshToken = generateToken({
      payload: { id: user._id },
      secretKey: env.REFRESH_TOKEN_SECRET,
      expiresIn: tokenTimeExpiration.REFRESH_TOKEN_AGE
    });

    const refreshTokenCookieOptions = {
      httpOnly: true,
      secure: env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: tokenTimeExpiration.REFRESH_TOKEN_AGE_SECONDS
    };

    const expiresAt = new Date(Date.now() + tokenTimeExpiration.REFRESH_TOKEN_AGE_SECONDS);
    await tokenRepository.createNewToken({
      token: refreshToken,
      userId: user._id,
      expiresAt
    });

    return {
      accessToken,
      refreshToken,
      refreshTokenCookieOptions,
      user: pick(user, ['firstName', 'lastName', 'email', 'avatar', 'status'])
    };
  }

  async logout(refreshToken, userId) {
    if (!refreshToken) throw new UnauthorizedError('Refresh token missing');
    const { deletedCount } = await tokenRepository.deleteTokenByTokenAndUserId(
      userId,
      refreshToken
    );
    if (deletedCount === 0) throw new BadRequestError('Cannot delete token');
  }
}

export default new AuthService();
