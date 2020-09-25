import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Repository } from 'typeorm';
import { User } from '../auth-entity/user.entity';
import { JwtPayload } from '../auth-interface/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User) private authRepository: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'topSecret51',
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { email, id } = payload;
    const user = await this.authRepository.findOne({ id });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
