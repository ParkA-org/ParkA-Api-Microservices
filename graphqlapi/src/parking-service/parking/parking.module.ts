import { Module } from '@nestjs/common';
import { FeatureModule } from '../feature/feature.module';
import { ParkingResolver } from './parking.resolver';
import { ParkingService } from './parking.service';

@Module({
  imports: [FeatureModule],
  providers: [ParkingService, ParkingResolver],
})
export class ParkingModule {}
