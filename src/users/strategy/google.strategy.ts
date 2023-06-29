import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { AuthService } from '../services/auth.service';


@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL ,
      passReqToCallback: true,
      scope: ['profile', 'email'],
      
    });
  }

  async validate(request: any, accessToken: string, refreshToken: string, profile: any): Promise<any> {
    const user = await this.authService.handleGoogleAuthCallback(profile);
    return user;
  }
}