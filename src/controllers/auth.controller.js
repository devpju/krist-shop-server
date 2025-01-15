import { CreatedResponse, OKResponse } from '~/core/success.response';
import authService from '~/services/auth.service';

class AuthController {
  async signup(req, res) {
    const newUser = await authService.signup(req.body);
    new CreatedResponse({ message: 'New account created successfully', data: newUser }).send(res);
  }

  async login(req, res) {
    const { accessToken, refreshToken, refreshTokenCookieOptions, user } = await authService.login(
      req.body
    );

    res.cookie('refreshToken', refreshToken, refreshTokenCookieOptions);

    new OKResponse({
      message: 'Login successfully',
      data: {
        accessToken,
        userInfo: user
      }
    }).send(res);
  }

  async logout(req, res) {
    const refreshToken = req.cookies.refreshToken;
    const userId = req.user._id.toString();

    await authService.logout(refreshToken, userId);

    res.clearCookie('refreshToken');

    new OKResponse({ message: 'Logout successfully' }).send(res);
  }

  async refreshToken(req, res) {
    const refreshToken = req.cookies.refreshToken;
    const { newAccessToken, newRefreshToken, refreshTokenCookieOptions } =
      await authService.refreshToken(refreshToken);
    res.cookie('refreshToken', newRefreshToken, refreshTokenCookieOptions);
    new OKResponse({
      message: 'Refresh token successfully',
      data: { accessToken: newAccessToken }
    }).send(res);
  }
}

export default new AuthController();
