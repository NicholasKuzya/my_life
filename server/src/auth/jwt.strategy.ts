import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtAuthService } from './jwt.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: JwtAuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET_KEY_JWT,
    });
  }

  async validate(payload: any) {
    console.log(payload);
    const user = await this.authService.validateToken(payload);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
