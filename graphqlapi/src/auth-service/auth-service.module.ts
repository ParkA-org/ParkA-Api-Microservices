import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt/dist/jwt.module';
import { PassportModule } from '@nestjs/passport/dist/passport.module';
import { AuthServiceResolver } from './auth-service.resolver';
import { AuthServiceService } from './auth-service.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'topSecret51',
      signOptions: {
        expiresIn: 604800,
      },
    }),
  ],
  providers: [AuthServiceService, AuthServiceResolver, JwtStrategy],

  exports: [JwtStrategy, PassportModule],
})
export class AuthServiceModule {}
