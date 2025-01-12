import User from '~/models/user.model';

class UserRepository {
  async findUserByEmail(email) {
    return await User.findOne({ email });
  }

  async findUserById(id) {
    return await User.findById(id);
  }

  async createNewUser(userInfo) {
    return await User.create(userInfo);
  }
}

export default new UserRepository();
