import { Module } from '@nestjs/common';
import { UserInformationResolver } from './user-information.resolver';
import { UserInformationService } from './user-information.service';

@Module({
  providers: [UserInformationResolver, UserInformationService],
})
export class UserInformationModule {}
