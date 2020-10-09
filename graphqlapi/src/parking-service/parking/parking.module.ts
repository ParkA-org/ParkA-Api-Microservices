import { Module } from '@nestjs/common';
import { FeatureModule } from '../feature/feature.module';
import { ParkingService } from './parking.service';

@Module({
  imports: [FeatureModule],
  providers: [ParkingService],
})
export class ParkingModule {}
