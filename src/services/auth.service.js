import env from '~/config/env';
import { tokenTimeExpiration } from '~/constants/token';
import { ConflictError, NotFoundError, UnauthorizedError } from '~/core/error.response';
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

  async login(reqBody, res) {
    const { email, password } = reqBody;
    const user = await userRepository.findUserByEmail(email);

    if (!user) throw new NotFoundError('This account does not exist');
    if (!(await user.comparePassword(password)))
      throw new UnauthorizedError('Password is incorrect');

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

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: tokenTimeExpiration.REFRESH_TOKEN_AGE_SECONDS
    });

    const expiresAt = new Date(Date.now() + tokenTimeExpiration.REFRESH_TOKEN_AGE_SECONDS);
    await tokenRepository.createNewToken({
      token: refreshToken,
      userId: user._id,
      expiresAt
    });

    return {
      accessToken,
      userInfo: pick(user, ['firstName', 'lastName', 'email', 'avatar', 'status'])
    };
  }
}

export default new AuthService();
