import User from '~/models/user.model';

class UserRepository {
  async findUserByEmail(email) {
    return await User.findOne({ email });
  }

  async createNewUser(userInfo) {
    return await User.create(userInfo);
  }
}

export default new UserRepository();
