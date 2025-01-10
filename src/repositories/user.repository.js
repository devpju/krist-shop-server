const { default: User } = require('~/models/user.model');

class UserRepository {
  static findUserByEmail(email) {
    return User.findOne({ email });
  }

  static createNewUser(userInfo) {
    return User.create(...userInfo);
  }
}

export default UserRepository;
