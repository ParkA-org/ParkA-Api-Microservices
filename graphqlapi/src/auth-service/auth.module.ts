import { Module } from '@nestjs/common';
import { UserInformationModule } from 'src/core-service/user-information/user-information.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { AuthGuard } from './strategy/auth.guard';

@Module({
  imports: [UserInformationModule],
  providers: [AuthService, AuthResolver, AuthGuard],
  exports: [AuthGuard],
})
export class AuthModule {}
