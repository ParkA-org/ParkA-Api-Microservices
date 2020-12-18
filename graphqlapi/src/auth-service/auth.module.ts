import { forwardRef, Module } from '@nestjs/common';
import { UserInformationModule } from 'src/core-service/user-information/user-information.module';
import { ReviewModule } from 'src/review-service/review.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { AuthGuard } from './strategy/auth.guard';

@Module({
  imports: [UserInformationModule, forwardRef(() => ReviewModule)],
  providers: [AuthService, AuthResolver, AuthGuard],
  exports: [AuthGuard, AuthService],
})
export class AuthModule {}
