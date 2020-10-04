import { Module } from '@nestjs/common';
import { AuthServiceResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { AuthGuard } from './strategy/auth.guard';

@Module({
  imports: [],
  providers: [AuthService, AuthServiceResolver, AuthGuard],
  exports: [AuthGuard],
})
export class AuthModule {}
