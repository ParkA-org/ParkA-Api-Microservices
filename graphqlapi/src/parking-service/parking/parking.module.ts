import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth-service/auth.module';
import { FeatureModule } from '../feature/feature.module';
import { ParkingResolver } from './parking.resolver';
import { ParkingService } from './parking.service';

@Module({
  exports: [ParkingService],
  imports: [FeatureModule, AuthModule],
  providers: [ParkingService, ParkingResolver],
})
export class ParkingModule {}
