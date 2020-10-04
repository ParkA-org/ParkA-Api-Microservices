import { Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { AuthGuard } from './strategy/auth.guard';

@Module({
  imports: [],
  providers: [AuthService, AuthResolver, AuthGuard],
  exports: [AuthGuard],
})
export class AuthModule {}
