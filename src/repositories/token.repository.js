import Token from '~/models/token.model';

class TokenRepository {
  async createNewToken(tokenInfo) {
    return await Token.create(tokenInfo);
  }
  async deleteTokenByTokenAndUserId(userId, token) {
    return await Token.deleteOne({ userId, token });
  }
}

export default new TokenRepository();
