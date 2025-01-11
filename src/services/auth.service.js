import { ConflictError } from '~/core/error.response';
import userRepository from '~/repositories/user.repository';
import generateSlug from '~/utils/generator.util';
import { pick } from '~/utils/object.util';

class AuthService {
  async signup(reqBody) {
    const { firstName, lastName, email, password } = reqBody;

    const user = await userRepository.findUserByEmail(email);

    if (user) throw new ConflictError('This account already exists');

    const newUser = await userRepository.createNewUser({ firstName, lastName, email, password });

    newUser.slug = generateSlug(`${newUser.firstName} ${newUser.lastName} u${newUser._id}`);

    await newUser.save();

    return pick(newUser, ['firstName', 'lastName', 'email', 'avatar']);
  }
}

export default new AuthService();
