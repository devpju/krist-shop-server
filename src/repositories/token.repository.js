import Token from '~/models/token.model';

class TokenRepository {
  async createNewToken(tokenInfo) {
    return await Token.create(tokenInfo);
  }

  async deleteTokenByTokenAndUserId(userId, token) {
    return await Token.deleteOne({ userId, token });
  }

  async findTokenByTokenAndUserId(userId, token) {
    return await Token.findOne({ userId, token });
  }
}

export default new TokenRepository();
