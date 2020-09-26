import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwtPayload } from './jwt-payload.interface';
import { UserType } from '../user-type/user.type';
import { AuthServiceService } from '../auth-service.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authServiceService: AuthServiceService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'topSecret51',
    });
  }

  async validate(payload: JwtPayload): Promise<UserType> {
    const { email, id } = payload;
    const user = await this.authServiceService.getUserById(id);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
