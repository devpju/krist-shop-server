import { CreatedResponse, OKResponse } from '~/core/success.response';
import AuthService from '~/services/auth.service';

class AuthController {
  async signup(req, res) {
    const newUser = await AuthService.signup(req.body);
    new CreatedResponse({ message: 'New account created successfully', data: newUser }).send(res);
  }

  async login(req, res) {
    const userInfo = await AuthService.login(req.body, res);
    new OKResponse({ message: 'Login successfully', data: userInfo }).send(res);
  }
}

export default new AuthController();
