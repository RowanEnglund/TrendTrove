import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { users, User } from '../user/user.store';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: 'YOUR_GOOGLE_CLIENT_ID', // a-64: replace with actual credentials
      clientSecret: 'YOUR_GOOGLE_CLIENT_SECRET', // a-64: replace with actual credentials
      callbackURL: 'http://localhost:3004/auth/google/callback',
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { name, emails, photos } = profile;
    const email = emails[0].value;

    let user = users.find((user) => user.email === email);

    if (!user) {
      user = {
        id: uuidv4(),
        email,
        name: `${name.givenName} ${name.familyName}`,
        role: 'user',
      };
      users.push(user);
    }

    done(null, user);
  }
}
