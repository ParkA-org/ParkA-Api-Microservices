import { Module } from '@nestjs/common';
import { InformationService } from './information.service';
import { InformationController } from './information.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserInformation } from './entities/user-information.entities';

@Module({
  imports: [TypeOrmModule.forFeature([UserInformation])],
  providers: [InformationService],
  controllers: [InformationController],
})
export class InformationModule {}
