import { Module } from '@nestjs/common';
import { UserInformationService } from './user-information.service';
import { UserInformationController } from './user-information.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserInformation } from './entities/user-information.entities';

@Module({
  imports: [TypeOrmModule.forFeature([UserInformation])],
  providers: [UserInformationService],
  controllers: [UserInformationController],
})
export class UserInformationModule {}
