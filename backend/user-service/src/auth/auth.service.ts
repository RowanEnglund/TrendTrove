import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  login(user: any) {
    // a-64 adding placeholder for login
    return {
      message: 'User logged in successfully.',
      user,
    };
  }

  register(user: any) {
    // a-64 adding placeholder for register
    return {
      message: 'User registered successfully.',
      user,
    };
  }
}
