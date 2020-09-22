import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Credential } from './credential/credential.entity';
import { User } from './userData/user.entity';

@Module({
  controllers: [AuthController],
  imports: [TypeOrmModule.forFeature([User, Credential])],
  providers: [AuthService],
})
export class AuthModule {}
