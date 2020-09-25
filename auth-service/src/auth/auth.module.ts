import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Credential } from './auth-entity/credential.entity';
import { User } from './auth-entity/user.entity';
// import { JwtModule } from '@nestjs/jwt';
// import { PassportModule } from '@nestjs/passport';
// import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  controllers: [AuthController],
  imports: [TypeOrmModule.forFeature([User, Credential])],
  providers: [AuthService],
})
export class AuthModule {}
