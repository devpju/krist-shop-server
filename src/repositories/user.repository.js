const { default: User } = require('~/models/user.model');

class UserRepository {
  async findUserByEmail(email) {
    return await User.findOne({ email }).lean();
  }

  async createNewUser(userInfo) {
    return await User.create(userInfo);
  }
}

export default new UserRepository();
