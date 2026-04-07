import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(config: ConfigService) {
    super({
      // Accept from body OR HttpOnly cookie
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => req?.cookies?.refreshToken ?? null,
        ExtractJwt.fromBodyField('refreshToken'),
      ]),
      secretOrKey: config.get('JWT_REFRESH_SECRET'),
      ignoreExpiration: false,
      passReqToCallback: true, // we need the raw token value
    });
  }

  async validate(req: Request, payload: { sub: string; jti: string }) {
    const rawToken =
      req.cookies?.refreshToken ?? req.body?.refreshToken;
    // Return payload + raw token so the service can verify the hash
    return { userId: payload.sub, tokenId: payload.jti, rawToken };
  }
}