import Token from '~/models/token.model';

class TokenRepository {
  async createNewToken(tokenInfo) {
    return await Token.create(tokenInfo);
  }
}

export default new TokenRepository();
