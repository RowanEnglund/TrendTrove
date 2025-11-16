import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.store';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  login(user: any) {
    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  register(user: any) {
    // a-64 adding placeholder for register
    return {
      message: 'User registered successfully.',
      user,
    };
  }

  googleLogin(req) {
    if (!req.user) {
      return 'No user from google';
    }

    const user = req.user as User;
    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
